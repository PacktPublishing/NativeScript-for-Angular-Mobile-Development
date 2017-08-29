// angular
import { Injectable, ViewContainerRef, NgZone } from '@angular/core';

// nativescript
import { RouterExtensions } from 'nativescript-angular/router';
import * as timer from 'tns-core-modules/timer';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { UserActions } from '../../core/actions';
import { DialogService } from '../../core/services/dialog.service';
import { CompositionModel, TrackModel } from '../../shared/models';
import { PlayerActions } from '../../player/actions';
import { PlayerService } from '../../player/services/player.service';
import { RecordComponent } from '../../recorder/components/record.component';
import { MixerService } from '../services/mixer.service';
import { MixerActions } from '../actions';
import { IMixerState } from '../states';

@Injectable()
export class MixerEffects {

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.INIT)
    .startWith(new MixerActions.InitAction())
    .map(action =>
      
      new MixerActions.UpdatedAction({
        compositions: this.mixerService.hydrate(
          this.mixerService.savedCompositions()
          || this.mixerService.demoComposition())
      })
    );

  @Effect() add$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.ADD)
    .withLatestFrom(this.store)
    .switchMap(([action, state]: [MixerActions.AddAction, any]) =>
      Observable.fromPromise(this.mixerService.add())
        .map(value => {
          // console.log(value.result, value.text);
          if (value.result) {
            let compositions = [...state.mixerModule.mixer.compositions];
            let composition = new CompositionModel({
              id: compositions.length + 1,
              name: value.text,
              order: compositions.length // next one in line
            });
            compositions.push(composition);
            // persist changes
            return new MixerActions.SaveAction(compositions);
          } else {
            return new MixerActions.CancelAction();
          }
        })
  );
  
  @Effect() delete$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.DELETE)
    .withLatestFrom(this.store)
    .map(([action, state]: [MixerActions.DeleteAction, any]) => {
      let compositions = [...state.mixerModule.mixer.compositions];
      let index = compositions.findIndex(c => c.id === action.payload.id);
      if (index > -1) {
        this.mixerService.deleteFiles(compositions[index].tracks.map(t => t.filepath));
        compositions.splice(index, 1);
      }
      return new MixerActions.SaveAction(compositions);
    });

  @Effect() removeTrack$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.REMOVE_TRACK)
    .withLatestFrom(this.store)
    .map(([action, state]: [MixerActions.RemoveTrackAction, any]) => {
      let mixerState = state.mixerModule.mixer;
      
      if (action.payload.persist) {

        let compositions = [...state.mixerModule.mixer.compositions];
        for (let i = 0; i < compositions.length; i++) {
          if (compositions[i].id === state.mixerModule.mixer.activeComposition.id) {
            // find track by id and update 
            const index = this._getTrackIndex(compositions[i], action.payload.trackId);
            if (index > -1) {
              compositions[i].tracks.splice(index, 1);
            }
            break;
          }
        }

        // update track players
        this.playerService.removeTrackPlayer(action.payload.trackId);

        // persist changes
        return new MixerActions.SaveAction(compositions);
      } else {
        const activeComposition = new CompositionModel(state.mixerModule.mixer.activeComposition);
        const index = this._getTrackIndex(activeComposition, action.payload.trackId);
        if (index > -1) {
          activeComposition.tracks.splice(index, 1);
        }
        return new MixerActions.UpdatedAction({
          activeComposition,
          recordingTrack: null
        });
      }
    });
  
  // @Effect() addTrack$: Observable<Action> = this.actions$
  //   .ofType(MixerActions.ActionTypes.ADD_TRACK)
  //   .withLatestFrom(this.store)
  //   .map(([action, state]) =>
  //         state.mixerModule.mixer.activeComposition.tracks.push(track);
  //           // persist changes
  //           return new MixerActions.SaveAction(compositions);
  //         } else {
  //           return new MixerActions.CancelAction();
  //         }
  //       })
  //   );

  @Effect() recordTrack$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.RECORD_TRACK)
    .withLatestFrom(this.store)
    .map(([action, state]: [MixerActions.RecordTrackAction, any]) => {
      let mixerState = state.mixerModule.mixer;
      let activeComposition = new CompositionModel(mixerState.activeComposition);
      let track;
      let trackId = action.payload.id;
      let filepath = action.payload.filePath;
      if (!trackId) {
        // Create a new track
        let cnt = this._defaultTrackNamesCnt(activeComposition);
        track = new TrackModel({
          name: `${this._defaultTrackName}${cnt ? ' ' + (cnt + 1) : ''}`,
          order: activeComposition.tracks.length,
          filepath,
          model: {
            target: filepath
          }
        });
        trackId = track.id;
        activeComposition.tracks.push(track);
        // this.playerService.updateTrackPlayers(track);
      } else {
        // find by id and update 
        track = this._findTrack(activeComposition, trackId);
        track.filepath = filepath;
        track.model.target = filepath;
      }

      return new MixerActions.UpdatedAction({
        activeComposition,
        recordingTrack: track
      });
    });
  
  @Effect() saveRecord$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.SAVE_RECORD)
    .withLatestFrom(this.store)
    .map(([action, state]: [MixerActions.SaveRecordAction, any]) => {
      let mixerState = state.mixerModule.mixer;
      let activeComposition = new CompositionModel(mixerState.activeComposition);
      let track;
      let trackId = action.payload.id;
      let filepath = action.payload.filePath;
      // find by id and update 
      track = this._findTrack(activeComposition, trackId);
      track.filepath = filepath;
      track.model.target = filepath;

      // update compositions list and save
      const compositions = [...mixerState.compositions];
      for (let i = 0; i < compositions.length; i++) {
        if (compositions[i].id === activeComposition.id) {
          compositions[i] = activeComposition;
          break;
        }
      }

      // always update trackPlayers as a result of updating any tracks
      this.playerService.updateTrackPlayers(track);

      // persist and update state
      this.mixerService.save(compositions);
      return new MixerActions.UpdatedAction({
        compositions,
        activeComposition,
        recordingTrack: null
      });
    });

  @Effect() edit$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.EDIT)
    .withLatestFrom(this.store)
    .switchMap(([action, state]: [MixerActions.EditAction, any]) => {
      const composition = action.payload;
      return Observable.fromPromise(this.mixerService.edit(composition.name))
        .map(value => {
          // console.log(value.result, value.text);
          if (value.result) {
            let compositions = [...state.mixerModule.mixer.compositions];
            for (let i = 0; i < compositions.length; i++) {
              if (compositions[i].id === composition.id) {
                compositions[i].name = value.text;
                break;
              }
            }
            // persist changes
            return new MixerActions.SaveAction(compositions);
          } else {
            return new MixerActions.CancelAction();
          }
        })
    });

  @Effect() update$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.UPDATE)
    .withLatestFrom(this.store)
    .map(([action, state]: [MixerActions.UpdateAction, any]) => {
      let compositions = [...state.mixerModule.mixer.compositions];
      const composition = action.payload;
      for (let i = 0; i < compositions.length; i++) {
        if (compositions[i].id === composition.id) {
          compositions[i] = composition;
          break;
        }
      }
      // persist changes
      return new MixerActions.SaveAction(compositions);
    });
  
  @Effect() updateTrack$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.UPDATE_TRACK)
    .withLatestFrom(this.store)
    .map(([action, state]: [MixerActions.UpdateTrackAction, any]) => {
      let compositions = [...state.mixerModule.mixer.compositions];

      let track;
      let trackId = action.payload.id;
      let updatedProperties = action.payload.updatedProperties;

      for (let i = 0; i < compositions.length; i++) {
        if (compositions[i].id === state.mixerModule.mixer.activeComposition.id) {
          // find track by id and update 
          track = this._findTrack(compositions[i], trackId);
          for (let key in updatedProperties) {
            track[key] = updatedProperties[key];
            if (key === 'filepath') {
              // also update model (for waveform file display)
              track.model.target = updatedProperties[key];
            }
          }
          break;
        }
      }

      if (track) {
        // always update trackPlayers as a result of updating any tracks
        this.playerService.updateTrackPlayers(track);
      }

      // persist changes
      return new MixerActions.SaveAction(compositions);
    });

  @Effect() select$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.SELECT)
    .map((action: MixerActions.SelectAction) => {
      timer.setTimeout(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/mixer', action.payload.id]);
        });
      }, 300);
      return new MixerActions.UpdatedAction({
        activeComposition: action.payload
      });
    });
  
  @Effect({ dispatch: false }) openRecord$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.OPEN_RECORD)
    .withLatestFrom(this.store)
    // always pause/reset playback before handling
    .do(action => new PlayerActions.PauseAction(0))
    .map(([action, state]: [MixerActions.OpenRecordAction, any]) => {
      if (state.mixerModule.mixer.activeComposition &&
        state.mixerModule.mixer.activeComposition.tracks.length) {
        // show record modal but check authentication
        // if (state.user.current) {
          if (action.payload.track) {
            // rerecording
            this.dialogService
              .confirm('Are you sure you want to re-record this track?', 'Re-Record').then((ok) => {
                if (ok) this._showRecordModal(action.payload.vcRef, action.payload.track);
              });
          } else {
            this._showRecordModal(action.payload.vcRef);
          }
        // } else {
        //   this.store.dispatch(new UserActions.LoginToRecordAction(action.payload));
        // }
      } else {
        // navigate to it
        this.ngZone.run(() => {
          this.router.navigate(['/record']);
        });
      }
      return action;
    });

  @Effect() save$: Observable<Action> = this.actions$
    .ofType(MixerActions.ActionTypes.SAVE)
    .withLatestFrom(this.store)
    .map(([action, state]: [MixerActions.SaveAction, any]) => {
      let mixerState = state.mixerModule.mixer;
      const compositions = action.payload || state.mixerModule.mixer.compositions;
      let activeComposition: CompositionModel = null;
      if (mixerState.activeComposition) {
        for (let comp of compositions) {
          if (comp.id === mixerState.activeComposition.id) {
            activeComposition = comp;
          }
        }
      }
      // persist
      this.mixerService.save(compositions);
      let updated: IMixerState = {
        compositions,
        recordingTrack: null
      };
      if (activeComposition) {
        updated.activeComposition = activeComposition;
      }
      return new MixerActions.UpdatedAction(updated);
    });

  // default name of new tracks
  private _defaultTrackName: string = 'New Track';

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private ngZone: NgZone,
    private router: RouterExtensions,
    private dialogService: DialogService,
    private mixerService: MixerService,
    private playerService: PlayerService
  ) { }

  public reorderTrack(activeComposition: CompositionModel, track: TrackModel, newIndex: number) {
    let index = this._getTrackIndex(activeComposition, track.id);
    if (index > -1) {
      activeComposition.tracks.splice(newIndex, 0, activeComposition.tracks.splice(index, 1)[0]);
    }
  }

  private _findTrack(activeComposition: CompositionModel, trackId: number) {
    return activeComposition.tracks.find(t => t.id === trackId);
  }

  private _updateTrack(activeComposition: CompositionModel, track: TrackModel) {
    for (let t of activeComposition.tracks) {
      if (t.id === track.id) {
        t = track;
        break;
      }
    }
  }

  private _getTrackIndex(activeComposition: CompositionModel, trackId: number): number {
    let index = -1;
    if (activeComposition && activeComposition.tracks) {
      for (let i = 0; i < activeComposition.tracks.length; i++) {
        if (activeComposition.tracks[i].id === trackId) {
          index = i;
          break;
        }
      }
    }
    return index;
  }  

  private _defaultTrackNamesCnt(activeComposition: CompositionModel) {
    return activeComposition.tracks.filter(t => t.name.startsWith(this._defaultTrackName)).length;
  }

  private _showRecordModal(vcRef: ViewContainerRef, track?: TrackModel) {
    let context: any = { isModal: true };
    if (track) {
      // re-recording track - even from track-list component
      context.track = track;
    }
    this.dialogService.openModal(
      RecordComponent,
      vcRef,
      context,
      './modules/recorder/recorder.module#RecorderModule'
    );
  }
}
