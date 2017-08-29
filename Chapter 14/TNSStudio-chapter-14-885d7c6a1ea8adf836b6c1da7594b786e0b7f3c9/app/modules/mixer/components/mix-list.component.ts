// angular
import { Component } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { MixerActions } from '../actions';
import { IMixerState } from '../states';

@Component({
  moduleId: module.id,
  selector: 'mix-list',
  templateUrl: 'mix-list.component.html'
})
export class MixListComponent {
  public mixer$: Observable<IMixerState>;

  constructor(private store: Store<any>) {
    this.mixer$ = store.select(s => s.mixerModule.mixer);
  }  
  
  public add() {
    this.store.dispatch(new MixerActions.AddAction());
  }

  public edit(composition) {
    this.store.dispatch(new MixerActions.EditAction(composition));
  }

  public select(composition) {
    this.store.dispatch(new MixerActions.SelectAction(composition));
  }
}
