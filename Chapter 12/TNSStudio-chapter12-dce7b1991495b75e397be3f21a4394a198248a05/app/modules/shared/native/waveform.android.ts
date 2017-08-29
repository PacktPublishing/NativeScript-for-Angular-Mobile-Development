import { View } from 'ui/core/view';
import { Color } from 'color';
import { Subscription } from 'rxjs/Subscription';
import { IWaveform, IWaveformModel, WaveformType } from './waveform-common';
import { screen } from 'tns-core-modules/platform';

declare var com;
declare var android;
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

    get android(): any {
        return this.nativeView;
    }

  public createNativeView() {
    console.log('createNativeView type:', this.type);
    switch (this.type) {
      case 'mic':
        this.nativeView = new GLSurfaceView(this._context);
        this.height = 200; // GL view needs height
        break;
      case 'file':
        this.nativeView = new WaveformView(this._context, null);
        this.nativeView.setSegments(null);
        this.nativeView.recomputeHeights(screen.mainScreen.scale);

        // disable zooming and touch events
        this.nativeView.mNumZoomLevels = 0;
        this.nativeView.onTouchEvent = function (e) { return false; }
        break;
    }
    return this.nativeView;
  }

  initNativeView() {
    console.log('initNativeView');
    this._initView();
  }

  disposeNativeView() {
    if (this.model && this.model.dispose) this.model.dispose();
    if (this._sub) this._sub.unsubscribe();
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

        let soundFile = CheapSoundFile.create(this._model.target, new ProgressListener({
          reportProgress: (fractionComplete: number) => {
            console.log('fractionComplete:', fractionComplete);
            return true;
          }
        }));
        console.log('soundFile:', soundFile);
        setTimeout(() => {
          this.nativeView.setSoundFile(soundFile);
          // const frames = this.nativeView.millisecsToPixels(100);
          // this.nativeView.setPlayback(frames);
          // this.nativeView.setParameters(0, this.nativeView.maxPos(), 0);
          this.nativeView.invalidate();
        }, 0);
      }
    }
  }
}