// angular
import { Component, OnInit, OnDestroy, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// app
import { DialogService } from '../../core/services/dialog.service';
import { MixerService } from '../services/mixer.service';
import { CompositionModel } from '../../shared/models';
import { RecordComponent } from '../../recorder/components/record.component';

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
    private mixerService: MixerService,
    private dialogService: DialogService,
    private vcRef: ViewContainerRef
  ) { }

  public showRecordModal() {
    this.dialogService.openModal(
      RecordComponent,
      this.vcRef,
      { isModal: true },
      './modules/recorder/recorder.module#RecorderModule'
    );
  }

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
