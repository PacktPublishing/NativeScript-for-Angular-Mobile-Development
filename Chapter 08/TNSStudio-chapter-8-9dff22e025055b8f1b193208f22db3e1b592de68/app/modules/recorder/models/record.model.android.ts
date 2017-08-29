import { Observable } from 'data/observable';
import { IRecordModel, IRecordEvents, RecordState, documentsFilePath } from './common';
import { TNSRecorder, AudioRecorderOptions } from 'nativescript-audio';
import { Subject } from 'rxjs/Subject';
import * as permissions from 'nativescript-permissions';

declare var android: any;
const RECORD_AUDIO = android.Manifest.permission.RECORD_AUDIO;

export class RecordModel extends Observable implements IRecordModel {

  // available events to listen to
  private _events: IRecordEvents;

  // target Observable
  private _target$: Subject<number>;

  // recorder
  private _recorder: TNSRecorder;
  // recorder options  
  private _options: AudioRecorderOptions;
  // recorder mix meter handling
  private _meterInterval: number;
  
  // state
  private _state: number = RecordState.readyToRecord;

  // tmp file path
  private _filePath: string;
  // the final saved path to use  
  private _savedFilePath: string;

  constructor() {
    super();
    this._setupEvents();

    // prepare Observable as our target
    this._target$ = new Subject();

    // create recorder
    this._recorder = new TNSRecorder();
    this._filePath = documentsFilePath(`recording-${Date.now()}.m4a`);
    this._options = {
      filename: this._filePath,
      format: android.media.MediaRecorder.OutputFormat.MPEG_4,
      encoder: android.media.MediaRecorder.AudioEncoder.AAC,
      metering: true, // critical to feed our waveform view
      infoCallback: (infoObject) => {
        console.log(JSON.stringify(infoObject));
      },
      errorCallback: (errorObject) => {
        console.log(JSON.stringify(errorObject));
      }
    };
  }

  public get events(): IRecordEvents {
    return this._events;
  }

  public get target() {
    return this._target$;
  }

  public get recorder(): any {
    return this._recorder;
  }

  public get audioFilePath(): string {
    return this._filePath;
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
    }

    switch (this._state) {
      case RecordState.readyToRecord:
        if (this._hasPermission()) {
          this._recorder.start(this._options).then((result) => {
            console.log('Android recorder started!');
            this.state = RecordState.recording;
            this._initMeter();
          }, (err) => {
            console.log('Android recorder err:', err);
            this._resetMeter();
          });
        } else {
          permissions.requestPermission(RECORD_AUDIO).then(() => {
            // simply engage again
            this.toggleRecord();
          }, (err) => {
            console.log('permissions error:', err);
          });
        }
        break;
      case RecordState.recording:
        this._resetMeter();
        this._recorder.stop();
        this.state = RecordState.readyToPlay;
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
    this.savedFilePath = this._filePath;
  }

  public dispose() {
    if (this.state === RecordState.recording) {
      this._recorder.stop();
    }
    this._recorder.dispose();
  }

  public finish() {
    this.state = RecordState.finish;
  }

  private _initMeter() {
    this._resetMeter();
    this._meterInterval = setInterval(() => {
      let meters = this.recorder.getMeters();
      console.log('meters:', meters);
      this._target$.next(meters);
    }, 200); // use 50 for production - better on devices
  }

  private _resetMeter() {
    if (this._meterInterval) {
      clearInterval(this._meterInterval);
      this._meterInterval = undefined;
    }
  }

  private _hasPermission() {
    return permissions.hasPermission(RECORD_AUDIO);
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