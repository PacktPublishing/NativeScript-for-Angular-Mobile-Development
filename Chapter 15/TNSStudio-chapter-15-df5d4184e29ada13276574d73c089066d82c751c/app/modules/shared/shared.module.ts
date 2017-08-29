// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module'; 
import { NativeScriptRouterModule } from 'nativescript-angular/router'; 
import { NativeScriptFormsModule } from 'nativescript-angular/forms'; 

// angular
import { NgModule } from '@angular/core';

// libs
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// app
import { PIPES } from './pipes';

// register nativescript custom components
import { registerElement } from 'nativescript-angular/element-registry';
import { Waveform } from './native/waveform';
registerElement('Waveform', () => Waveform);

@NgModule({
  imports: [
    NativeScriptModule, 
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    TNSFontIconModule
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    TNSFontIconModule,
    ...PIPES
  ]
})
export class SharedModule {}
