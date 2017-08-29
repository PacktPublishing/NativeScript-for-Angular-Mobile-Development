// angular
import { Injectable } from '@angular/core';

// nativescript
import { knownFolders, path } from 'file-system';

// app
import { TrackModel, IComposition, CompositionModel } from '../../shared/models';
import { DatabaseService } from '../../core/services/database.service';
import { DialogService } from '../../core/services/dialog.service';

@Injectable()
export class MixerService {

  public list: Array<IComposition>;

  constructor(
    private databaseService: DatabaseService,
    private dialogService: DialogService
  ) {
    // restore with saved compositions or demo list
    this.list = this._hydrateList(this._savedCompositions() || this._demoComposition());
  }

  public add() {
    this.dialogService.prompt('Composition name:').then((value) => {
      // console.log(value.result, value.text);
      if (value.result) {
        let composition = new CompositionModel({
          id: this.list.length + 1,
          name: value.text,
          order: this.list.length // next one in line
        });
        this.list.push(composition);
        // persist changes
        this._saveList();
      }
    });
  }

  public edit(composition: IComposition) {
    this.dialogService.prompt('Edit name:', composition.name).then((value) => {
      if (value.result) {
        for (let comp of this.list) {
          if (comp.id === composition.id) {
            comp.name = value.text;
            break;
          }
        }
        // re-assignment triggers view binding change
        // only needed with default change detection
        // when object prop changes in collection
        // NOTE: we will use Observables in ngrx chapter
        this.list = [...this.list];
        // persist changes
        this._saveList();
      }
    });
  }

  public save(updatedComp: CompositionModel) {
    for (let comp of this.list) {
      if (comp.id === updatedComp.id) {
        console.log('found comp.id:', comp.id);
        comp = updatedComp;
        break;
      }
    }
    console.log('saving composition list...');
    // console.log(JSON.stringify(this.list));
    this._saveList();
  }

  private _savedCompositions(): any {
    return this.databaseService.getItem(DatabaseService.KEYS.compositions);
  }

  private _saveList() {
    console.log('saving list:');
    this.databaseService.setItem(DatabaseService.KEYS.compositions, this._serializeList());
  }

  private _serializeList() {
    let serialized = [];
    for (let comp of this.list) {
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

  private _hydrateList(list: Array<IComposition>) {
    for (let c = 0; c < list.length; c++) {
      let comp = new CompositionModel(list[c]);
      for (let i = 0; i < comp.tracks.length; i++) {
        comp.tracks[i] = new TrackModel(comp.tracks[i]);
        // for waveform
        (<any>comp.tracks[i]).model = {
          // fix is only for demo tracks
          target: fixAppLocal(comp.tracks[i].filepath)
        };
      }
      // ensure list ref is updated to use hydrated model
      list[c] = comp;
    }
    return list;
  }

  private _demoComposition(): Array<IComposition> {
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