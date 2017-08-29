// angular
import { Component, Input, ViewChild, ElementRef } from '@angular/core';

// nativescript
import { GestureTypes } from 'ui/gestures';
import { StackLayout } from 'ui/layouts/stack-layout';
import { Label } from 'ui/label';
import { Slider } from 'ui/slider';
import { Observable } from 'data/observable';
import { isIOS, screen } from 'platform';

// app
import { PlayerService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'shuttle-slider',
  templateUrl: 'shuttle-slider.component.html',
  styles: [`
    .slider-area {
      margin: 10 10 0 10;
    }
    .slider {
      padding:0;
      margin:0 0 5 0;
      height:5;
    }
  `]
})
export class ShuttleSliderComponent {

  @Input() currentTime: number;    
  @Input() duration: number;  
  @ViewChild('sliderArea') sliderArea: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('currentTimeDisplay') currentTimeDisplay: ElementRef;

  public durationDisplay: string;

  private _sliderArea: StackLayout;
  private _currentTimeDisplay: Label;
  private _slider: Slider;
  private _screenWidth: number;
  private _seekDelay: number;

  constructor(private playerService: PlayerService) { }

  ngOnChanges() {
    console.log('ngOnChanges:', this.currentTime);
    if (typeof this.currentTime === 'number') {
      this._updateSlider(this.currentTime);
    }
    if (this.duration) {
      this.durationDisplay = this._timeDisplay(this.duration);
    }
  }

  ngAfterViewInit() {
    this._screenWidth = screen.mainScreen.widthDIPs;
    console.log('screen.mainScreen.widthDIPs:', screen.mainScreen.widthDIPs);
    // console.log('screen.mainScreen.widthPixels:', screen.mainScreen.widthPixels);
    this._sliderArea = <StackLayout>this.sliderArea.nativeElement;
    this._slider = <Slider>this.slider.nativeElement;
    this._currentTimeDisplay = <Label>this.currentTimeDisplay.nativeElement;
    this._setupEventHandlers();
  }

  private _updateSlider(time: number) {
    if (this._slider) this._slider.value = time;
    if (this._currentTimeDisplay)
      this._currentTimeDisplay.text = this._timeDisplay(time);
  }

  private _setupEventHandlers() {
    this._sliderArea.on(GestureTypes.touch, (args: any) => {
      this.playerService.seeking = true;
      let x = args.getX();
      // console.log('Touch: x: ' + x);
      if (x >= 0) {
        // x percentage of screen left to right
        let percent = x / this._screenWidth;
        if (percent > .5) {
          percent += .05;
        }
        // console.log('touch percentage of screen:', percent);
        let seekTo = this.duration * percent;
        // console.log('seek to:', seekTo);
        this._updateSlider(seekTo);

        if (this._seekDelay) clearTimeout(this._seekDelay);
        this._seekDelay = setTimeout(() => {
          // android requires milliseconds
          this.playerService.seekTo(isIOS ? seekTo : (seekTo*1000));
        }, 600);
      }
    });
  }

  private _timeDisplay(seconds: number): string {
    let hr: any  = Math.floor(seconds / 3600);
    let min: any = Math.floor((seconds - (hr * 3600))/60);
    let sec: any = Math.floor(seconds - (hr * 3600) -  (min * 60));
    if (min < 10) { 
      min = '0' + min; 
    }
    if (sec < 10){ 
      sec  = '0' + sec;
    }
    return min + ':' + sec;
  }
}