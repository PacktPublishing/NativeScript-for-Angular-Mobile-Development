import { View } from 'ui/core/view';
import { Color } from 'color';
import { screen } from 'platform';
import { IWaveform, IWaveformModel, WaveformType } from './common';

export class Waveform extends View implements IWaveform {
  private _model: IWaveformModel;
  private _type: WaveformType;
  private _plotColor: string;
  private _fill: boolean;
  private _mirror: boolean;
  private _plotType: string;

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
    // trigger setters
    this.plotColor = this._plotColor; 
    this.fill = this._fill;
    this.mirror = this._mirror;
    this.plotType = this._plotType;
    if (this._type === 'file') {
      console.log('init with target:', this._model.target);
      let file = EZAudioFile.alloc().initWithURL(NSURL.fileURLWithPath(this._model.target));
      // console.log('ezaudiofile:', file);
      let data = file.getWaveformData();
      // console.log('data:', JSON.stringify(data));
      (<EZAudioPlot>this.nativeView).updateBufferWithBufferSize(data.buffers[0], data.bufferSize);
      console.log('before:', (<EZAudioPlot>this.nativeView).frame);
      console.log('this.height:', this.height);
      (<EZAudioPlot>this.nativeView).frame = CGRectMake(0, 0, 200, 80);
      console.log('experiment setting width of file ----');
      console.log('after:', (<EZAudioPlot>this.nativeView).frame);
    }
  }

  disposeNativeView() {
    if (this.model && this.model.dispose) this.model.dispose();
  }

  set plotColor(value: string) {
    console.log(`AudioPlot color: ${value}`);
    this._plotColor = value;
    if (this._plotColor && this.nativeView) 
      this.nativeView.color = new Color(this._plotColor).ios;
  }
  
  set fill(value: boolean) {
    console.log(`AudioPlot fill: ${value}`);
    this._fill = value;
    if (this.nativeView)
      this.nativeView.shouldFill = !!this._fill;
  }
  
  set mirror(value: boolean) {
    console.log(`AudioPlot mirror: ${value}`);
    this._mirror = value;
    if (this.nativeView)
      this.nativeView.shouldMirror = !!this._mirror;
  }
  
  set plotType(type: string) {
    console.log(`AudioPlot plotType: ${type}`);
    this._plotType = type;
    if (this.nativeView) {
      switch (this._plotType) {
        case 'buffer':
          this.nativeView.plotType = EZPlotType.Buffer;
          break;
        case 'rolling':
          this.nativeView.plotType = EZPlotType.Rolling;
          break;
      }
    }
  }  
}