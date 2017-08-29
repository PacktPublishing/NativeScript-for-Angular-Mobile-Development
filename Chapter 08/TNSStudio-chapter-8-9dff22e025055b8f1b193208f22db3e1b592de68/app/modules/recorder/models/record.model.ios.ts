import { Observable } from 'data/observable';
import { IRecordModel, IRecordEvents, RecordState, documentsFilePath } from './common';

export class RecordModel extends Observable implements IRecordModel {

  // available events to listen to
  private _events: IRecordEvents;

  // control nodes   
  private _mic: AKMicrophone;
  private _micBooster: AKBooster;
  private _recorder: AKNodeRecorder;

  // mixers
  private _micMixer: AKMixer;
  private _mainMixer: AKMixer;

  // state
  private _state: number = RecordState.readyToRecord;

  // the final saved path to use  
  private _savedFilePath: string;

  constructor() {
    super();
    this._setupEvents();

    // setup recording environment
    (<any>AVAudioFile).cleanTempDirectory();

    console.log('cleaned tmp files...');

    console.log('AKSettings.bufferLength', AKSettings.bufferLength);
    console.log('BufferLength.Medium', BufferLength.Medium);
    // audio setup 
    AKSettings.setBufferLength(BufferLength.Medium);
    console.log('AKSettings.bufferLength after set:', AKSettings.bufferLength);

    try {
      console.log('AKSettings.setSessionWithCategoryOptionsError', AKSettings.setSessionWithCategoryOptionsError);
      let setSession = AKSettings.setSessionWithCategoryOptionsError(SessionCategory.PlayAndRecord, AVAudioSessionCategoryOptions.DefaultToSpeaker);
      console.log('category session is set:', setSession);
    } catch (err) {
      console.log(err);
    }

    this._mic = AKMicrophone.alloc().init();
 
    this._micMixer = AKMixer.alloc().init(null);
    this._micMixer.connect(this._mic);

    this._micBooster = AKBooster.alloc().initGain(<any>this._micMixer, 0);

    try {

      this._recorder = AKNodeRecorder.alloc().initWithNodeFileError(<any>this._micMixer, null);
      console.log('this._recorder:', this._recorder);
    } catch (err) {
      console.log(err);
    }

    this._mainMixer = AKMixer.alloc().init(null);
    this._mainMixer.connect(this._micBooster);

    let inputs = AudioKit.availableInputs;
    console.log('AudioKit.availableInputs:', inputs);
    let outputs = AudioKit.outputs;
    console.log('AudioKit.outputs:', outputs);

    // THIS uses didSet in Swift, therefore a set method is generated
    AudioKit.setOutput(<any>this._mainMixer);
    AudioKit.start();

    console.log('AudioKit.output:', AudioKit.output);

    // will see this in the log if no crash above occurs
    console.log('audiokit start!');
  }

  public get events(): IRecordEvents {
    return this._events;
  }

  public get mic(): AKMicrophone {
    return this._mic;
  }

  public get target() {
    return this._mic;
  }

  public get recorder(): AKNodeRecorder {
    return this._recorder;
  }

  public get audioFilePath(): string {
    if (this._recorder) {
      return this._recorder.audioFile.url.absoluteString;
    }
    return '';
  }

  public get state(): number {
    return this._state;
  }

  public set state(value: number) {
    this._state = value;
    this._emitEvent(this._events.stateChange, this._state);
  }

  public get savedFilePath() {
    return this._savedFilePath;
  }

  public set savedFilePath(value: string) {
    this._savedFilePath = value;
    if (this._savedFilePath)
      this.state = RecordState.saved;
  }

  public toggleRecord() {
    if (this._state !== RecordState.recording) {
      // just force ready to record
      // when coming from any state other than recording
      this.state = RecordState.readyToRecord;
      // resetting (clear previous recordings)
      if (this._recorder) {
        try {
          this._recorder.resetAndReturnError();
        } catch (err) {
          console.log('recorder reset error:', err);
        }

      }
    }
    switch (this._state) {
      case RecordState.readyToRecord:
        console.log('AKSettings.headPhonesPlugged:', AKSettings.headPhonesPlugged);
        if (AKSettings.headPhonesPlugged) {
          this._micBooster.gain = 1;
        }

        try {
          this.state = RecordState.recording;
          let r = this._recorder.recordAndReturnError();
          console.log('recording:', r);
        } catch (err) {
          console.log('Recording failed:', err);
        }
        break;
      case RecordState.recording:
        this._recorder.stop();
        this.state = RecordState.readyToPlay;
        // Microphone monitoring is muted
        this._micBooster.gain = 0;
        break;

    }
  }

  public togglePlay() {
    if (this._state === RecordState.readyToPlay) {
      this.state = RecordState.playing;
    } else {
      this.stopPlayback();
    }
  }

  public stopPlayback() {
    if (this.state !== RecordState.recording) {
      this.state = RecordState.readyToPlay;
    }
  }

  public save() {
    // console.log('this._recorder.audioFile.url:', this._recorder.audioFile.url.absoluteString);

    // ** Curiously, exporting will NOT work if you comment out this console log!! ** //
    console.log('stringUTIWithType:', AKAudioFile.stringUTIWithType(ExportFormat.M4a));

    let fileName = `recording-${Date.now()}.m4a`;
    this._recorder.audioFile.exportAsynchronouslyWithNameBaseDirExportFormatFromSampleToSampleCallback(fileName, BaseDirectory.Documents, ExportFormat.M4a, null, null, (af: AKAudioFile, err: NSError) => {
      console.log('if theres an error:', err);
      console.log('file written!', af);
      this.savedFilePath = documentsFilePath(fileName);
    });
  }

  public dispose() {
    AudioKit.stop();
    // cleanup
    this._mainMixer = null;
    this._recorder = null;
    this._micBooster = null;
    this._micMixer = null;
    this._mic = null;
    // clean out tmp files
    (<any>AVAudioFile).cleanTempDirectory();
  }

  public finish() {
    this.state = RecordState.finish;
  }

  private _emitEvent(eventName: string, data?: any) {
    let event = {
      eventName,
      data,
      object: this
    };
    this.notify(event);
  }

  private _setupEvents() {
    this._events = {
      stateChange: 'stateChange'
    };
  }
}