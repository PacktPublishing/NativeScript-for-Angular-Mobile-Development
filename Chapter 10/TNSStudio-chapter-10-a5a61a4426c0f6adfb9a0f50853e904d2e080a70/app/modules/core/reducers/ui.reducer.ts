import { IUIState, uiInitialState } from '../states/ui.state';
import { UIActions } from '../actions';

export function uiReducer(
  state: IUIState = uiInitialState,
  action: UIActions.Actions
): IUIState {
  switch (action.type) {
    case UIActions.ActionTypes.UPDATED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
