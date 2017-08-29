// angular
import { NgModule } from '@angular/core';

// app
import { CoreModule } from '../core/core.module';
import { RecorderService } from './services/index';

@NgModule({
  imports: [ CoreModule ],
  providers: [ RecorderService ]
})
export class RecorderModule { }
