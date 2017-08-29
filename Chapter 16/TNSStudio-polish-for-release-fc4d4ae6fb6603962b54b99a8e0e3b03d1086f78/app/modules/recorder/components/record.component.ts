// angular
import { Component, OnInit, OnDestroy, Optional, NgZone } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// nativescript
import { RouterExtensions } from 'nativescript-angular/router';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { isIOS } from 'tns-core-modules/platform';
import { Color } from 'tns-core-modules/color';
import { topmost } from 'tns-core-modules/ui/frame';
import { Page } from 'tns-core-modules/ui/page';

// app
import { RecordActions } from '../actions';
import { RecordModel } from '../models';
import { RecorderService } from '../services/recorder.service';
import { RecordState } from '../states';

@Component({
  moduleId: module.id,
  selector: 'record',
  templateUrl: 'record.component.html'
})
export class RecordComponent implements OnInit, OnDestroy { 
  public isModal: boolean;
  public recordBtn: string = 'ion-record';
  public playBtn: string = 'ion-ios-play';
  public state: number;
  public recordState: any = {};

  private _sub: Subscription;

  constructor(
    private store: Store<any>,
    private router: RouterExtensions,
    @Optional() private params: ModalDialogParams,
    private page: Page,
    private ngZone: NgZone,
    public recorderService: RecorderService
  ) { 
    if (isIOS) {
      topmost().ios.controller.navigationBar.barStyle = 1;
    }
    // use RecordState enum names as reference in view
    for (let val in RecordState ) {
      if (isNaN(parseInt(val))) {
        this.recordState[val] = RecordState[val];
      }
    }

    // handle modal params (if opened via modal)
    let isReRecording = false;
    if (params && params.context) {
      if (params.context.isModal) {
        this.isModal = true;
        // adjust top status bar
        page.backgroundSpanUnderStatusBar = true;
        page.backgroundColor = new Color('#150e0c');
      }
      if (params.context.track) {
        // rerecording a track
        isReRecording = true;
        recorderService.setupNewRecording(params.context.track);
      }
    }
    if (!isReRecording) {
      // prepare service for brand new recording
      recorderService.setupNewRecording();
    }
  }

  ngOnInit() {
    this._sub = this.store.select(s => s.recorderModule.recorder).subscribe((state: RecordState) => {
      this.state = state;
      switch (state) {
        case RecordState.readyToRecord:
        case RecordState.readyToPlay:
          this._resetState();
          break;
        case RecordState.playing:
          this.playBtn = 'ion-ios-pause';
          break;
        case RecordState.recording:
          this.recordBtn = 'ion-stop';
          break;
        case RecordState.finish:
          this._cleanup();
          break;
      }
    });
  }
  
  ngOnDestroy() {
    if (this._sub) this._sub.unsubscribe();
    // reset state on exit
    this.store.dispatch(new RecordActions.ReadyToRecordAction());
  }

  public cancel() {
    this._cleanup();
  }

  private _cleanup() {
    this.recorderService.cleanup();
    invokeOnRunLoop(() => {
      if (this.isModal) {
        this._close();
      } else {
        this._back();
      }
    });
  }

  private _close() {
    this.params.closeCallback();
  }

  private _back() {
    this.router.back();
  }

  private _resetState() {
    this.recordBtn = 'ion-record';
    this.playBtn = 'ion-ios-play';
  }
}

/**
 * Needed on iOS to prevent this potential exception:
 * "This application is modifying the autolayout engine from a background thread after the engine was accessed from the main thread. This can lead to engine corruption and weird crashes."
 */
const invokeOnRunLoop = (function () {
  if (isIOS) {
    var runloop = CFRunLoopGetMain();
    return function(func) {
        CFRunLoopPerformBlock(runloop, kCFRunLoopDefaultMode, func);
        CFRunLoopWakeUp(runloop);
    }
  } else {
    return function (func) {
      func();
    }
  }
}());
