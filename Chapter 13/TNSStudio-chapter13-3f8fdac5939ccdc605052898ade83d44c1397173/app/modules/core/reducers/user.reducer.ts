import { IUserState, userInitialState } from '../states/user.state';
import { UserActions } from '../actions/user.action';

export function userReducer(
  state: IUserState = userInitialState,
  action: UserActions.Actions
): IUserState {
  switch (action.type) {
    case UserActions.ActionTypes.LOGIN:
      return Object.assign({}, state, { loginCanceled: false });
    case UserActions.ActionTypes.UPDATED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
