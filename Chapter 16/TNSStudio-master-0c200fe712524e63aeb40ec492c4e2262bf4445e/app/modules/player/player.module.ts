// angular
import { NgModule } from '@angular/core';

// app
import { CoreModule } from '../core/core.module';
import { PlayerService } from './services/index';

@NgModule({
  imports: [ CoreModule ],
  providers: [ PlayerService ]
})
export class PlayerModule { }
