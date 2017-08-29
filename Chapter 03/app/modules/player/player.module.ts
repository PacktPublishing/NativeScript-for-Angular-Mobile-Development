// angular
import { NgModule } from '@angular/core';

// app
import { CoreModule } from '../core/core.module';
import { COMPONENTS } from './components/index';
import { PROVIDERS } from './services/index';

@NgModule({
  imports: [
    CoreModule
  ],
  providers: [...PROVIDERS],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS]
})
export class PlayerModule { }