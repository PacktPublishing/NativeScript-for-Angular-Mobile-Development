// angular
import { Injectable, NgZone } from '@angular/core';

// nativescript
import { isIOS } from 'platform';

// libs
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// app
import { ITrack, CompositionModel, TrackPlayerModel, IPlayerError } from '../../shared/models';

@Injectable()
export class PlayerService {

  // observable state
  public playing$: Subject<boolean> = new Subject();
  public duration$: Subject<number> = new Subject();
  public complete$: Subject<number> = new Subject();
  public currentTime$: Observable<number>;

  // active composition
  private _composition: CompositionModel;
  // internal state  
  private _playing: boolean;
  private _seeking: boolean;
  private _seekPaused: boolean;
  private _seekTimeout: number;
  // collection of track players
  private _trackPlayers: Array<TrackPlayerModel> = [];
  // used to report currentTime from
  private _longestTrack: TrackPlayerModel;

  constructor(private ngZone: NgZone) {
    console.log('PlayerService constructed.');
    this.currentTime$ = Observable.interval(1000)
      .switchMap(_ => {
        if (this._seeking) {
          return Observable.never();
        } else if (this._longestTrack) {
          return Observable.of(this._standardizeTime(this._longestTrack.player.currentTime));
        } else {
          return Observable.of(0);
        }
      });
  }

  public set playing(value: boolean) {
    this._playing = value;
    this.playing$.next(value);
  }

  public get playing(): boolean {
    return this._playing;
  }

  public set seeking(value: boolean) {
    this._seeking = value;
    if (this._playing && !this._seekPaused) {
      // pause while seeking
      this._seekPaused = true;
      this.pause();
    }
    if (this._seekTimeout) clearTimeout(this._seekTimeout);
    this._seekTimeout = setTimeout(() => {
      this._seeking = false;
      if (this._seekPaused) {
        // resume play
        this._seekPaused = false;
        this.play();
      }
    }, 1000);
  }

  public get composition(): CompositionModel {
    return this._composition;
  }

  public set composition(comp: CompositionModel) {
    this._composition = comp;
    // TODO: show activity indicator

    // clear any previous players
    this._resetTrackPlayers();
    // setup player instances for each track
    let initTrackPlayer = (index: number) => {
      let track = this._composition.tracks[index];
      let trackPlayer = new TrackPlayerModel();
      trackPlayer.load(
        track,
        this._trackComplete.bind(this),
        this._trackError.bind(this)
      ).then(_ => {

        this._trackPlayers.push(trackPlayer);
        index++;
        if (index < this._composition.tracks.length) {
          initTrackPlayer(index);
        } else {
          // report longest duration as totalDuration
          this._updateTotalDuration();
          // TODO: hide activity indicator
        }
      });
    };
    // kick off multi-track player initialization
    initTrackPlayer(0);
  }

  public togglePlay() {
    this.playing = !this.playing;
    if (this.playing) {
      this.play();
    } else {
      this.pause();
    }
  }

  public play() {
    // for iOS playback sync
    let shortStartDelay = .01;
    let now = 0;

    for (let i = 0; i < this._trackPlayers.length; i++) {
      let track = this._trackPlayers[i];
      if (isIOS) {
        if (i == 0) now = track.player.ios.deviceCurrentTime;
        (<any>track.player).playAtTime(now + shortStartDelay);
      } else {
        track.player.play();
      }
    }
  }

  public pause() {
    let currentTime = 0;

    for (let i = 0; i < this._trackPlayers.length; i++) {
      let track = this._trackPlayers[i];
      if (i == 0) currentTime = track.player.currentTime;
      track.player.pause();
      // ensure tracks pause at exactly the same time
      track.player.seekTo(currentTime);
    }
  }

  public seekTo(time: number) {
    for (let track of this._trackPlayers) {
      track.player.seekTo(time);
    }
  }

  public addTrack(track: ITrack): void {
    this._composition.tracks.push(track);
  }

  public removeTrack(track: ITrack): void {
    let index = this._getTrackIndex(track);
    if (index > -1) {
      this._composition.tracks.splice(index, 1);
    }
  }

  public reorderTrack(track: ITrack, newIndex: number) {
    let index = this._getTrackIndex(track);
    if (index > -1) {
      this._composition.tracks.splice(newIndex, 0, this._composition.tracks.splice(index, 1)[0]);
    }
  }

  private _getTrackIndex(track: ITrack): number {
    let index = -1;
    for (let i = 0; i < this._composition.tracks.length; i++) {
      if (this._composition.tracks[i].filepath === track.filepath) {
        index = i;
        break;
      }
    }
    return index;
  }

  private _updateTotalDuration() {
    // report longest track as the total duration of the mix
    let totalDuration = Math.max(...this._trackPlayers.map(t => t.duration));
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
    this.duration$.next(totalDuration);
  }
  private _trackComplete(trackId: number) {
    console.log('track complete:', trackId);
    this.ngZone.run(() => {
      this.playing = false;
      this.complete$.next(trackId);
    });
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