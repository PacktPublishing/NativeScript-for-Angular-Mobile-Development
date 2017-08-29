export interface ITrack {
  id?: number;
  filepath?: string;
  name?: string;
  order?: number;
  volume?: number;
  solo?: boolean;
}
export class TrackModel implements ITrack {
  public id: number;
  public filepath: string;
  public name: string;
  public order: number;
  public volume: number = 1; // set default to full volume
  public solo: boolean;

  constructor(model?: any) {
    if (model) {
      for (let key in model) {
        this[key] = model[key];
      }
    }
    // use assign a random id
    if (!this.id) this.id = Math.floor(Math.random() * 100000);
  }
}