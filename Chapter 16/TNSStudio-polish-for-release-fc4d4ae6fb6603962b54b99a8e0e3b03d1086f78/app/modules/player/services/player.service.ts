// angular
import { Injectable, NgZone } from '@angular/core';

// nativescript
import { isIOS } from 'tns-core-modules/platform';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// app
import { deleteFile } from '../../../helpers';
import { ITrack, CompositionModel, TrackModel, TrackPlayerModel, IPlayerError } from '../../shared/models';
import { MixerActions } from '../../mixer/actions';
import { IMixerModuleState } from '../../mixer/states';
import { IRecorderModuleState, RecordState } from '../../recorder/states';
import { PlayerActions } from '../actions';
import { IPlayerState, IPlayerModuleState } from '../states';

@Injectable()
export class PlayerService {

  // observable state
  public currentTime$: Observable<number>;
  public sliderUpdate$: Subject<number> = new Subject();

  // internal state  
  private _activeCompositionId: number;
  private _seeking: boolean;
  private _seekPaused: boolean;
  private _seekTimeout: number;
  // collection of track players
  private _trackPlayers: Array<TrackPlayerModel> = [];
  // used to report currentTime from
  private _longestTrack: TrackPlayerModel;

  constructor(
    private store: Store<any>,
    private ngZone: NgZone
  ) {
    console.log('PlayerService constructed.');
    this.currentTime$ = Observable.interval(1000)
      .switchMap(_ => {
        if (this._seeking) {
          console.log('seeking:', this._seeking);
          return Observable.never();
        } else if (this._longestTrack) {
          let time = this._standardizeTime(this._longestTrack.player.currentTime);
          console.log('time:', time);
          return Observable.of(time);
        } else {
          return Observable.of(0);
        }
      });

    store.select('mixerModule').subscribe((state: IMixerModuleState) => {
      if (state.mixer.activeComposition) {
        this.setupComposition(state.mixer.activeComposition);
      }
      if (state.mixer.recordingTrack) {
        this.updateTrackPlayers(state.mixer.recordingTrack);
      }
    });

    store.select(s => s.playerModule.player).subscribe((state: IPlayerState) => {
      if (state.playing) {
        this.play(state.excludeTrackId);
      } else if (!state.seeking && !state.completed) {
        this.pause(state.seekToTime);
      }

      if (state.seeking) {
        this.seekTo(state.seekToTime);
      }
    });
  }

  public set seeking(value: boolean) {
    this._seeking = value;
    this.store.select(s => s.playerModule.player)
      .take(1)
      .subscribe((state: IPlayerState) => {
        if (state.playing && !this._seekPaused) {
          // pause while seeking
          this._seekPaused = true;
          this.store.dispatch(new PlayerActions.PauseAction());
        }
        if (this._seekTimeout) clearTimeout(this._seekTimeout);
        this._seekTimeout = setTimeout(() => {
          this._seeking = false;
          // ensure slider is updated
          this.store.select(s => s.playerModule.player)
            .take(1)
            .subscribe((state: IPlayerState) => {
              let seekTime = state.seekToTime;
              if (typeof seekTime !== 'number') {
                seekTime = parseInt(seekTime, 10);
                if (isNaN(seekTime)) {
                  seekTime = 0; // just default to beginning
                }
              }
              this.sliderUpdate$.next(seekTime);
            });
          if (this._seekPaused) {
            // resume play
            this._seekPaused = false;
            this.store.dispatch(new PlayerActions.PlayAction());
          }
        }, 1000);
      });
  }

  public setupComposition(activeComposition: CompositionModel) {
    if (this._activeCompositionId !== activeComposition.id) {
      this._activeCompositionId = activeComposition.id;
      console.log('setting up composition:', activeComposition);
      // TODO: show activity indicator

      // clear any previous players
      this._resetTrackPlayers();
      // setup player instances for each track
      let initTrackPlayer = (index: number) => {
        let track = activeComposition.tracks[index];
        let trackPlayer = new TrackPlayerModel();
        trackPlayer.load(
          track,
          this._trackComplete.bind(this),
          this._trackError.bind(this)
        ).then(_ => {

          this._trackPlayers.push(trackPlayer);
          index++;
          if (index < activeComposition.tracks.length) {
            initTrackPlayer(index);
          } else {
            // report longest duration as totalDuration
            this._updateTotalDuration();
            // TODO: hide activity indicator
          }
        });
      };
      if (activeComposition.tracks.length) {
        // kick off multi-track player initialization
        initTrackPlayer(0);
      } else {
        // no tracks, just update duration to 0
        this._updateTotalDuration();
      }
    }
  }

