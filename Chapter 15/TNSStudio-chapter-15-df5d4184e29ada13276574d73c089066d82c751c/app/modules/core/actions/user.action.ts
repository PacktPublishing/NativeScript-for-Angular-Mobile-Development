import { Action } from '@ngrx/store';
import { IUserState } from '../states';

export namespace UserActions {
  const CATEGORY: string = 'User';

  export interface IUserActions {
    INIT: string;
    LOGIN: string;
    LOGIN_SUCCESS: string;
    LOGIN_CANCELED: string;
    LOGIN_TO_RECORD: string;
    LOGIN_SUCCESS_RECORD: string;
    LOGOUT: string;
    UPDATED: string;
  }

  export const ActionTypes: IUserActions = {
    INIT:                 `${CATEGORY} Init`,
    LOGIN:                `${CATEGORY} Login`,
    LOGIN_SUCCESS:        `${CATEGORY} Login Success`,
    LOGIN_CANCELED:       `${CATEGORY} Login Canceled`,
    LOGIN_TO_RECORD:      `${CATEGORY} Login to Record`,
    LOGIN_SUCCESS_RECORD: `${CATEGORY} Login Success Record`,
    LOGOUT:               `${CATEGORY} Logout`,
    UPDATED:               `${CATEGORY} Updated`,
  };

  export class InitAction implements Action {
    type = ActionTypes.INIT;
    payload = null;
  }

  export class LoginAction implements Action {
    type = ActionTypes.LOGIN;
    constructor(public payload: { msg: string; usernameAttempt?: string}) { }
  }

  export class LoginSuccessAction implements Action {
    type = ActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any /*user object*/) { }
  }

  export class LoginCanceledAction implements Action {
    type = ActionTypes.LOGIN_CANCELED;
    constructor(public payload?: string /*last attempted username*/) { }
  }

  export class LoginToRecordAction implements Action {
    type = ActionTypes.LOGIN_TO_RECORD;
    constructor(public payload?: any) { }
  }

  export class LoginSuccessRecordAction implements Action {
    type = ActionTypes.LOGIN_SUCCESS_RECORD;
    constructor(public payload: { user: any, recordPayload: any }) { }
  }

  export class LogoutAction implements Action {
    type = ActionTypes.LOGOUT;
    payload = null;
  }

  export class UpdatedAction implements Action {
    type = ActionTypes.UPDATED;
    constructor(public payload: IUserState) { }
  }

  export type Actions =
    InitAction
    | LoginAction
    | LoginSuccessAction
    | LoginCanceledAction
    | LoginToRecordAction
    | LogoutAction
    | UpdatedAction;
}