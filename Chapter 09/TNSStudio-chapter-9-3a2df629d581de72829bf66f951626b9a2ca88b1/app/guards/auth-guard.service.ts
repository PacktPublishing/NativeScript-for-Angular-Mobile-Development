import { Injectable } from '@angular/core';
import { Route, CanActivate, CanLoad } from '@angular/router';
import { AuthService } from '../modules/core/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this._isAuth()) {
        resolve(true);
      } else {
        // login sequence to continue prompting unless canceled
        let promptSequence = (usernameAttempt?: string) => {
          this.authService.promptLogin(
            'Authenticate to record.',
            usernameAttempt
          ).then(() => {
            resolve(true); 
          }, (usernameAttempt) => {
            if (usernameAttempt === false) {
              // user canceled prompt
              resolve(false);
            } else {
              // initiate sequence again
              promptSequence(usernameAttempt);
            }
          });
        };
        // start login prompt sequence
        // require auth before activating
        promptSequence();
      }
    });
  }

  canLoad(route: Route): Promise<boolean> {
    // reuse same logic to activate
    return this.canActivate();
  }

  private _isAuth(): boolean {
    // just get the latest value from our BehaviorSubject
    return this.authService.authenticated$.getValue();
  }
} 