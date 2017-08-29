// angular
import { Injectable } from '@angular/core';

// app
import { ITrack } from '../../core/models/index';
@Injectable()
export class PlayerService {
  
  public playing: boolean;
  public tracks: Array<ITrack>;
  
  constructor() {
    this.tracks = [
      {
        name: 'Guitar',
        order: 0
      },
      {
        name: 'Vocals',
        order: 1
      }
    ];
  }

  public play(index: number): void {
    this.playing = true;
  }
  public pause(index: number): void {
    this.playing = false;
  }
  public addTrack(track: ITrack): void {
    this.tracks.push(track);
  }
  public removeTrack(track: ITrack): void {
    let index = this.getTrackIndex(track);
    if (index > -1) {
      this.tracks.splice(index, 1);
    }
  }
  public reorderTrack(track: ITrack, newIndex: number) {
    let index = this.getTrackIndex(track);
    if (index > -1) {
      this.tracks.splice(newIndex, 0, this.tracks.splice(index, 1)[0]);
    }
  }
  private getTrackIndex(track: ITrack): number {
    let index = -1;
    for (let i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].filepath === track.filepath) {
        index = i;
        break;
      }
    }
    return index;
  }
}