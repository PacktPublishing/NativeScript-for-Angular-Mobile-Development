// nativescript
import { isIOS } from 'platform';

// libs
import { TNSPlayer } from 'nativescript-audio';

// app
import { ITrack } from './track.model';

interface ITrackPlayer {
  trackId: number;
  duration: number;
  readonly player: TNSPlayer;
}

export interface IPlayerError {
  trackId: number;
  error: any;
}

export class TrackPlayerModel implements ITrackPlayer {
  public trackId: number;
  public duration: number;

  private _player: TNSPlayer;
  private _completeHandler: Function;
  private _errorHandler: Function;

  constructor() {
    this._player = new TNSPlayer();
  }

  public load(track: ITrack, complete: Function, error: Function): Promise<number> {
    return new Promise((resolve, reject) => {
      this.trackId = track.id;
      this._completeHandler = complete;
      this._errorHandler = error;

      this._player.initFromFile({
        audioFile: track.filepath,
        loop: false,
        completeCallback: this._trackComplete.bind(this),
        errorCallback: this._trackError.bind(this)
      }).then(() => {

        console.log('init track player for:', track.name);
        this._player.getAudioTrackDuration().then((duration) => {
          console.log(`duration:`, duration);
          this.duration = +duration;
          resolve();
        });
      });
    });
  }

  public get player(): TNSPlayer {
    return this._player;
  }

  public cleanup() {
    // cleanup and dispose player
    if (this.player)
      this.player.dispose();
  }

  private _trackComplete(args: any) {
    // TODO: works well for multi-tracks with same length
    // may need to change in future with varied lengths
    this.player.seekTo(0);
    console.log('trackComplete:', this.trackId);
    if (this._completeHandler)
      this._completeHandler(this.trackId);  
  }

  private _trackError(args: any) {
    let error = args.error;
    console.log('trackError:', error);
    if (this._errorHandler)
      this._errorHandler({ trackId: this.trackId, error });  
  }
}