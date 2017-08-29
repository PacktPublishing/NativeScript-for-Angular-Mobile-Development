import './operators';

// angular
import { Component } from '@angular/core';

// nativescript
import { isIOS } from 'platform';
import { topmost } from 'ui/frame';
import * as app from 'application';

// libs
import { TNSFontIconService } from 'nativescript-ngx-fonticon';

declare var android;

@Component({
    moduleId: module.id,
    selector: 'my-app',
    templateUrl: 'app.component.html',
})
export class AppComponent {

    constructor(private fontIconService: TNSFontIconService) {
        if (isIOS) {
            /**
             * 0 = black text
             * 1 = white text
             */
            topmost().ios.controller.navigationBar.barStyle = 1;
        } else {
            // adjust text to darker color
            let decorView = app.android.startActivity.getWindow()
                .getDecorView();
            decorView.setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
        }
    }
}
