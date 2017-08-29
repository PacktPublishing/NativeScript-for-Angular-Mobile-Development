import { Injectable } from '@angular/core';
import { Route, CanActivate, CanLoad } from '@angular/router';

// libs
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

// app
import { IUserState, UserActions } from '../modules/core';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  private _sub: Subscription;
  
  constructor(private store: Store<any>) { }

  canActivate(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.store.dispatch(
        new UserActions.LoginAction({ msg: 'Authenticate to record.' })
      );
      this._sub = this.store.select(s => s.user).subscribe((state: IUserState) => {
        if (state.current) {
          this._reset();
          resolve(true);
        } else if (state.loginCanceled) {
          this._reset();
          resolve(false);
        }
      });
    });
  }

  canLoad(route: Route): Promise<boolean> {
    // reuse same logic to activate
    return this.canActivate();
  }

  private _reset() {
    if (this._sub) this._sub.unsubscribe();
  }
} 