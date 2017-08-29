// angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// app
import { MixerService } from '../services/mixer.service';
import { CompositionModel } from '../../shared/models';

@Component({
  moduleId: module.id,
  selector: 'mixer',
  templateUrl: 'mixer.component.html'
})
export class MixerComponent implements OnInit, OnDestroy {

  public composition: CompositionModel;  
  private _sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private mixerService: MixerService
  ) { }  

  ngOnInit() {
    this._sub = this.route.params.subscribe(params => {
      for (let comp of this.mixerService.list) {
        if (comp.id === +params['id']) {
          this.composition = comp;
          break;
        }
      }
    });
  }  

  ngOnDestroy() {
    this._sub.unsubscribe();
  }
}
