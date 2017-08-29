// nativescript
import { NativeScriptModule } from 'nativescript-angular/nativescript.module'; 
import { NativeScriptFormsModule } from 'nativescript-angular/forms'; 
import { NativeScriptHttpModule } from 'nativescript-angular/http'; 

// angular
import { NgModule, Optional, SkipSelf } from '@angular/core';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// app
import { UserEffects, UIEffects } from './effects';
import { userReducer, uiReducer } from './reducers';
import { PROVIDERS } from './services';
import { PROVIDERS as MIXER_PROVIDERS } from '../mixer/services';
import { PROVIDERS as PLAYER_PROVIDERS } from '../player/services';

const MODULES: any[] = [
  NativeScriptModule,
  NativeScriptFormsModule,
  NativeScriptHttpModule
];

@NgModule({
  imports: [
    ...MODULES,
    // define core state
    StoreModule.forRoot({
      user: userReducer,
      ui: uiReducer
    }),
    // register core effects
    EffectsModule.forRoot([
      UIEffects,
      UserEffects
    ]),
  ],
  providers: [
    ...PROVIDERS,
    ...MIXER_PROVIDERS,
    ...PLAYER_PROVIDERS
  ],
  exports: [
    ...MODULES
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
