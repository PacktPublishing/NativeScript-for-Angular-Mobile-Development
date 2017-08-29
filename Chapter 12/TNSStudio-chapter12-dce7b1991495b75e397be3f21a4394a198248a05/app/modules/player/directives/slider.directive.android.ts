import { Directive, ElementRef, Input } from '@angular/core';
import { fromResource } from 'image-source';
import { getNativeApplication } from 'application';

let application: android.app.Application;
let resources: android.content.res.Resources;

const getApplication = function () {
  if (!application) {
    application = (<android.app.Application>getNativeApplication());
  }

  return application;
}

const getResources = function () {
  if (!resources) {
    resources = getApplication().getResources();
  }

  return resources;
}

@Directive({
  selector: '[slim-slider]'
})
export class SlimSliderDirective {
  @Input('slim-slider') imageName: string;
  private _thumb: android.graphics.drawable.BitmapDrawable;

  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    let seekBar = <android.widget.SeekBar>this.el.nativeElement.android;
    console.log('ngAfterViewInit:', seekBar);
    console.log('imageName:', this.imageName);
    if (this.imageName) {
      if (!seekBar) {
        // part of view toggle - grab on next tick
        setTimeout(() => {
          let seekBar = <android.widget.SeekBar>this.el.nativeElement.android;
          this._addThumbImg(seekBar);
        });
      } else {
        this._addThumbImg(seekBar);
      }

    } else {
      // seekBar.setEnabled(false);
      seekBar.setOnTouchListener(new android.view.View.OnTouchListener({
        onTouch(view, event) {
          return true;
        }
      }));
      seekBar.getThumb().mutate().setAlpha(0);
    }
  }

  private _addThumbImg(seekBar: android.widget.SeekBar) {
    console.log('seekBar:', seekBar);
    if (!this._thumb) {
      let imgParts = this.imageName.split('.');
      let name = imgParts[0];
      const res = getResources();
      if (res) {
        const identifier: number = res.getIdentifier(name, 'drawable', getApplication().getPackageName());
        if (0 < identifier) {
          // Load BitmapDrawable with getDrawable to make use of Android internal caching
          this._thumb = <android.graphics.drawable.BitmapDrawable>res.getDrawable(identifier);
          // thumb.setBounds(new android.graphics.Rect(0, 0, thumb.getIntrinsicWidth(), thumb.getIntrinsicHeight()));
        }
      }
    }
    // renders a solid color, why??
    seekBar.setThumb(this._thumb);
  }
}