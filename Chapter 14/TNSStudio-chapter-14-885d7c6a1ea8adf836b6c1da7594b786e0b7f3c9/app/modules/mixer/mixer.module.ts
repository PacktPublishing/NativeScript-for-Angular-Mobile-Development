import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from 'nativescript-angular/router';

// libs
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

// app
import { PlayerModule } from '../player/player.module';
import { SharedModule } from '../shared/shared.module';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { BaseComponent } from './components/base.component';
import { MixerComponent } from './components/mixer.component';
import { MixListComponent } from './components/mix-list.component';
import { MixerEffects } from './effects';
import { mixerReducer } from './reducers';


const COMPONENTS: any[] = [
  ActionBarComponent,
  BaseComponent,
  MixerComponent,
  MixListComponent
]

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'home',
        component: MixListComponent
      },
      {
        path: ':id',
        component: MixerComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    PlayerModule,
    SharedModule,
    NativeScriptRouterModule.forChild(routes),
    // mixer state
    StoreModule.forFeature('mixerModule', {
      mixer: mixerReducer
    }),
    // mixer effects
    EffectsModule.forFeature([
      MixerEffects
    ])
  ],
  declarations: [
    ...COMPONENTS
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class MixerModule { }