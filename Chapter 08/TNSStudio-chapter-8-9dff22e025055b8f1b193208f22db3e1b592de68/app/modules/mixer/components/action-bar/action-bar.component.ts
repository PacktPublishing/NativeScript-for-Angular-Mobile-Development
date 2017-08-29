// angular
import { Component, Input, Output, EventEmitter } from '@angular/core';

// nativescript
import { RouterExtensions } from 'nativescript-angular/router'; 

import { PlayerService } from '../../../player/services/player.service';

@Component({
  moduleId: module.id,
  selector: 'action-bar',
  templateUrl: 'action-bar.component.html'
})
export class ActionBarComponent {

  @Input() title: string;
  @Output() showRecordModal: EventEmitter<any> = new EventEmitter();

  public toggleListText: string = 'Waveform';

  constructor(
    private router: RouterExtensions,
    private playerService: PlayerService
  ) { }

  public record() {
    if (this.playerService.composition && this.playerService.composition.tracks.length) {
      // display recording UI as modal
      this.showRecordModal.emit();
    } else {
      // navigate to it
      this.router.navigate(['/record']);
    }
  }

  public toggleList() {
    // later we can use icons, using labels for now
    let type = this.playerService.trackListViewType === 'default' ? 'waveform' : 'default';
    this.playerService.trackListViewType = type;
    this.toggleListText = type === 'default' ? 'Waveform' : 'Default';
  }
}
