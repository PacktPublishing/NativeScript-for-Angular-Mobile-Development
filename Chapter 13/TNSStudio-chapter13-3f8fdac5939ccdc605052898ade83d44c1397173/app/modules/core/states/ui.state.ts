export type ITrackListType = 'waveform' | 'default';

export interface IUIState {
  trackListViewType?: ITrackListType;
}

export const uiInitialState: IUIState = {
  trackListViewType: 'default'
};