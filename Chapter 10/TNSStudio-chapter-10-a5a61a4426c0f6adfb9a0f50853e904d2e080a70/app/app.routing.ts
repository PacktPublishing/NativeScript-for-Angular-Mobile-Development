import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { NativeScriptRouterModule, NSModuleFactoryLoader } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/mixer/home',
    pathMatch: 'full'
  },
  {
    path: 'mixer',
    loadChildren: './modules/mixer/mixer.module#MixerModule'
  },
  {
    path: 'record',
    loadChildren: './modules/recorder/recorder.module#RecorderModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    NativeScriptRouterModule.forRoot(routes)
  ],
  providers: [
    AuthGuard,
    {
      provide: NgModuleFactoryLoader,
      useClass: NSModuleFactoryLoader
    }
  ],
  exports: [
    NativeScriptRouterModule
  ]
})
export class AppRoutingModule { }