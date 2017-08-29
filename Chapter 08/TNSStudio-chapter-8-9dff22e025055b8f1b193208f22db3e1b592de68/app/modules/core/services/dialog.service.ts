// angular
import { Injectable } from '@angular/core';

// nativescript
import * as dialogs from 'ui/dialogs';

@Injectable()
export class DialogService {
  
  public alert(msg: string) {
    return dialogs.alert(msg);
  }

  public confirm(msg: string) {
    return dialogs.confirm(msg);
  }

  public prompt(title: string | any, defaultText?: string) {
    let options: any = typeof title !== 'string' ? title : {
      title,
      defaultText,
      okButtonText: 'Save',
      cancelButtonText: 'Cancel'
    };
    return dialogs.prompt(options);
  }

  public login(msg: string, userName?: string, password?: string) {
    return dialogs.login(msg, userName, password);
  }

  public action(msg: string, cancelButtonText?: string, actions?: string[]) {
    return dialogs.action(msg, cancelButtonText, actions);
  }
}
