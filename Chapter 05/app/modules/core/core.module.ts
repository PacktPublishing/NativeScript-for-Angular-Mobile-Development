// nativescript
import {
  NativeScriptModule,
  NativeScriptFormsModule,
  NativeScriptHttpModule
} from 'nativescript-angular'; 

// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';

// app
import { PROVIDERS } from './services';

const MODULES: any[] = [
  NativeScriptModule,
  NativeScriptFormsModule,
  NativeScriptHttpModule
];

@NgModule({
  imports: [
    ...MODULES
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...MODULES
  ]
})
export class CoreModule {
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
