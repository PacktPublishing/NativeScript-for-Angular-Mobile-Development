// angular
import { Component, ElementRef, ViewChild } from '@angular/core';

// nativescript
import { isIOS } from 'tns-core-modules/platform';
import { ListView } from 'tns-core-modules/ui/list-view';

// libs
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

// app
import { DialogService } from '../../core/services/dialog.service';
import { MixerActions } from '../actions';
import { IMixerState } from '../states';

@Component({
  moduleId: module.id,
  selector: 'mix-list',
  templateUrl: 'mix-list.component.html'
})
export class MixListComponent {
  public confirmDelete: Function;
  public select: Function;
  public mixer$: Observable<IMixerState>;

  @ViewChild('listview') _listviewRef: ElementRef;
  private _listview: ListView;
  private _destroy$: Subject<any> = new Subject();

  constructor(private store: Store<any>, private dialogService: DialogService) {
    this.confirmDelete = this.confirmDeleteFn.bind(this);
    this.select = this.selectFn.bind(this);
  }
  
  ngOnInit() {
    this.mixer$ = this.store.select(s => s.mixerModule.mixer);
    this.mixer$
      .takeUntil(this._destroy$)
      .subscribe(() => {
        // always refresh listview when changes occur
        this._refreshList();
      });
  }
  
  ngAfterViewInit() {
    this._listview = <ListView>this._listviewRef.nativeElement;
  }
  
  public add() {
    this.store.dispatch(new MixerActions.AddAction());
  }

  public edit(composition) {
    this.store.dispatch(new MixerActions.EditAction(composition));
  }

  public selectFn(composition) {
    if (!this.dialogService.dialogOpen) {
      this.store.dispatch(new MixerActions.SelectAction(composition));
    }
  }

  public confirmDeleteFn(composition) {
    this.dialogService.confirm(`Are you sure you want to delete '${composition.name}' and all the tracks associated with it?`, 'Delete').then((ok) => {
      if (ok) {
        this.store.dispatch(new MixerActions.DeleteAction(composition));
      }
    });
  }

  public disableRowColor(e) {
    if (isIOS) {
      let cell = e.ios;
      cell.selectionStyle = UITableViewCellSelectionStyle.None;
    }
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
}
