import { Action } from '@ngrx/store';
import { IPlayerState } from '../states';
import { TrackModel, TrackPlayerModel } from '../../shared/models';

export namespace PlayerActions {
  const CATEGORY: string = 'Player';

  export interface IActions {
    PLAY: string;
    PAUSE: string;
    TOGGLE_PLAY: string;
    SEEK: string;
    COMPLETED: string;
    UPDATED: string;
    NOOP: string;
  }

  export const ActionTypes: IActions = {
    PLAY: `${CATEGORY} Play`,
    PAUSE: `${CATEGORY} Pause`,
    TOGGLE_PLAY: `${CATEGORY} Toggle Play`,
    SEEK: `${CATEGORY} Seek`,
    COMPLETED: `${CATEGORY} Completed`,
    UPDATED: `${CATEGORY} Updated`,
    NOOP: `${CATEGORY} Noop`,
  };

  export class PlayAction implements Action {
    type = ActionTypes.PLAY;
    constructor(public payload?: number /* excludeTrackId */) { }
  }

  export class PauseAction implements Action {
    type = ActionTypes.PAUSE;
    constructor(public payload?: number /* seekToTime: optionally seek here when pausing */) { }
  }

  export class TogglePlayAction implements Action {
    type = ActionTypes.TOGGLE_PLAY;
    constructor(public payload?: number /* exclude trackId */) { }
  }

  export class SeekAction implements Action {
    type = ActionTypes.SEEK;
    constructor(public payload?: number /* seekTo */) { }
  }

  export class UpdatedAction implements Action {
    type = ActionTypes.UPDATED;
    constructor(public payload: IPlayerState) { }
  }

  export class NoopAction implements Action {
    type = ActionTypes.NOOP;
    payload = null;
  }

  export type Actions =
    PlayAction
    | PauseAction
    | TogglePlayAction
    | SeekAction
    | UpdatedAction;
}