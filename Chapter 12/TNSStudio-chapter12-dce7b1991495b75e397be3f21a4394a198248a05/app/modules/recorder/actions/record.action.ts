import { Action } from '@ngrx/store';
import { RecordState } from '../states';

export namespace RecordActions {
  const CATEGORY: string = 'Recorder';

  export interface IActions {
    READY_TO_RECORD: string;
    RECORDING: string;
    READY_TO_PLAY: string;
    PLAYING: string;
    SAVED: string;
    FINISH: string;
  }

  export const ActionTypes: IActions = {
    READY_TO_RECORD: `${CATEGORY} Ready to Record`,
    RECORDING: `${CATEGORY} Recording`,
    READY_TO_PLAY: `${CATEGORY} Ready to Play`,
    PLAYING: `${CATEGORY} Playing`,
    SAVED: `${CATEGORY} Saved`,
    FINISH: `${CATEGORY} Finish`,
  };

  export class ReadyToRecordAction implements Action {
    type = ActionTypes.READY_TO_RECORD;
    payload = null
  }

  export class RecordingAction implements Action {
    type = ActionTypes.RECORDING;
    payload = null
  }

  export class ReadyToPlayAction implements Action {
    type = ActionTypes.READY_TO_PLAY;
    payload = null
  }

  export class PlayingAction implements Action {
    type = ActionTypes.PLAYING;
    payload = null
  }

  export class SavedAction implements Action {
    type = ActionTypes.SAVED;
    payload = null
  }

  export class FinishAction implements Action {
    type = ActionTypes.FINISH;
    payload = null
  }

  export const getStateAction = function (state) {
    switch (state) {
      case RecordState.readyToRecord:
        return new ReadyToRecordAction();
      case RecordState.recording:
        return new RecordingAction();
      case RecordState.readyToPlay:
        return new ReadyToPlayAction();
      case RecordState.playing:
        return new PlayingAction();
      case RecordState.saved:
        return new SavedAction();
      case RecordState.finish:
        return new FinishAction();   
    }
  }

  export type Actions =
    ReadyToRecordAction
    | RecordingAction
    | ReadyToPlayAction
    | PlayingAction
    | SavedAction
    | FinishAction;
}