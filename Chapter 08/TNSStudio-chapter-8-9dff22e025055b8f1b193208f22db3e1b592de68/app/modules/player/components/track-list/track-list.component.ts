// angular
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

// nativescript
import { ListView } from 'ui/list-view';

// app
import { ITrack } from '../../../shared/models';
import { AuthService, DialogService } from '../../../core/services';
import { PlayerService } from '../../services/player.service';

@Component({
  moduleId: module.id,
  selector: 'track-list',
  templateUrl: 'track-list.component.html',
})
export class TrackListComponent {
  
  public templateSelector: Function;
  @Input() tracks: Array<ITrack>;
  @ViewChild('listview') _listviewRef: ElementRef;
  private _listview: ListView;
  private _sub: any;
  
  constructor(
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router,
    private playerService: PlayerService
  ) { 
    this.templateSelector = this._templateSelector.bind(this);
  }

  ngOnInit() {
    console.log('TrackListComponent:', this.tracks);
    // tmp Chapter 8 awkwardness
    this._sub = this.playerService.trackListViewChange$.subscribe(() => {
      console.log('trackListViewChange!');
      // refresh list
      this._listview.refresh();
    });
  }

  ngAfterViewInit() {
    this._listview = <ListView>this._listviewRef.nativeElement;
  }

  private _templateSelector(item: ITrack, index: number, items: ITrack[]) {
    return this.playerService.trackListViewType;
  }

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
