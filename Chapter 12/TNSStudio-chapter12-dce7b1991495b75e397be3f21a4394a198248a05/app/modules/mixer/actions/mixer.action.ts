import { ViewContainerRef } from '@angular/core';
import { Action } from '@ngrx/store';
import { IMixerState } from '../states';
import { IComposition, CompositionModel, TrackModel, ITrack } from '../../shared/models';

export namespace MixerActions {
  const CATEGORY: string = 'Mixer';

  export interface IMixerActions {
    INIT: string;
    ADD: string;
    ADD_TRACK: string;
    REMOVE_TRACK: string;
    UPDATE_TRACK: string;
    RECORD_TRACK: string;
    EDIT: string;
    SAVE: string;
    CANCEL: string;
    SELECT: string;
    OPEN_RECORD: string;
    SAVE_RECORD: string;
    UPDATE: string;
    UPDATED: string;
    NOOP: string;
  }

  export const ActionTypes: IMixerActions = {
    INIT: `${CATEGORY} Init`,
    ADD: `${CATEGORY} Add`,
    ADD_TRACK: `${CATEGORY} Add Track`,
    REMOVE_TRACK: `${CATEGORY} Remove Track`,
    UPDATE_TRACK: `${CATEGORY} Update Track`,
    RECORD_TRACK: `${CATEGORY} Record Track`,
    EDIT: `${CATEGORY} Edit`,
    SAVE: `${CATEGORY} Save`,
    CANCEL: `${CATEGORY} Cancel`,
    SELECT: `${CATEGORY} Select`,
    OPEN_RECORD: `${CATEGORY} Open Record`,
    SAVE_RECORD: `${CATEGORY} Save Record`,
    UPDATE: `${CATEGORY} Update`,
    UPDATED: `${CATEGORY} Updated`,
    NOOP: `${CATEGORY} Noop`,
  };

  export class InitAction implements Action {
    type = ActionTypes.INIT;
    payload = null;
  }

  export class AddAction implements Action {
    type = ActionTypes.ADD;
    payload = null;
  }

  export class AddTrackAction implements Action {
    type = ActionTypes.ADD_TRACK;
    constructor(public payload: TrackModel) { }
  }

  export class RemoveTrackAction implements Action {
    type = ActionTypes.REMOVE_TRACK;
    constructor(public payload: { trackId: number, persist?: boolean }) { }
  }

  export class UpdateTrackAction implements Action {
    type = ActionTypes.UPDATE_TRACK;
    constructor(public payload: { id: number /*track id*/, updatedProperties?: ITrack /* properties to update */}) { }
  }

  export class RecordTrackAction implements Action {
    type = ActionTypes.RECORD_TRACK;
    constructor(public payload: { id: number /*track id*/, filePath: string }) { }
  }

  export class EditAction implements Action {
    type = ActionTypes.EDIT;
    constructor(public payload: CompositionModel) { }
  }

  export class SaveAction implements Action {
    type = ActionTypes.SAVE;
    constructor(public payload?: Array<CompositionModel>) { }
  }

  export class CancelAction implements Action {
    type = ActionTypes.CANCEL;
    payload = null;
  }

  export class SelectAction implements Action {
    type = ActionTypes.SELECT;
    constructor(public payload: CompositionModel) { }
  }

  export class OpenRecordAction implements Action {
    type = ActionTypes.OPEN_RECORD;
    constructor(public payload?: { vcRef: ViewContainerRef, track?: TrackModel }) { }
  }

  export class SaveRecordAction implements Action {
    type = ActionTypes.SAVE_RECORD;
    constructor(public payload?: { id: number /*track id*/, filePath: string }) { }
  }

  export class UpdateAction implements Action {
    type = ActionTypes.UPDATE;
    constructor(public payload: CompositionModel) { }
  }

  export class UpdatedAction implements Action {
    type = ActionTypes.UPDATED;
    constructor(public payload: IMixerState) { }
  }

  export class NoopAction implements Action {
    type = ActionTypes.NOOP;
    payload = null;
  }

  export type Actions =
    InitAction
    | AddAction
    | AddTrackAction
    | RemoveTrackAction
    | UpdateTrackAction
    | RecordTrackAction
    | EditAction
    | SaveAction
    | CancelAction
    | SelectAction
    | OpenRecordAction
    | SaveRecordAction
    | UpdateAction
    | UpdatedAction
    | NoopAction;
}