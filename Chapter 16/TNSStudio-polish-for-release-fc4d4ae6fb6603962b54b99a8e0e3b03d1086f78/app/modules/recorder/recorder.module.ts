// nativescript
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

// libs
import { StoreModule } from '@ngrx/store';

// app
import { SharedModule } from '../shared/shared.module';
import { PROVIDERS } from './services';
import { RecordComponent } from './components/record.component';
import { recorderReducer } from './reducers';

const COMPONENTS: any[] = [
  RecordComponent
];

const ENTRY_COMPONENTS: any[] = [
  RecordComponent
];

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
    // recorder state
    StoreModule.forFeature('recorderModule', {
      recorder: recorderReducer
    })
  ],
  declarations: [...COMPONENTS],
  entryComponents: [...ENTRY_COMPONENTS],
  providers: [
    ...PROVIDERS
  ],
  exports: [...COMPONENTS],
  schemas: [NO_ERRORS_SCHEMA]
})
export class RecorderModule { }