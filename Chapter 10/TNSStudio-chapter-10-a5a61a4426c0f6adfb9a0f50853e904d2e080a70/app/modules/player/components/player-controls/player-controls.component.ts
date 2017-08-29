// angular
import { Component, Input } from '@angular/core';

// libs
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// app
import { PlayerActions } from '../../actions';

@Component({
  moduleId: module.id,
  selector: 'player-controls',
  templateUrl: 'player-controls.component.html',
  styles: [`
    .controls {
      padding:0 0 15 0;
      background-color:#101B2E;
    }
  `]
})
export class PlayerControlsComponent {
  
  public playerState$: Observable<any>;

  constructor(
    private store: Store<any>
  ) { }

  public togglePlay() {
    this.store.dispatch(new PlayerActions.TogglePlayAction());
  }

  ngOnInit() {
    this.playerState$ = this.store.select('playerModule');
  }
}
