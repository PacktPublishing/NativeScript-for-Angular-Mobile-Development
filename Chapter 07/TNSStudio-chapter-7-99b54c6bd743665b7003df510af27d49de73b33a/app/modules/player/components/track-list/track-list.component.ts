// angular
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// app
import { ITrack } from '../../../shared/models';
import { AuthService, DialogService } from '../../../core/services';

@Component({
  moduleId: module.id,
  selector: 'track-list',
  templateUrl: 'track-list.component.html',
})
export class TrackListComponent {
  
  @Input() tracks: Array<ITrack>;

  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  public record(track: ITrack, usernameAttempt?: string) {
    if (AuthService.CURRENT_USER) {
      this.dialogService.confirm('Are you sure you want to re-record this track?').then((ok) => {
        if (ok) this._navToRecord(track);
      });
    } else {
      this.authService.promptLogin(
        'Provide an email and password to record.',
        usernameAttempt
      ).then(
        this._navToRecord.bind(this, track), 
        (usernameAttempt) => {
          // initiate sequence again
          this.record(track, usernameAttempt);
        }
      );
    }
  }

  private _navToRecord(track: ITrack) {
    this.router.navigate(['/record', track.id]);
  }
}
