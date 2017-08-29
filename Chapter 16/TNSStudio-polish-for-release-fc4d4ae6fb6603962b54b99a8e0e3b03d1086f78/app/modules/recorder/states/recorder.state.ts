export enum RecordState {
  readyToRecord,
  recording,
  readyToPlay,
  playing,
  saved,
  finish
}

export interface IRecorderModuleState {
  recorder: RecordState;
}

export const recorderInitialState: RecordState = RecordState.readyToRecord;