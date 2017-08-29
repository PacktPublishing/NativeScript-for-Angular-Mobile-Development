import { Observable } from 'data/observable';
import { IRecordModel, IRecordEvents } from './common';
export declare class RecordModel extends Observable implements IRecordModel {
    readonly events: IRecordEvents;
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
    private _emitEvent(eventName, data?);
    private _setupEvents();
}
