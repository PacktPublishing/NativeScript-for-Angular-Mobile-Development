// angular
import { Injectable, NgModuleFactory, NgModuleFactoryLoader, ViewContainerRef, NgModuleRef } from '@angular/core';

// nativescript
import * as dialogs from 'tns-core-modules/ui/dialogs';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';

@Injectable()
export class DialogService {

  private _dialogOpen = false;

  constructor(
    private moduleLoader: NgModuleFactoryLoader,
    private modalService: ModalDialogService
  ) { }

  public get dialogOpen() {
    return this._dialogOpen;
  }

  public alert(msg: string): Promise<any> {
    if (this._dialogOpen) {
      return new Promise((resolve, reject) => 1);
    } else {
      return new Promise((resolve, reject) => {
        const options: dialogs.AlertOptions = {
          message: msg,
          okButtonText: 'Ok'
        };
        this._dialogOpen = true;
        dialogs.alert(options).then((result: any) => {
          this._reset();
          resolve(result); 
        }, () => {
          this._reset();
          reject();
        });

      })
    }
  }

  public confirm(msg: string, okButtonText: string = 'Yes'): Promise<any> {
    if (this._dialogOpen) {
      return new Promise((resolve, reject) => 1);
    } else {
      return new Promise((resolve, reject) => {
        let options: dialogs.ConfirmOptions = {
          title: 'Are you sure?',
          message: msg,
          okButtonText,
          cancelButtonText: 'Cancel'
        };
        this._dialogOpen = true;
        dialogs.confirm(options).then((result: any) => {
          this._reset();
          resolve(result);
        }, () => {
          this._reset();
          reject();
        });
      });
    }
  }

  public prompt(title: string | any, defaultText?: string): Promise<any> {
    if (this._dialogOpen) {
      return new Promise((resolve, reject) => 1);
    } else {
      return new Promise((resolve, reject) => {
        let options: any = typeof title !== 'string' ? title : {
          title,
          defaultText,
          okButtonText: 'Save',
          cancelButtonText: 'Cancel'
        };
        this._dialogOpen = true;
        dialogs.prompt(options).then((result: any) => {
          this._reset();
          resolve(result);
        }, () => {
          this._reset();
          reject();
        });
      });
    }
  }

  public login(msg: string, userName?: string, password?: string): Promise<any> {
    if (this._dialogOpen) {
      return new Promise((resolve, reject) => 1);
    } else {
      return new Promise((resolve, reject) => {
        this._dialogOpen = true;
        dialogs.login(msg, userName, password).then((result: any) => {
          this._reset();
          resolve(result);
        }, () => {
          this._reset();
          reject();
        });
      });
    }
  }

  public action(msg: string, cancelButtonText?: string, actions?: string[]): Promise<any> {
    if (this._dialogOpen) {
      return new Promise((resolve, reject) => 1);
    } else {
      return new Promise((resolve, reject) => {
        this._dialogOpen = true;
        dialogs.action(msg, cancelButtonText, actions).then((result: any) => {
          this._reset();
          resolve(result);
        }, () => {
          this._reset();
          reject();
        });
      });
    }
  }

  private _reset() {
    this._dialogOpen = false;
  }

  public openModal(componentType: any, vcRef: ViewContainerRef, context?: any, modulePath?: string): Promise<any> {
    return new Promise((resolve, reject) => {

      const launchModal = (moduleRef?: NgModuleRef<any>) => {
        this.modalService.showModal(componentType, {
          moduleRef,
          viewContainerRef: vcRef,
          context
        }).then(resolve, reject);
      };

      if (modulePath) {
        // lazy load module which contains component to open in modal
        this.moduleLoader.load(modulePath)
          .then((module: NgModuleFactory<any>) => {
            launchModal(module.create(vcRef.parentInjector));
          });
      } else {
        // open component in modal known to be available without lazy loading
        launchModal();
      }
    });
  }
}
