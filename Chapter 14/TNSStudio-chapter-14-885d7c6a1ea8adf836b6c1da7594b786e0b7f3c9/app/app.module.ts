// angular
import { NgModule } from '@angular/core';

// app
import { CoreModule } from './modules/core';
import { SharedModule } from './modules/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }