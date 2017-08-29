// nativescript
import { isIOS } from 'tns-core-modules/platform';

// libs
import { TNSPlayer } from 'nativescript-audio';
import { Subscription } from 'rxjs/Subscription';

// app
import { TrackModel } from './track.model';

interface ITrackPlayer {
  track: TrackModel;
  duration: number;
  readonly player: TNSPlayer;
}

export interface IPlayerError {
  trackId: number;
  error: any;
}

export class TrackPlayerModel implements ITrackPlayer {
  public track: TrackModel;
  public duration: number;

  private _player: TNSPlayer;
  private _completeHandler: (number) => void;
  private _errorHandler: (IPlayerError) => void;
  private _sub: Subscription;

  constructor() {
    this._player = new TNSPlayer();
  }

  public load(track: TrackModel, complete: (number) => void, error: (IPlayerError) => void): Promise<number> {
    return new Promise((resolve, reject) => {
      this.track = track;
      this._completeHandler = complete;
      this._errorHandler = error;

      this._player.initFromFile({
        audioFile: track.filepath,
        loop: false,
        completeCallback: zonedCallback(this._trackComplete.bind(this)),
        errorCallback: zonedCallback(this._trackError.bind(this))
      }).then(() => {

        console.log('init track player for:', track.name);
        this._player.getAudioTrackDuration().then((duration) => {
          console.log(`duration:`, duration);
          this.duration = track.duration = +duration;
          resolve();
        });

        // if reloading track, clear subscription before subscribing again
        if (this._sub) this._sub.unsubscribe();
        this._sub = this.track.volume$
          .throttleTime(500)
          .subscribe((value) => {
            if (this._player) {
              console.log('setting track volume:', value);
              this._player.volume = value;
            }
          });
      }, reject);
    });
  }

  public get player(): TNSPlayer {
    return this._player;
  }

  public cleanup() {
    // cleanup and dispose player
    if (this.player)
      this.player.dispose();
    if (this._sub)
      this._sub.unsubscribe();
  }

  private _trackComplete(args: any) {
    console.log('trackComplete:', this.track.id);
    if (this._completeHandler)
      this._completeHandler(this.track.id);
  }

  private _trackError(args: any) {
    let error = args.error;
    console.log('trackError:', error);
    if (this._errorHandler)
      this._errorHandler({ trackId: this.track.id, error });
  }
}