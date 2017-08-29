import { IMixerState, mixerInitialState } from '../states';
import { MixerActions } from '../actions';

export function mixerReducer(
  state: IMixerState = mixerInitialState,
  action: MixerActions.Actions
): IMixerState {
  switch (action.type) {
    case MixerActions.ActionTypes.UPDATED:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
}
