// angular
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

// app
import { DialogService } from '../../core/services/dialog.service';
import { RecordModel, RecordState } from '../models';
import { PlayerService } from '../../player/services/player.service';
import { TrackModel } from '../../shared/models/track.model';

@Injectable()
export class RecorderService {
  public state$: Subject<number> = new Subject();
  public model: RecordModel;
  private _trackId: number;
  private _sub: Subscription;

  constructor(
    private playerService: PlayerService,
    private dialogService: DialogService
  ) { }  
  
  public setupNewRecording() {
    this.model = new RecordModel();
    this._trackId = undefined; // reset

    this.model.on(this.model.events.stateChange, this._stateHandler.bind(this));
    this._sub = this.playerService.complete$.subscribe(_ => {
      this.model.stopPlayback();
    });
  }

  public toggleRecord() {
    this.model.toggleRecord();
  }

  public togglePlay() {
    this.model.togglePlay();
  }

  public rewind() {
    this.playerService.seekTo(0); // reset to 0
  }

  public save() {
    this.model.save();
  }

  public cleanup() {
    // unbind event listener
    this.model.off(this.model.events.stateChange, this._stateHandler.bind(this));
    this._sub.unsubscribe();
    
    if (!this.model.savedFilePath) {
      // user did not save recording, cleanup
      this.playerService.removeTrack(this._trackId);
    }
  }

  private _stateHandler(e) {
    console.log('recorderservice statehandler for model!');
    this.state$.next(e.data);

    switch (e.data) {
      case RecordState.readyToRecord:
        this._stopMix();
        break;  
      case RecordState.readyToPlay:
        this._stopMix();
        this._trackId = this.playerService.updateCompositionTrack(this._trackId, this.model.audioFilePath);
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
    if (!this.playerService.playing) {
      // ensure mix plays
      this.playerService.togglePlay(excludeTrackId);
    }
  }

  private _stopMix() {
    if (this.playerService.playing) {
      // ensure mix stops
      this.playerService.togglePlay();
    }
    // always reset to beginning
    this.playerService.seekTo(0);
  }

  private _handleSaved() {
    this._sub.unsubscribe();
    this._stopMix();
    this.playerService.updateCompositionTrack(this._trackId, this.model.savedFilePath);
    this.playerService.saveComposition();
    this.model.finish();
  }
  
}