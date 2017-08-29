import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[slim-slider]'
})
export class SlimSliderDirective {

  constructor(private el: ElementRef) { } 

  ngOnInit() {
    let uiSlider = <UISlider>this.el.nativeElement.ios;
    uiSlider.userInteractionEnabled = false;
    uiSlider.setThumbImageForState(UIImage.new(), UIControlState.Normal);
  }
}

