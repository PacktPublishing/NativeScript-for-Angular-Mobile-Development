import { Directive, ElementRef, Input } from '@angular/core';

// libs
import { Subject } from 'rxjs/Subject';

// nativescript
import { GestureTypes, GestureEventData } from "tns-core-modules/ui/gestures";

// app


@Directive({
  selector: '[multiGesture]'
})
export class MultiGestureDirective {
  @Input() tapAction: Function;
  @Input() longPressAction: Function;
  @Input() item: any;
  private _longPressFired$: Subject<any> = new Subject();
  private _longPressInProgress = false;
  private _destroy$: Subject<any> = new Subject();

  constructor(private el: ElementRef) {

  }

  ngOnInit() {
    // ensure multiple long presses don't fire in a row
    this._longPressFired$
      .takeUntil(this._destroy$) 
      .throttleTime(500)
      .do(_ => this.longPressInProgress = true)
      .subscribe(() => {
        // console.log('longpress fired!');
        this.longPressInProgress = false;
        this.longPressAction(this.item);
      })
  }

  ngAfterViewInit() {
    this.el.nativeElement.on(`tap,longPress`, (args: GestureEventData) => {
      // console.log('native event:', args.eventName);
      switch (args.eventName) {
        case 'tap':
          if (!this.longPressInProgress) {
            this.tapAction(this.item);
          }
          break;
        case 'longPress': 
          this._longPressFired$.next(true);
          break;  
      }
    });
  }

  public get longPressInProgress() {
    return this._longPressInProgress;
  }

  public set longPressInProgress(value: boolean) {
    // console.log('setting longPressInProgress:', value);
    this._longPressInProgress = value;
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}