import { NgModule } from '@angular/core';
// import { NativeScriptModule } from 'nativescript-angular/platform';

import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { PlayerModule } from './modules/player/player.module';
import { RecorderModule } from './modules/recorder/recorder.module';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [
        CoreModule,
        PlayerModule,
        RecorderModule
    ]
})
export class AppModule { }

