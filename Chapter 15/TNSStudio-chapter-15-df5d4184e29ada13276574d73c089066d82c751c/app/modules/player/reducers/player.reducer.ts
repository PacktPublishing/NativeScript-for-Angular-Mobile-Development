import { IPlayerState, playerInitialState } from '../states';
import { PlayerActions } from '../actions';

export function playerReducer(
  state: IPlayerState = playerInitialState,
  action: PlayerActions.Actions
): IPlayerState {
  switch (action.type) {
    case PlayerActions.ActionTypes.UPDATED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}

