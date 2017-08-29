// angular
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

// nativescript
import { ListView } from 'tns-core-modules/ui/list-view';
import { isIOS } from 'tns-core-modules/platform';

// libs
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';

// app
import { DialogService } from '../../../core/services/dialog.service';
import { MixerActions } from '../../../mixer/actions';
import { IMixerState } from '../../../mixer/states';
import { IPlayerState } from '../../../player/states';
import { ITrack } from '../../../shared/models';
import { IUIState } from '../../../core/states';

@Component({
  moduleId: module.id,
  selector: 'track-list',
  templateUrl: 'track-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackListComponent {

  public templateSelector: Function;
  public confirmDelete: Function;
  public editName: Function;
  public longestDuration: number;
  @Input() tracks: Array<ITrack>;
  @Output() recordAction: EventEmitter<any> = new EventEmitter();
  @ViewChild('listview') _listviewRef: ElementRef;
  private _listview: ListView;
  private _trackListViewType: string;
  private _destroy$: Subject<any> = new Subject();

  constructor(
    private store: Store<any>,
    private dialogService: DialogService,
  ) {
    this.templateSelector = this._templateSelector.bind(this);
    this.confirmDelete = this.confirmDeleteFn.bind(this);
    this.editName = this.editNameFn.bind(this);
  }

  ngOnInit() {
    console.log('TrackListComponent:', this.tracks);

    this.store.select('ui')
      .takeUntil(this._destroy$)
      .subscribe((state: IUIState) => {
        if (this._trackListViewType !== state.trackListViewType) {
          console.log('trackListViewChange!');
          this.trackListViewType = state.trackListViewType;
          this._refreshList();
        }
      });

    this.store.select(s => s.mixerModule.mixer)
      .takeUntil(this._destroy$)
      .subscribe(() => {
        // always refresh listview when changes occur to mixer
        this._refreshList();
      });
    
    this.store.select(s => s.playerModule.player)
      .map((state: IPlayerState) => state.duration)
      .distinctUntilChanged()
      .subscribe((duration: number) => {
        this.longestDuration = duration;
      });
  }

  ngAfterViewInit() {
    this._listview = <ListView>this._listviewRef.nativeElement;
  }


  public editNameFn(track: ITrack) {
    this.dialogService.prompt('Edit name:', track.name).then((value) => {
      if (value.result) {
        this.store.dispatch(new MixerActions.UpdateTrackAction({
          id: track.id,
          updatedProperties: {
            name: value.text
          }
        }));
      }
    });
  }

  public disableRowColor(e) {
    if (isIOS) {
      let cell = e.ios;
      cell.selectionStyle = UITableViewCellSelectionStyle.None;
    }
  }

  public get trackListViewType() {
    return this._trackListViewType;
  }

  public set trackListViewType(value: string) {
    this._trackListViewType = value;
  }

  public record(track: ITrack) {
    this.recordAction.next(track);
  }

  public confirmDeleteFn(track: ITrack) {
    this.dialogService.confirm(`Are you sure you want to delete '${track.name}'?`, 'Delete').then((ok) => {
      if (ok) {
        this.store.dispatch(new MixerActions.RemoveTrackAction({ trackId: track.id, persist: true }));
      }
    });
  }

  ngOnDestroy() {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _refreshList() {
    if (this._listview) {
      // refresh list
      this._listview.refresh();
    }
  }

  private _templateSelector(item: ITrack, index: number, items: ITrack[]) {
    return this.trackListViewType;
  }
}
