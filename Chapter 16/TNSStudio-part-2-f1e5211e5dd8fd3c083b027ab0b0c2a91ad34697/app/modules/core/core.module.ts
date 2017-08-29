// nativescript
import { NativeScriptModule } from 'nativescript-angular'; 

// angular
import { NgModule } from '@angular/core';

// app
import { PIPES } from './pipes/index';
import { PROVIDERS } from './services/index';

@NgModule({
  imports: [
    NativeScriptModule
  ],
  declarations: [
    ...PIPES
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    NativeScriptModule,
    ...PIPES
  ]
})
export class CoreModule { }
