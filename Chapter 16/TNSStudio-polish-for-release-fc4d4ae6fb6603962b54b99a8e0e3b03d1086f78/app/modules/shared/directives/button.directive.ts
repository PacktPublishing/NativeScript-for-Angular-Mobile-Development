import { Directive, ElementRef } from '@angular/core';
import { Button } from 'tns-core-modules/ui/button';
import { isAndroid } from 'tns-core-modules/platform';

// fix all caps on android buttons

@Directive({
  selector: '[btn-fix]'
})
export class ButtonDirective {

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    if (isAndroid) {
      const button: Button = (<Button>this.el.nativeElement);
      if (button && button.android) {
        button.android.setTransformationMethod(null);
      }
    }
  }
}