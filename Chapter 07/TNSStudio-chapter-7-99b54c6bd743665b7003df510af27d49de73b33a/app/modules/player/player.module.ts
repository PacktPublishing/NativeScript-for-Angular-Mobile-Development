// angular
import { NgModule } from '@angular/core';

// app
import { SharedModule } from '../shared/shared.module';
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PROVIDERS } from './services';

@NgModule({
  imports: [
    SharedModule
  ],
  providers: [...PROVIDERS],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    SharedModule,
    ...COMPONENTS
  ]
})
export class PlayerModule { }