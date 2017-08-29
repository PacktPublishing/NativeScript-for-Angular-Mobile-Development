// angular
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// app
import { CompositionModel, TrackModel } from '../../shared/models';
import { MixerActions } from '../actions';
import { IMixerState } from '../states';

@Component({
  moduleId: module.id,
  selector: 'mixer',
  templateUrl: 'mixer.component.html'
})
export class MixerComponent implements OnInit, OnDestroy {

  public composition: CompositionModel;

  private _sub: Subscription;

  constructor(
    private store: Store<any>,
    private vcRef: ViewContainerRef
  ) { }

  public record(track?: TrackModel) {
    this.store.dispatch(new MixerActions.OpenRecordAction({
      vcRef: this.vcRef,
      track
    }))
  }

  ngOnInit() {
    this._sub = this.store.select(s => s.mixerModule.mixer)
      .subscribe((state: IMixerState) => {
        this.composition = state.activeComposition;
      });
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
