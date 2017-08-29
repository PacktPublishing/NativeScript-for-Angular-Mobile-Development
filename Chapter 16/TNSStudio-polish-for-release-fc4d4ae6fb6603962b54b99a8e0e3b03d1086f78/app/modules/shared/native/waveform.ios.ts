import { View, Property } from 'tns-core-modules/ui/core/view';
import { Color } from 'tns-core-modules/color';
import { screen } from 'tns-core-modules/platform';
import { PercentLength } from 'tns-core-modules/ui/layouts/layout-base';
import { IWaveform, IWaveformModel, WaveformType } from './waveform-common';

// define properties
export const plotColorProperty = new Property<Waveform, string>({ name: 'plotColor' });
export const plotTypeProperty = new Property<Waveform, string>({ name: 'plotType' });
export const fillProperty = new Property<Waveform, string>({ name: 'fill' });
export const mirrorProperty = new Property<Waveform, string>({ name: 'mirror' });

export class Waveform extends View implements IWaveform {
  private _model: IWaveformModel;
  private _type: WaveformType;
  private _duration: number;
  private _longestDuration: number;

  public set type(value: WaveformType) {
    this._type = value;
  }

  public get type() {
    return this._type;
  }

  public set model(value: IWaveformModel) {
    console.log('Waveform setting model:', value);
    this._model = value;
  }

  public get model() {
    return this._model;
  }

  public set duration(value: number) {
    console.log('Waveform setting duration:', value);
    this._duration = value;
  }

  public get duration() {
    return this._duration;
  }

  public set longestDuration(value: number) {
    console.log('Waveform setting longestDuration:', value);
    this._longestDuration = value;
  }

  public get longestDuration() {
    return this._longestDuration;
  }

  createNativeView() {
    console.log('createNativeView type:', this.type);
    switch (this.type) {
      case 'mic':
        this.nativeView = AKNodeOutputPlot.alloc().initFrameBufferSize(this._model.target, CGRectMake(0, 0, 0, 0), 1024);
        break;
      case 'file':
        this.nativeView = EZAudioPlot.alloc().init();
        break;
    }
      
    console.log('Waveform nativeView:', this.nativeView);
    console.log(screen.mainScreen.widthDIPs);
    return this.nativeView;
  }

  initNativeView() {
    console.log('initNativeView');
    if (this._type === 'file') {
      console.log('init with target:', this._model.target);
      let file = EZAudioFile.alloc().initWithURL(NSURL.fileURLWithPath(this._model.target));
      // console.log('ezaudiofile:', file);
      let data = file.getWaveformData();
      // console.log('data:', JSON.stringify(data));
      (<EZAudioPlot>this.nativeView).updateBufferWithBufferSize(data.buffers[0], data.bufferSize);
      // console.log('before:', (<EZAudioPlot>this.nativeView).frame);
      // console.log('this.height:', this.height);
      // (<EZAudioPlot>this.nativeView).frame = CGRectMake(0, 0, 200, 80);
      // console.log('experiment setting width of file ----');
      // console.log('after:', (<EZAudioPlot>this.nativeView).frame.size.width);
      // console.log('Waveform duration:', this.duration);
      // console.log('Waveform longestDuration:', this.longestDuration);
      // console.log('Waveform width:', this.width);
      if (this.duration === this.longestDuration) {
        this.width = PercentLength.parse('100%');
      } else {
        const percentage = this.duration / this.longestDuration;
        this.width = PercentLength.parse(`${percentage*100}%`);
      }
    }
  }

  disposeNativeView() {
    if (this.model && this.model.dispose) this.model.dispose();
  }

  [plotColorProperty.setNative](value: string) {
    this.nativeView.color = new Color(value).ios;
  }

  [fillProperty.setNative](value: string) {
    this.nativeView.shouldFill = value === 'true';
  }

  [mirrorProperty.setNative](value: string) {
    this.nativeView.shouldMirror = value === 'true';
  }

  [plotTypeProperty.setNative](value: string) {
    switch (value) {
      case 'buffer':
        this.nativeView.plotType = EZPlotType.Buffer;
        break;
      case 'rolling':
        this.nativeView.plotType = EZPlotType.Rolling;
        break;
    }
  } 
}

// register properties
plotColorProperty.register(Waveform);
plotTypeProperty.register(Waveform);
fillProperty.register(Waveform);
mirrorProperty.register(Waveform);
