// nativescript
import { NativeScriptCommonModule } from 'nativescript-angular/common'; 
import { NativeScriptRouterModule } from 'nativescript-angular/router'; 
import { NativeScriptFormsModule } from 'nativescript-angular/forms'; 

// angular
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

// libs
import { TNSFontIconModule } from 'nativescript-ngx-fonticon';

// app
import { COMPONENTS } from './components';
import { DIRECTIVES } from './directives';
import { ButtonDirective } from './directives/button.directive';
import { MultiGestureDirective } from './directives/multi-gesture.directive';
import { PIPES } from './pipes';

// register nativescript custom components
import { registerElement } from 'nativescript-angular/element-registry';
import { Waveform } from './native/waveform';
registerElement('Waveform', () => Waveform);

@NgModule({
  imports: [
    NativeScriptCommonModule, 
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    TNSFontIconModule
  ],
  declarations: [
    ...COMPONENTS,
    ...DIRECTIVES,
    ButtonDirective,
    MultiGestureDirective,
    ...PIPES
  ],
  exports: [
    NativeScriptCommonModule,
    NativeScriptRouterModule,
    NativeScriptFormsModule,
    TNSFontIconModule,
    ...COMPONENTS,
    ...DIRECTIVES,
    ButtonDirective,
    MultiGestureDirective,
    ...PIPES
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class SharedModule {}
