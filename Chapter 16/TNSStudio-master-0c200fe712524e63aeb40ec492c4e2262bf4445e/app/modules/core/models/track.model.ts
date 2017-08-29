export interface ITrack {
  filepath?: string;
  name?: string;
  order?: number;
}

export class TrackModel implements ITrack {
  public filepath: string;
  public name: string;
  public order: number;
  
  constructor(model?: any) {
    if (model) {
      for (let key in model) {
        this[key] = model[key];
      }
    }
  }
}