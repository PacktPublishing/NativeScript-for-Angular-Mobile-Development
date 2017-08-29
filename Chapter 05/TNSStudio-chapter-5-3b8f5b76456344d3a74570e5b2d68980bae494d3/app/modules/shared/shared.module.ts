// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module'; 
import { NativeScriptRouterModule } from 'nativescript-angular/router'; 

// angular
import { NgModule } from '@angular/core';

// app
import { PIPES } from './pipes';

@NgModule({
  imports: [
    NativeScriptModule, 
    NativeScriptRouterModule
  ],
  declarations: [
    ...PIPES
  ],
  exports: [
    NativeScriptModule,
    NativeScriptRouterModule,
    ...PIPES
  ]
})
export class SharedModule {

}
