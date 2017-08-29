import { IWaveformModel } from '../../shared/native/waveform';
import { knownFolders } from 'file-system';

export enum RecordState {
  readyToRecord,
  recording,
  readyToPlay,
  playing,
  saved,
  finish
}

export interface IRecordEvents {
  stateChange: string;
}

export interface IRecordModel extends IWaveformModel {
  readonly events: IRecordEvents;
  readonly recorder: any;
  readonly audioFilePath: string;
  state: number; 
  savedFilePath: string;
  toggleRecord(): void;
  togglePlay(startTime?: number, when?: number): void;
  stopPlayback(): void;
  save(): void;
  finish(): void;
}

export const documentsFilePath = function(filename: string) {
  return `${knownFolders.documents().path}/${filename}`;
}