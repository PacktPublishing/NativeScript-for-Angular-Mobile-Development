// angular
import { Injectable } from '@angular/core';

// app
import { DialogService } from './dialog.service';

@Injectable()
export class UserService {
  
  constructor(private dialogService: DialogService) {}  

  public promptLogin(msg: string, username: string = ''): Promise<any> {
    return new Promise((resolve, reject) => {
      this.dialogService.login(msg, username, '').then((input) => {
        if (input.result) { // result will be false when canceled
          if (input.userName && input.userName.indexOf('@') > -1) {
            if (input.password) {
              resolve({
                username: input.userName,
                password: input.password
              });
            } else {
              this.dialogService.alert('You must provide a password.')
                .then(reject.bind(this, input.userName));
            }
          } else {
            // reject, passing userName back to try again
            this.dialogService.alert('You must provide a valid email address.')
              .then(reject.bind(this, input.userName));
          }
        } else {
          // user chose cancel
          reject(false);
        }
      });
    });
  }
}