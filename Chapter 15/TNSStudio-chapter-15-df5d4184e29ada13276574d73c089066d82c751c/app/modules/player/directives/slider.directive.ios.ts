import { Directive, ElementRef, Input } from '@angular/core';

import { Color } from 'tns-core-modules/color';

@Directive({
  selector: '[slim-slider]'
})
export class SlimSliderDirective {
  @Input('slim-slider') imageName: string;

  constructor(private el: ElementRef) { } 

  ngAfterViewInit() {
    let uiSlider = <UISlider>this.el.nativeElement.ios;
    if (this.imageName) {
      uiSlider.setThumbImageForState(UIImage.imageNamed(this.imageName), UIControlState.Normal);
      // assume always suffixed with '-down'
      let imgParts = this.imageName.split('.');
      let downImg = `${imgParts[0]}-down.${imgParts[1]}`;
      uiSlider.setThumbImageForState(UIImage.imageNamed(downImg), UIControlState.Highlighted);

      // // set highlighted color using native apis
      // // this could also be set via CSS background-color
      // // here for example purposes
      // let rect = CGRectMake(0, 0, 1, 1);
      // UIGraphicsBeginImageContextWithOptions(rect.size, false, 0);
      // let uiColor = new Color('#000').ios;
      // uiColor.setFill();
      // UIRectFill(rect);
      // let bgImg = UIGraphicsGetImageFromCurrentImageContext();
      // UIGraphicsEndImageContext();
      // uiSlider.setMaximumTrackImageForState(bgImg, UIControlState.Normal);
    } else {
      uiSlider.userInteractionEnabled = false;
      uiSlider.setThumbImageForState(UIImage.new(), UIControlState.Normal);
    }
  }
}

