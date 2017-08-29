// angular
import { Injectable, NgZone } from '@angular/core';

// nativescript
import { isIOS } from 'platform';

// libs
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// app
import { ITrack, CompositionModel, TrackModel, TrackPlayerModel, IPlayerError } from '../../shared/models';
import { MixerService } from '../../mixer/services/mixer.service';

@Injectable()
export class PlayerService {

  // observable state
  public playing$: Subject<boolean> = new Subject();
  public duration$: Subject<number> = new Subject();
  public complete$: Subject<number> = new Subject();
  public currentTime$: Observable<number>;

  // tmp Chapter 8 awkwardness because of service/module dependency
  // stuff like this is solved with ngrx coming in Chapter 8
  public trackListViewChange$: Subject<string> = new Subject();

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
  // default name of new tracks
  private _defaultTrackName: string = 'New Track';
  // tmp Chapter 8 awkwardness without ngrx
  private _trackListViewType: string = 'default';

  constructor(
    private ngZone: NgZone,
    private mixerService: MixerService
  ) {
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

  public get trackListViewType() {
    return this._trackListViewType;
  }

  public set trackListViewType(value: string) {
    this._trackListViewType = value;
    this.trackListViewChange$.next(value);
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
    if (this._composition.tracks.length) {
      // kick off multi-track player initialization
      initTrackPlayer(0);
    } else {
      // no tracks, just update duration to 0
      this._updateTotalDuration();
    }
  }

  public saveComposition() {
    this.mixerService.save(this.composition);
  }

  public togglePlay(excludeTrackId?: number) {
    if (this._trackPlayers.length) {
      this.playing = !this.playing;
      if (this.playing) {
        this.play(excludeTrackId);
      } else {
        this.pause();
      }
    }
  }

  public play(excludeTrackId?: number) {
    // for iOS playback sync
    let shortStartDelay = .01;
    let now = 0;

    for (let i = 0; i < this._trackPlayers.length; i++) {
      let track = this._trackPlayers[i];
      if (excludeTrackId !== track.track.id) {
        if (isIOS) {
          if (i == 0) now = track.player.ios.deviceCurrentTime;
          (<any>track.player).playAtTime(now + shortStartDelay);
        } else {
          track.player.play();
        }
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
    console.log('seeking to:', time);
    for (let track of this._trackPlayers) {
      console.log('duration:', track.duration);
      if (time < track.duration) {
        track.player.seekTo(time);
      }
    }
  }

  public addTrack(track: TrackModel): Promise<any> {
    return new Promise((resolve, reject) => {

      let trackPlayer = this._trackPlayers.find((p) => p.track.id === track.id);
      if (!trackPlayer) {
        trackPlayer = new TrackPlayerModel();
        this._composition.tracks.push(track);
        this._trackPlayers.push(trackPlayer);
      } else {
        // update track
        this.updateTrack(track);
      }
      
      trackPlayer.load(
        track,
        this._trackComplete.bind(this),
        this._trackError.bind(this)
      ).then(_ => {
        // report longest duration as totalDuration
        this._updateTotalDuration();
        resolve();
      });
    })
  }

  public removeTrack(trackId: number): void {
    let index = this._getTrackPlayerIndex(trackId);
    if (index > -1) {
      this._trackPlayers.splice(index, 1);
    }
    index = this._getTrackIndex(trackId);
    if (index > -1) {
      this._composition.tracks.splice(index, 1);
    }
  }

  public reorderTrack(track: ITrack, newIndex: number) {
    let index = this._getTrackIndex(track.id);
    if (index > -1) {
      this._composition.tracks.splice(newIndex, 0, this._composition.tracks.splice(index, 1)[0]);
    }
  }

  public findTrack(trackId: number) {
    return this._composition.tracks.find(t => t.id === trackId);
  }

  public updateTrack(track: TrackModel) {
    for (let t of this._composition.tracks) {
      if (t.id === track.id) {
        t = track;
        break;
      }
    }
  }

  public updateCompositionTrack(trackId: number, filepath: string): number {
    let track;
    if (!trackId) {
      // Create a new track
      let cnt = this._defaultTrackNamesCnt();
      track = new TrackModel({
        name: `${this._defaultTrackName}${cnt ? ' ' + (cnt + 1) : ''}`,
        order: this.composition.tracks.length,
        filepath,
        model: {
          target: filepath
        }
      });
      trackId = track.id;
    } else {
      // find by id and update 
      track = this.findTrack(trackId);
      track.filepath = filepath;
      track.model.target = filepath;
    }
    this.addTrack(track);
    return trackId;
  }

  private _defaultTrackNamesCnt() {
    return this.composition.tracks.filter(t => t.name.startsWith(this._defaultTrackName)).length;
  }

  private _getTrackIndex(trackId: number): number {
    let index = -1;
    for (let i = 0; i < this._composition.tracks.length; i++) {
      if (this._composition.tracks[i].id === trackId) {
        index = i;
        break;
      }
    }
    return index;
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
    this.duration$.next(totalDuration);
  }
  private _trackComplete(trackId: number) {
    console.log('track complete:', trackId);
    if (this._longestTrack.track.id === trackId) {
      this.ngZone.run(() => {
        this.playing = false;
        this.complete$.next(trackId);
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