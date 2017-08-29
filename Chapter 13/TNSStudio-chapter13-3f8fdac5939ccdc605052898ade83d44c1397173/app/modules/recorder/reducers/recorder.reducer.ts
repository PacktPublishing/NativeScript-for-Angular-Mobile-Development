import { RecordState, recorderInitialState } from '../states';
import { RecordActions } from '../actions';

export function recorderReducer(
  state: RecordState = recorderInitialState,
  action: RecordActions.Actions
): RecordState {
  switch (action.type) {
    case RecordActions.ActionTypes.READY_TO_RECORD:
      state = RecordState.readyToRecord;
      break;
    case RecordActions.ActionTypes.RECORDING:
      state = RecordState.recording;
      break;
    case RecordActions.ActionTypes.READY_TO_PLAY:
      state = RecordState.readyToPlay;
      break;
    case RecordActions.ActionTypes.PLAYING:
      state = RecordState.playing;
      break;
    case RecordActions.ActionTypes.SAVED:
      state = RecordState.saved;
      break;
    case RecordActions.ActionTypes.FINISH:
      state = RecordState.finish;
      break;
  }
  return state;
}

