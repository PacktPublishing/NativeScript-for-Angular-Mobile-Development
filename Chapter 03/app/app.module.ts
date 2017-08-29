// angular
import { NgModule } from '@angular/core';

// app
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { PlayerModule } from './modules/player/player.module';

@NgModule({
  imports: [
    CoreModule,
    PlayerModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }