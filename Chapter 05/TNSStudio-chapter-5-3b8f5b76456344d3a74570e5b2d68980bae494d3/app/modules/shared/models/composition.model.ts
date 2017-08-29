import { ITrack } from './track.model';

export interface IComposition {
  id: number;
  name: string;
  created: number;
  tracks: Array<ITrack>;
  order: number;
}
export class CompositionModel implements IComposition {
  public id: number;
  public name: string;
  public created: number;
  public tracks: Array<ITrack> = [];
  public order: number;

  constructor(model?: any) {
    if (model) {
      for (let key in model) {
        this[key] = model[key];
      }
    }
    if (!this.created) this.created = Date.now();
    // if not assigned, just assign a random id
    if (!this.id)
      this.id = Math.floor(Math.random() * 100000);
  }
}