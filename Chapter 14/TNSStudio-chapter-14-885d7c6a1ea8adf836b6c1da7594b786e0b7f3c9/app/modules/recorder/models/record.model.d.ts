import { Store } from '@ngrx/store';
import { Observable } from 'tns-core-modules/data/observable';
import { IRecordModel, IRecordEvents } from './record-common.model';
export declare class RecordModel extends Observable implements IRecordModel {
    constructor(store: Store<any>);
    // readonly events: IRecordEvents;
    readonly target: any;
    readonly recorder: any;
    readonly audioFilePath: string;
    state: number;
    savedFilePath: string;
    toggleRecord(): void;
    togglePlay(startTime?: number, when?: number): void;
    stopPlayback(): void;
    save(): void;
    dispose(): void;
    finish(): void;
    // private _emitEvent(eventName, data?);
    // private _setupEvents();
}
