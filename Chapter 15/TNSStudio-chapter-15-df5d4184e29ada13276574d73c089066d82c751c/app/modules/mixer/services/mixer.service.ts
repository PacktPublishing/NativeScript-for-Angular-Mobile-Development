// angular
import { Injectable } from '@angular/core';

// nativescript
import { knownFolders, path } from 'tns-core-modules/file-system';

// app
import { TrackModel, IComposition, CompositionModel } from '../../shared/models';
import { DatabaseService } from '../../core/services/database.service';
import { DialogService } from '../../core/services/dialog.service';

@Injectable()
export class MixerService {

  constructor(
    private databaseService: DatabaseService,
    private dialogService: DialogService
  ) {
  }

  public add() {
    return this.dialogService.prompt('Composition name:');
  }

  public edit(name: string) {
    return this.dialogService.prompt('Edit name:', name);
  }

  public save(compositions: Array<CompositionModel>) {
    this.databaseService.setItem(DatabaseService.KEYS.compositions, this.serialize(compositions));
  }

  public savedCompositions(): any {
    return this.databaseService.getItem(DatabaseService.KEYS.compositions);
  }

  public serialize(compositions) {
    let serialized = [];
    for (let comp of compositions) {
      let composition: any = Object.assign({}, comp);
      composition.tracks = [];
      for (let track of comp.tracks) {
        let serializedTrack = {};
        for (let key in track) {
          // ignore observable, private properties and waveform model
          // properties are restored upon hydration
          if (!key.includes('_') && !key.includes('$') && key != 'model') {
            serializedTrack[key] = track[key];
          }
        }
        composition.tracks.push(serializedTrack);
      }
      // serialized composition
      serialized.push(composition);
    }
    return serialized;
  }

  public hydrate(compositions: Array<IComposition>) {
    for (let c = 0; c < compositions.length; c++) {
      let comp = new CompositionModel(compositions[c]);
      for (let i = 0; i < comp.tracks.length; i++) {
        comp.tracks[i] = new TrackModel(comp.tracks[i]);
        // for waveform
        (<any>comp.tracks[i]).model = {
          // fix is only for demo tracks
          target: fixAppLocal(comp.tracks[i].filepath)
        };
      }
      // ensure list ref is updated to use hydrated model
      compositions[c] = comp;
    }
    return compositions;
  }

  public demoComposition(): Array<IComposition> {
    // Just a starter composition for user to demo on first launch
    return [
      {
        id: 1,
        name: 'Demo',
        created: Date.now(),
        order: 0,
        tracks: <any>[
          {
            id: 1,
            name: 'Drums',
            order: 0,
            filepath: '~/audio/drums.mp3'
          },
          {
            id: 2,
            name: 'Bass',
            order: 1,
            filepath: '~/audio/bass.mp3'
          },
          {
            id: 3,
            name: 'Piano',
            order: 2,
            filepath: '~/audio/piano.mp3'
          }
        ]
      }
    ];
  }
}

// adding model
const fixAppLocal = function (filepath: string) {
  if (filepath.indexOf('~/') === 0) {
    return path.join(knownFolders.currentApp().path, filepath.replace('~/', ''));
  }
  return filepath;
}