  public play(excludeTrackId?: number) {
    if (this._trackPlayers.length == 0) {
      // no tracks loaded, reset state back
      this.store.dispatch(new PlayerActions.PauseAction());
    } else {
      // for iOS playback sync
      let shortStartDelay = .01;
      let now = 0;

      for (let i = 0; i < this._trackPlayers.length; i++) {
        let trackPlayer = this._trackPlayers[i];
        if (excludeTrackId !== trackPlayer.track.id) {
          if (isIOS) {
            if (i == 0) now = trackPlayer.player.ios.deviceCurrentTime;
            (<any>trackPlayer.player).playAtTime(now + shortStartDelay);
          } else {
            trackPlayer.player.play();
          }
        }
      }
    }
  }

  public pause(seekToTime?: number) {
    let usePlayerTime = true;
    let currentTime = 0;
    if (typeof seekToTime !== 'undefined') {
      usePlayerTime = false;
      currentTime = seekToTime;
    }

    for (let i = 0; i < this._trackPlayers.length; i++) {
      let track = this._trackPlayers[i];
      if (i == 0 && usePlayerTime) currentTime = track.player.currentTime;
      track.player.pause();
      // ensure tracks pause at exactly the same time
      track.player.seekTo(currentTime);
    }
  }

  public seekTo(time: number) {
    console.log('seeking to:', time);
    for (let track of this._trackPlayers) {
      console.log('duration:', track.duration);
      if (time < track.duration) {
        track.player.seekTo(time);
      }
    }
  }

  public updateTrackPlayers(track: TrackModel) {
    if (track.filepath) {
      console.log('updating trackplayers, filepath:', track.filepath);
      let trackPlayer = this._trackPlayers.find((p) => p.track.id === track.id);
      if (!trackPlayer) {
        trackPlayer = new TrackPlayerModel();
        this._trackPlayers.push(trackPlayer);
      }

      trackPlayer.load(
        track,
        this._trackComplete.bind(this),
        this._trackError.bind(this)
      ).then(_ => {
        // report longest duration as totalDuration
        this._updateTotalDuration();
      });
    }
  }

  public removeTrackPlayer(trackId: number): void {
    let index = this._getTrackPlayerIndex(trackId);
    if (index > -1) {
      this._trackPlayers[index].player.dispose();
      const filePath = this._trackPlayers[index].track.filepath;
      deleteFile(filePath);
      this._trackPlayers.splice(index, 1);
    }
    this._updateTotalDuration();
  }

  private _getTrackPlayerIndex(trackId: number): number {
    let index = -1;
    for (let i = 0; i < this._trackPlayers.length; i++) {
      if (this._trackPlayers[i].track.id === trackId) {
        index = i;
        break;
      }
    }
    return index;
  }

  private _updateTotalDuration() {
    // report longest track as the total duration of the mix
    let totalDuration = this._trackPlayers.length ? Math.max(...this._trackPlayers.map(t => t.duration)) : 0;
    // update trackPlayer to reflect longest track 
    for (let t of this._trackPlayers) {
      if (t.duration === totalDuration) {
        this._longestTrack = t;
        break;
      }
    }
    // iOS: reports duration in seconds
    // Android: reports duration in milliseconds
    // standardize to seconds
    totalDuration = this._standardizeTime(totalDuration);
    console.log('totalDuration of mix:', totalDuration);
    this.store.dispatch(new PlayerActions.UpdatedAction({
      duration: totalDuration
    }));
  }
  private _trackComplete(trackId: number) {
    console.log('track complete:', trackId);
    if (this._longestTrack.track.id === trackId) {
      this.store.select('recorderModule').take(1)
        .subscribe((state: IRecorderModuleState) => {
          
          if (state && state.recorder === RecordState.recording) {
            // ignore if recording since could be recording longer than existing tracks
            return;
          }

          this.ngZone.run(() => {
            this.store.dispatch(new PlayerActions.UpdatedAction({
              playing: false,
              completed: true
            }));
          });
        });
    }
  }
  private _trackError(playerError: IPlayerError) {
    console.log(`trackId ${playerError.trackId} error:`, playerError.error);
  }
  private _standardizeTime(time: number) {
    return isIOS ? time : time * .001;
  }
  private _resetTrackPlayers() {
    for (let t of this._trackPlayers) {
      t.cleanup();
    }
    this._trackPlayers = [];
  }
}