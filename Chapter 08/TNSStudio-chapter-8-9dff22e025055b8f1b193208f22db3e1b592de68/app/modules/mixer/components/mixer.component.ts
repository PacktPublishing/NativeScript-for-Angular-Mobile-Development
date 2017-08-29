// angular
import { Component, OnInit, OnDestroy, ViewContainerRef, NgModuleFactory, NgModuleFactoryLoader } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

// nativescript
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';

// app
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
    private modalService: ModalDialogService,
    private vcRef: ViewContainerRef,
    private moduleLoader: NgModuleFactoryLoader
  ) { }

  public showRecordModal() {
    this.moduleLoader.load('./modules/recorder/recorder.module#RecorderModule').then((module: NgModuleFactory<any>) => {
      console.log('lazily loaded RecorderModule on-demand!');
      const moduleRef = module.create(this.vcRef.parentInjector);

      this.modalService.showModal(RecordComponent, {
          moduleRef,
          viewContainerRef: this.vcRef,
          context: { isModal: true }
      });
    });
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
