// angular
import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

// nativescript
import { ListView } from 'tns-core-modules/ui/list-view';

// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// app
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
    private store: Store<any>
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

  private _templateSelector(item: ITrack, index: number, items: ITrack[]) {
    return this.trackListViewType;
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
}
