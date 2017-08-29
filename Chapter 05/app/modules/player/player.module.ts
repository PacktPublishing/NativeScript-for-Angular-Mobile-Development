// angular
import { NgModule } from '@angular/core';

// app
import { SharedModule } from '../shared/shared.module';
import { COMPONENTS } from './components';
import { PROVIDERS } from './services';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [...PROVIDERS],
  declarations: [...COMPONENTS],
  exports: [
    SharedModule,
    ...COMPONENTS
  ]
})
export class PlayerModule { }