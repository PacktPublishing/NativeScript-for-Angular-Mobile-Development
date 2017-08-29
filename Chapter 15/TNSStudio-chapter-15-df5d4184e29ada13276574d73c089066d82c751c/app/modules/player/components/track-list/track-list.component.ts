// angular
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

// nativescript
import { ListView } from 'tns-core-modules/ui/list-view';
import { isIOS } from 'tns-core-modules/platform';

// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// app
import { DialogService } from '../../../core/services/dialog.service';
import { MixerActions } from '../../../mixer/actions';
import { IMixerState } from '../../../mixer/states';
import { ITrack } from '../../../shared/models';
import { IUIState } from '../../../core/states';

@Component({
  moduleId: module.id,
  selector: 'track-list',
  templateUrl: 'track-list.component.html',
})
export class TrackListComponent {
  
  public templateSelector: Function;
  @Input() tracks: Array<ITrack>;
  @Output() recordAction: EventEmitter<any> = new EventEmitter();
  @ViewChild('listview') _listviewRef: ElementRef;
  private _listview: ListView;
  private _trackListViewType: string;
  private _sub: Subscription;
  
  constructor(
    private store: Store<any>,
    private dialogService: DialogService,
  ) { 
    this.templateSelector = this._templateSelector.bind(this);
  }

  ngOnInit() {
    console.log('TrackListComponent:', this.tracks);
    // tmp Chapter 8 awkwardness
    this._sub = this.store.select('ui').subscribe((state: IUIState) => {
      if (this._trackListViewType !== state.trackListViewType) {
        console.log('trackListViewChange!');
        this.trackListViewType = state.trackListViewType;
        if (this._listview) {
          // refresh list
          this._listview.refresh();
        }
      }
    });
  }

  ngAfterViewInit() {
    this._listview = <ListView>this._listviewRef.nativeElement;
  }


  public editName(track: ITrack) {
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

  ngOnDestroy() {
    if (this._sub) this._sub.unsubscribe();
  }

  private _templateSelector(item: ITrack, index: number, items: ITrack[]) {
    return this.trackListViewType;
  }
}
