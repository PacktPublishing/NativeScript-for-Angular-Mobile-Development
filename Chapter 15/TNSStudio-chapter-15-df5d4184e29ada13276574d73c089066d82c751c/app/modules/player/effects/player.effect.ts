// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { TrackModel, TrackPlayerModel, CompositionModel } from '../../shared/models';
import { PlayerService } from '../services/player.service';
import { PlayerActions } from '../actions';

@Injectable()
export class PlayerEffects {

  @Effect() togglePlay$: Observable<Action> = this.actions$
    .ofType(PlayerActions.ActionTypes.TOGGLE_PLAY)
    .withLatestFrom(this.store)
    .map(([action, state]: [PlayerActions.TogglePlayAction, any]) => {
      let playing = !state.playerModule.player.playing;
      if (playing) {
        return new PlayerActions.PlayAction(action.payload);
      } else {
        return new PlayerActions.PauseAction();
      }
    });
  
  @Effect() play$: Observable<Action> = this.actions$
    .ofType(PlayerActions.ActionTypes.PLAY)
    .withLatestFrom(this.store)
    .map(([action, state]: [PlayerActions.PlayAction, any]) => {
      let playing = state.playerModule.player.playing;
      if (!playing) {
        // only if not already playing
        return new PlayerActions.UpdatedAction({
          playing: true,
          completed: false,
          seeking: false,
          seekToTime: undefined,
          excludeTrackId: action.payload
        })
      } else {
        return new PlayerActions.NoopAction();
      }
    });
  
  @Effect() pause$: Observable<Action> = this.actions$
    .ofType(PlayerActions.ActionTypes.PAUSE)
    .withLatestFrom(this.store)
    .map(([action, state]: [PlayerActions.PauseAction, any]) => {
      let playing = state.playerModule.player.playing;
      if (playing) {
        return new PlayerActions.UpdatedAction({
          playing: false,
          completed: false,
          seekToTime: action.payload
        });
      } else {
        return new PlayerActions.NoopAction();
      }
    });
  
  @Effect() seek$: Observable<Action> = this.actions$
    .ofType(PlayerActions.ActionTypes.SEEK)
    .withLatestFrom(this.store)
    .map(([action, state]: [PlayerActions.SeekAction, any]) => {
      this.playerService.seeking = true;
      return new PlayerActions.UpdatedAction({
        playing: false,
        seeking: true,
        seekToTime: action.payload
      })
    });

  // @Effect() add$: Observable<Action> = this.actions$
  //   .ofType(MixerActions.ActionTypes.ADD)
  //   .withLatestFrom(this.store)
  //   .switchMap(([action, state]) =>
  //     Observable.fromPromise(this.mixerService.add())
  //       .map(value => {
  //         // console.log(value.result, value.text);
  //         if (value.result) {
  //           let compositions = [...state.mixerModule.mixer.compositions];
  //           let composition = new CompositionModel({
  //             id: compositions.length + 1,
  //             name: value.text,
  //             order: compositions.length // next one in line
  //           });
  //           compositions.push(composition);
  //           // persist changes
  //           return new MixerActions.SaveAction(compositions);
  //         } else {
  //           return new MixerActions.CancelAction();
  //         }
  //       })
  //   );

  // @Effect() edit$: Observable<Action> = this.actions$
  //   .ofType(MixerActions.ActionTypes.EDIT)
  //   .withLatestFrom(this.store)
  //   .switchMap(([action, state]) => {
  //     const composition = action.payload;
  //     return Observable.fromPromise(this.mixerService.edit(composition.name))
  //       .map(value => {
  //         // console.log(value.result, value.text);
  //         if (value.result) {
  //           let compositions = [...state.mixerModule.mixer.compositions];
  //           for (let i = 0; i < compositions.length; i++) {
  //             if (compositions[i].id === composition.id) {
  //               compositions[i].name = value.text;
  //               break;
  //             }
  //           }
  //           // persist changes
  //           return new MixerActions.SaveAction(compositions);
  //         } else {
  //           return new MixerActions.CancelAction();
  //         }
  //       })
  //   });

  // @Effect() update$: Observable<Action> = this.actions$
  //   .ofType(MixerActions.ActionTypes.UPDATE)
  //   .withLatestFrom(this.store)
  //   .map(([action, state]) => {
  //     let compositions = [...state.mixerModule.mixer.compositions];
  //     const composition = action.payload;
  //     for (let i = 0; i < compositions.length; i++) {
  //       if (compositions[i].id === composition.id) {
  //         compositions[i] = composition;
  //         break;
  //       }
  //     }
  //     // persist changes
  //     return new MixerActions.SaveAction(compositions);
  //   });

  // @Effect() select$: Observable<Action> = this.actions$
  //   .ofType(MixerActions.ActionTypes.SELECT)
  //   .map(action => {
  //     this.router.navigate(['/mixer', action.payload.id]);
  //     return new MixerActions.UpdatedAction({
  //       activeComposition: action.payload
  //     });
  //   });

  // @Effect() save$: Observable<Action> = this.actions$
  //   .ofType(MixerActions.ActionTypes.SAVE)
  //   .withLatestFrom(this.store)
  //   .map(([action, state]) => {
  //     const compositions = action.payload || state.mixerModule.mixer.compositions;
  //     // persist
  //     this.mixerService.save(compositions);
  //     return new MixerActions.UpdatedAction({ compositions });
  //   });
  
  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private playerService: PlayerService
  ) { }
}
