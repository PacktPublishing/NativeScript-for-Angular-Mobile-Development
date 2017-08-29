// angular
import { Component, Input, Output, EventEmitter } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

// app
import { UIActions } from '../../../core/actions';
import { PlayerService } from '../../../player/services/player.service';

@Component({
  moduleId: module.id,
  selector: 'action-bar',
  templateUrl: 'action-bar.component.html'
})
export class ActionBarComponent {

  @Input() title: string;
  @Output() recordAction: EventEmitter<any> = new EventEmitter();

  public uiState$: Observable<any>;

  constructor(
    private store: Store<any>,
    private playerService: PlayerService
  ) { }

  ngOnInit() {
    this.uiState$ = this.store.select(s => s.ui);
  }

  public toggleList() {
    this.store.dispatch(new UIActions.TrackListToggleAction());
  }
}
