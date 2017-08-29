import { View } from 'ui/core/view';
import { Color } from 'color';
import { Subscription } from 'rxjs/Subscription';
import { IWaveform, IWaveformModel, WaveformType } from './common';

declare var com;
const GLSurfaceView = android.opengl.GLSurfaceView;
const AudioRecord = android.media.AudioRecord;

// Horizon recorder waveform
// https://github.com/Yalantis/Horizon
const Horizon = com.yalantis.waves.util.Horizon;
// various recorder settings
const RECORDER_SAMPLE_RATE = 44100;
const RECORDER_CHANNELS = 1;
const RECORDER_ENCODING_BIT = 16;
const RECORDER_AUDIO_ENCODING = 3;//AudioFormat.ENCODING_PCM_16BIT;
const MAX_DECIBELS = 160; // was 120

// Semantive waveform for files
// https://github.com/Semantive/waveform-android
const WaveformView = com.semantive.waveformandroid.waveform.view.WaveformView;
const CheapSoundFile = com.semantive.waveformandroid.waveform.soundfile.CheapSoundFile;
const ProgressListener = com.semantive.waveformandroid.waveform.soundfile.CheapSoundFile.ProgressListener;

export class Waveform extends View implements IWaveform {
  private _model: IWaveformModel;
  private _type: WaveformType;
  private _initialized: boolean;
  private _horizon: any;
  private _javaByteArray: Array<any>;
  private _waveformFileView: any;
  private _sub: Subscription;

  public set type(value: WaveformType) {
    this._type = value;
  }

  public get type() {
    return this._type;
  }

  public set model(value: IWaveformModel) {
    console.log('Waveform setting model:', value);
    this._model = value;
    this._initView();
  }

  public get model() {
    return this._model;
  }

  createNativeView() {
    console.log('createNativeView type:', this.type);
    switch (this.type) {
      case 'mic':
        this.nativeView = new GLSurfaceView(this._context);
        this.height = 200; // GL view needs height
        break;
      case 'file':
        this.nativeView = new WaveformView(this._context, null);

        // experimenting with size to see if this would help it draw
        this.width = 300;
        this.height = 80;

        // disable zooming and touch events
        // this executes fine, doesn't cause crash but not sure if this works to do what i want
        this.nativeView.mNumZoomLevels = 0;
        this.nativeView.onTouchEvent = function (e) { return false; }
        break;
    }
    
    // console.log('Waveform nativeView:', this.nativeView);
    // if (this.type === 'file') {
    //   for (let key in this.nativeView) {
    //     console.log(key);
    //   }
    // }
    return this.nativeView;
  }

  initNativeView() {
    console.log('initNativeView');
    this._initView();
  }

  disposeNativeView() {
    if (this.model && this.model.dispose) this.model.dispose();
  }

  private _initView() {
    if (!this._initialized && this.nativeView && this.model) {
      if (this.type === 'mic') {
        this._initialized = true;
        this._horizon = new Horizon(
          this.nativeView,
          new Color('#000').android,
          RECORDER_SAMPLE_RATE,
          RECORDER_CHANNELS,
          RECORDER_ENCODING_BIT
        );

        this._horizon.setMaxVolumeDb(MAX_DECIBELS);
        let bufferSize = 2 * AudioRecord.getMinBufferSize(RECORDER_SAMPLE_RATE,
          RECORDER_CHANNELS, RECORDER_AUDIO_ENCODING);
        console.log('bufferSize:', bufferSize);
        this._javaByteArray = Array.create('byte', bufferSize);

        this._sub = this._model.target.subscribe((value) => {
          this._javaByteArray[0] = value;
          this._horizon.updateView(this._javaByteArray);
        });
      } else {
        console.log('init with target:', this._model.target);

        // The following works but does not draw anything        
        // let soundFile = CheapSoundFile.create(this._model.target, new ProgressListener({
        //   reportProgress: (fractionComplete: number) => {
        //     console.log('fractionComplete:', fractionComplete);
        //     return true;
        //   }
        // }));
        // console.log('soundFile:', soundFile);
        // this.nativeView.setSoundFile(soundFile);

        // tried this but still nothing draws
        // this.nativeView.onDraw(new android.graphics.Canvas());
      }
   
    }
  }
}