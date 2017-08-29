// angular
import { Component, Input } from '@angular/core';

// app
import { ITrack } from '../../../shared/models';
import { LogService } from '../../../core/services';
import { PlayerService } from '../../services';

@Component({
  moduleId: module.id,
  selector: 'player-controls',
  templateUrl: 'player-controls.component.html',
})
export class PlayerControlsComponent {

  public currentTime: number = 100;
  public duration: number = 300;
  public playStatus: string = 'Play';

  constructor(
    private logService: LogService,
    private playerService: PlayerService
  ) { }

  public togglePlay() {
    let playing = !this.playerService.playing;
    this.playerService.playing = playing;
    this.playStatus = playing ? 'Stop' : 'Play';
  }

}
