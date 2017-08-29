// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// app
import { SharedModule } from '../shared/shared.module';
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { PlayerEffects } from './effects';
import { playerReducer } from './reducers';

@NgModule({
  imports: [
    SharedModule,
    // player state
    StoreModule.forFeature('playerModule', {
      player: playerReducer
    }),
    // player effects
    EffectsModule.forFeature([
      PlayerEffects
    ])
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  exports: [
    SharedModule,
    ...COMPONENTS
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class PlayerModule {}