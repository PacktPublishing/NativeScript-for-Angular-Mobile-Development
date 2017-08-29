// nativescript
import { NativeScriptModule } from 'nativescript-angular'; 

// angular
import { NgModule } from '@angular/core';

// app
import { 
  LogService,
  DatabaseService
} from './services/index';

@NgModule({
  imports: [
    NativeScriptModule
  ],
  providers: [
    LogService,
    DatabaseService
  ],
  exports: [
    NativeScriptModule
  ]
})
export class CoreModule { }
