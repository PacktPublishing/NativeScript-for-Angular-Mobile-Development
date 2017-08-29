import { IComposition, TrackModel } from '../../shared/models';

export interface IMixerState {
  compositions?: Array<IComposition>;
  activeComposition?: any;
  recordingTrack?: TrackModel; // used while recording
}

export interface IMixerModuleState {
  mixer: IMixerState;
}

export const mixerInitialState: IMixerState = {
  compositions: []
};