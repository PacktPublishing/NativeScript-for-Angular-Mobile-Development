// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// app
import { UIActions } from '../actions';

@Injectable()
export class UIEffects {

  @Effect() trackListToggle$: Observable<Action> = this.actions$
    .ofType(UIActions.ActionTypes.TRACKLIST_TOGGLE)
    .withLatestFrom(this.store)
    .map(([action, state]: [UIActions.TrackListToggleAction, any]) => new UIActions.UpdatedAction({
      trackListViewType: action.payload || (state.ui.trackListViewType == 'default' ? 'waveform' : 'default')
    }));

  constructor(
    private store: Store<any>,
    private actions$: Actions
  ) { }
}
