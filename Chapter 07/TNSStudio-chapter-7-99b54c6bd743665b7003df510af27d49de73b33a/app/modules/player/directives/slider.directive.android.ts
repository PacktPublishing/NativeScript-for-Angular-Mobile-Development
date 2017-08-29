import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[slim-slider]'
})
export class SlimSliderDirective {

  constructor(private el: ElementRef) { } 

  ngOnInit() {
    let seekBar = <android.widget.SeekBar>this.el.nativeElement.android;
    // seekBar.setEnabled(false);
    seekBar.setOnTouchListener(new android.view.View.OnTouchListener({
      onTouch(view, event) {
        return true;
      }
    }));
    seekBar.getThumb().mutate().setAlpha(0);
  }
}

