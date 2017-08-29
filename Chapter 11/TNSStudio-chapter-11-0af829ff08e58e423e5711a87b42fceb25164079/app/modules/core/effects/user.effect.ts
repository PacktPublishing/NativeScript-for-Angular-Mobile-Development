// angular
import { Injectable } from '@angular/core';

// libs
import { Store, Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

// module
import { LogService } from '../../core/services/log.service';
import { MixerActions } from '../../mixer/actions';
import { DatabaseService } from '../services/database.service';
import { UserService } from '../services/user.service';
import { UserActions } from '../actions/user.action';

@Injectable()
export class UserEffects {

  @Effect() init$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.INIT)
    .startWith(new UserActions.InitAction())
    .map(action => {
      const current = this.databaseService
        .getItem(DatabaseService.KEYS.currentUser);
      const recentUsername = this.databaseService
        .getItem(DatabaseService.KEYS.recentUsername);
      this.log.debug(`Current user: `, current || 'Unauthenticated');
      return new UserActions.UpdatedAction({ current, recentUsername });
    });

  @Effect() login$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.LOGIN)
    .withLatestFrom(this.store)
    .switchMap(([action, state]: [UserActions.LoginAction, any]) => {
      const current = state.user.current;
      if (current) {
        // user already logged in, just fire updated
        return Observable.of(
          new UserActions.UpdatedAction({ current })
        );
      } else {
        this._loginPromptMsg = action.payload.msg;
        const usernameAttempt =
          action.payload.usernameAttempt
          || state.user.recentUsername;

        return Observable.fromPromise(
          this.userService.promptLogin(this._loginPromptMsg, usernameAttempt)
        )
          .map(user => (new UserActions.LoginSuccessAction(user)))
          .catch(usernameAttempt => Observable.of(
            new UserActions.LoginCanceledAction(usernameAttempt)
          ));
      }
    });

  @Effect() loginToRecord$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.LOGIN_TO_RECORD)
    .switchMap((action: UserActions.LoginToRecordAction) => {
      const payload = action.payload;
      return Observable.fromPromise(
        this.userService.promptLogin('Please login to record.')
      )
        .map(user => {
          return new UserActions.LoginSuccessRecordAction({ user, recordPayload: payload });
        })
        .catch(usernameAttempt => Observable.of(
          new UserActions.LoginCanceledAction(usernameAttempt)
        ));
    });

  @Effect() loginSuccessRecord$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.LOGIN_SUCCESS_RECORD)
    .map((action: UserActions.LoginSuccessRecordAction) => {
      let user = action.payload.user;
      this.saveUser(user);
      this.store.dispatch(new UserActions.UpdatedAction({
        current: user,
        recentUsername: user.username,
        loginCanceled: false
      }));
      return new MixerActions.OpenRecordAction(action.payload.recordPayload);
    });

  @Effect() loginSuccess$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.LOGIN_SUCCESS)
    .map((action: UserActions.LoginSuccessAction) => {
      let user = action.payload;
      this.saveUser(user);
      return new UserActions.UpdatedAction({
        current: user,
        recentUsername: user.username,
        loginCanceled: false
      });
    });

  @Effect() loginCancel$ = this.actions$
    .ofType(UserActions.ActionTypes.LOGIN_CANCELED)
    .map((action: UserActions.LoginCanceledAction) => {
      const usernameAttempt = action.payload;
      if (usernameAttempt) {
        // reinitiate sequence, login failed, retry
        return new UserActions.LoginAction({
          msg: this._loginPromptMsg,
          usernameAttempt
        });
      } else {
        return new UserActions.UpdatedAction({
          loginCanceled: true
        });
      }
    });

  @Effect() logout$: Observable<Action> = this.actions$
    .ofType(UserActions.ActionTypes.LOGOUT)
    .map(action => {
      this.databaseService.removeItem(DatabaseService.KEYS.currentUser);
      return new UserActions.UpdatedAction({ current: null });
    });

  private _loginPromptMsg: string;

  constructor(
    private store: Store<any>,
    private actions$: Actions,
    private log: LogService,
    private databaseService: DatabaseService,
    private userService: UserService
  ) { }

  private saveUser(user) {
    const recentUsername = user.username;
    this.databaseService
      .setItem(DatabaseService.KEYS.currentUser, user);
    this.databaseService
      .setItem(DatabaseService.KEYS.recentUsername, recentUsername);
    this._loginPromptMsg = null; // clear, no longer needed
  }
}
