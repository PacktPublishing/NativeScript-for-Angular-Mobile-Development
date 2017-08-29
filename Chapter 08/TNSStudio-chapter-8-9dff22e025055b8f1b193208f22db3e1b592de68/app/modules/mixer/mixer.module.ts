import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { PlayerModule } from '../player/player.module';
import { SharedModule } from '../shared/shared.module';
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { BaseComponent } from './components/base.component';
import { MixerComponent } from './components/mixer.component';
import { MixListComponent } from './components/mix-list.component';
// import { PROVIDERS } from './services';

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
    NativeScriptRouterModule.forChild(routes)
  ],
  declarations: [
    ...COMPONENTS
  ],
  // providers: [
  //   ...PROVIDERS
  // ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class MixerModule { }