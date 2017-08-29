// angular
import { Component, Input, ViewChild, ElementRef } from '@angular/core';

// nativescript
import { GestureTypes } from 'tns-core-modules/ui/gestures';
import { View } from 'tns-core-modules/ui/core/view';
import { Label } from 'tns-core-modules/ui/label';
import { Slider } from 'tns-core-modules/ui/slider';
import { Observable } from 'tns-core-modules/data/observable';
import { isIOS, screen } from 'tns-core-modules/platform';

// libs
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

// app
import { timeDisplay } from '../../../helpers';
import { PlayerActions } from '../../player/actions';
import { PlayerService } from '../../player/services';
import { IPlayerState } from '../../player/states';

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

  @ViewChild('sliderArea') sliderArea: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('currentTimeDisplay') currentTimeDisplay: ElementRef;

  public duration: number;
  public durationDisplay: string;

  private _sliderArea: View;
  private _currentTimeDisplay: Label;
  private _slider: Slider;
  private _screenWidth: number;
  private _seekDelay: number;
  private _subCurrentTime: Subscription;
  private _destroy$: Subject<any> = new Subject();

  constructor(
    private store: Store<any>,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    // react to play state
    this.store.select(s => s.playerModule.player)
      .takeUntil(this._destroy$)
      .subscribe((state: IPlayerState) => {
        // update duration state for slider
        let duration = state.duration;
        if (duration == null) {
          duration = 0; // reset to 0
        }

        this.duration = duration;
        this.durationDisplay = timeDisplay(duration);
        
        // update slider state
        if (state.playing) {
          this._subCurrentTime = this.playerService.currentTime$.subscribe((currentTime: number) => {
            this._updateSlider(currentTime);
          });
        } else if (this._subCurrentTime) {
          this._subCurrentTime.unsubscribe();
        }

        // completion should reset currentTime      
        if (state.completed) {
          this._updateSlider(0);
        }
      });
    
    this.playerService.sliderUpdate$
      .takeUntil(this._destroy$)
      .subscribe((value) => {
        this._updateSlider(value);
      })
  }

  ngAfterViewInit() {
    this._screenWidth = screen.mainScreen.widthDIPs;
    console.log('screen.mainScreen.widthDIPs:', screen.mainScreen.widthDIPs);
    // console.log('screen.mainScreen.widthPixels:', screen.mainScreen.widthPixels);
    this._sliderArea = <View>this.sliderArea.nativeElement;
    this._slider = <Slider>this.slider.nativeElement;
    this._currentTimeDisplay = <Label>this.currentTimeDisplay.nativeElement;
    this._setupEventHandlers();
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
    if (this._subCurrentTime) {
      this._subCurrentTime.unsubscribe();
    }
  }

  private _updateSlider(time: number) {
    console.log('updateslide:', time);
    if (this._slider) this._slider.value = time;
    if (this._currentTimeDisplay)
      this._currentTimeDisplay.text = timeDisplay(time);
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
          this.store.dispatch(new PlayerActions.SeekAction(seekTo));
        }, 600);
      }
    });
  }
}