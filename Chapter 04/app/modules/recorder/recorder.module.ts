// nativescript
import { NativeScriptModule } from 'nativescript-angular'; 

// angular
import { NgModule } from '@angular/core';

// app
import { PROVIDERS } from './services/index';

@NgModule({
 imports: [ NativeScriptModule ],
 providers: [ ...PROVIDERS ]
})
export class RecorderModule { }