// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptFormsModule } from 'nativescript-angular/forms'; 
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

// app
import { SharedModule } from '../shared/shared.module';
import { PROVIDERS } from './services';
import { RecordComponent } from './components/record.component';

const COMPONENTS: any[] = [
  RecordComponent
];

const ENTRY_COMPONENTS: any[] = [
  RecordComponent
];

const defaultModalParams = new ModalDialogParams({}, null);

const routes: Routes = [
  {
    path: '',
    component: RecordComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    NativeScriptRouterModule.forChild(routes),
    NativeScriptFormsModule
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  providers: [
    ...PROVIDERS,
    { provide: ModalDialogParams, useValue: defaultModalParams }
  ],
  exports: [...COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RecorderModule { }