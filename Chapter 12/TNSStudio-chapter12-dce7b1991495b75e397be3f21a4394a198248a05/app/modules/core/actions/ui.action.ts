import { Action } from '@ngrx/store';
import { IUIState, ITrackListType } from '../states';

export namespace UIActions {
  const CATEGORY: string = 'UI';

  export interface IUIActions {
    TRACKLIST_TOGGLE: string;
    UPDATED: string;
  }

  export const ActionTypes: IUIActions = {
    TRACKLIST_TOGGLE: `${CATEGORY} Track list toggle`,
    UPDATED: `${CATEGORY} Updated`,
  };

  export class TrackListToggleAction implements Action {
    type = ActionTypes.TRACKLIST_TOGGLE;
    constructor(public payload?: ITrackListType/* force */) { }
  }

  export class UpdatedAction implements Action {
    type = ActionTypes.UPDATED;
    constructor(public payload: IUIState) { }
  }

  export type Actions =
    TrackListToggleAction
    | UpdatedAction;
}