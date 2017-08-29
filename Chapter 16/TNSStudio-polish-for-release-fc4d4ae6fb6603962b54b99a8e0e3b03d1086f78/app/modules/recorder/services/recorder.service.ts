// angular
import { Injectable } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// app
import { deleteFile } from '../../../helpers';
import { DialogService } from '../../core/services/dialog.service';
import { LogService } from '../../core/services/log.service';
import { RecordModel } from '../models';
import { PlayerActions } from '../../player/actions';
// import { PlayerService } from '../../player/services/player.service';
import { IPlayerModuleState } from '../../player/states';

import { TrackModel } from '../../shared/models/track.model';
import { MixerActions } from '../../mixer/actions';
import { IMixerModuleState } from '../../mixer/states';
import { RecordState } from '../states';

@Injectable()
export class RecorderService {
  public model: RecordModel;
  private _trackId: number;
  private _originalFilepath: string;
  private _subs: Array<Subscription> = [];

  constructor(
    private store: Store<any>,
    private log: LogService,
    // private playerService: PlayerService,
    private dialogService: DialogService
  ) { }  
  
  public setupNewRecording(track?: TrackModel) {
    this.model = new RecordModel(this.store);
    if (track) {
      // re-recording a track
      this._trackId = track.id; 
      // ensures that original filepath is restored when canceling
      // as well as removed if re-recording
      this._originalFilepath = track.filepath;
    } else {
      // reset
      this._trackId = null;
      this._originalFilepath = null;
    }

    // this.model.on(this.model.events.stateChange, this._stateHandler.bind(this));
    this._subs.push(this.store.select(s => s.recorderModule.recorder).subscribe(this._stateHandler.bind(this)));

    this._subs.push(this.store.select('mixerModule').subscribe((state: IMixerModuleState) => {
      if (state.mixer.recordingTrack) {
        // establishes new track id (for new recordings)
        this._trackId = state.mixer.recordingTrack.id;
      } 
    }));
    this._subs.push(this.store.select('playerModule').subscribe((state: IPlayerModuleState) => {
      if (this.model && state.player.completed) {
        console.log('Playback completed! RecorderService: calling model.stopPlayback()');
        this.model.stopPlayback();
      }
    }));
  }

  public toggleRecord() {
    this.model.toggleRecord();
  }

  public togglePlay() {
    this.model.togglePlay();
  }

  public rewind() {
    this.store.dispatch(new PlayerActions.SeekAction(0)); // reset to 0
    // this.playerService.seekTo(0); // reset to 0
  }

  public save() {
    this.model.save();
  }

  public cleanup() {
    // unbind event listener
    // this.model.off(this.model.events.stateChange, this._stateHandler.bind(this));
    for (let sub of this._subs) {
      sub.unsubscribe();
    }
    this._subs = [];
    
    if (!this.model.savedFilePath) {
      // cleanup: user did not save recording

      if (this._originalFilepath) {
        // canceled a re-recording, restore original
        this.store.dispatch(new MixerActions.UpdateTrackAction({
          id: this._trackId,
          updatedProperties: {
            filepath: this._originalFilepath
          }
        }));
      } else {
        // just cleanup
        this.store.dispatch(new MixerActions.RemoveTrackAction({ trackId: this._trackId }));
      }
    }
  }

  private _stateHandler(state: RecordState) {
    console.log('recorderservice statehandler for model!');
    // this.state$.next(e.data);

    switch (state) {
      case RecordState.readyToRecord:
        this._stopMix();
        break;  
      case RecordState.readyToPlay:
        this._stopMix();
        this.store.dispatch(new MixerActions.RecordTrackAction({
          id: this._trackId,
          filePath: this.model.audioFilePath
        }));
        // this._trackId = this.playerService.updateCompositionTrack(this._trackId, this.model.audioFilePath);
        break;
      case RecordState.playing:
        this._playMix();
        break;
      case RecordState.recording:
        this._playMix(this._trackId);
        break;
      case RecordState.saved:
        this._handleSaved();
        break;
    }
  }

  private _playMix(excludeTrackId?: number) {
    this.store.dispatch(new PlayerActions.PlayAction(excludeTrackId));
    // if (!this.playerService.playing) {
    //   // ensure mix plays
    //   this.playerService.togglePlay(excludeTrackId);
    // }
  }

  private _stopMix() {
    this.store.dispatch(new PlayerActions.PauseAction(0));
    // if (this.playerService.playing) {
    //   // ensure mix stops
    //   this.playerService.togglePlay();
    // }
    // always reset to beginning
    // this.playerService.seekTo(0);
  }

  private _handleSaved() {
    this._stopMix();
    this.store.dispatch(new MixerActions.SaveRecordAction({
      id: this._trackId,
      filePath: this.model.savedFilePath
    }));
    // this.playerService.updateCompositionTrack(this._trackId, this.model.savedFilePath, true);
    if (this._originalFilepath) {
      // re-recorded existing track - remove old recording file
      deleteFile(this._originalFilepath);
    }
    this.model.finish();
  }
  
}