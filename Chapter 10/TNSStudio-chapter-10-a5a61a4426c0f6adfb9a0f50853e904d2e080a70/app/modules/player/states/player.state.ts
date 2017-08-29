export interface IPlayerState {
  playing?: boolean;
  duration?: number;
  completed?: boolean;
  seeking?: boolean;
  seekPaused?: boolean;
  seekToTime?: number;
  excludeTrackId?: number; // used while recording
  recordTrackId?: number; // used while recording
}

export interface IPlayerModuleState {
  player: IPlayerState;
}

export const playerInitialState: IPlayerState = {
  playing: false
};