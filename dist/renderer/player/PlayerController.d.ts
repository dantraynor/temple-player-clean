import { EventEmitter } from '../utils/EventEmitter';
import { Track } from '../providers/types';
export interface PlayerState {
    status: 'playing' | 'paused' | 'stopped';
    currentTimeMs: number;
    durationMs: number;
    currentTrack: Track | null;
    queue: Track[];
    queueIndex: number;
    volume: number;
    muted: boolean;
    analyserNode: AnalyserNode | null;
}
export declare class PlayerController extends EventEmitter {
    private audio;
    private audioContext;
    private sourceNode;
    private analyserNode;
    private gainNode;
    private state;
    constructor();
    private initializeAudioContext;
    private updateState;
    private handleTimeUpdate;
    private handleMetadataLoaded;
    private handleTrackEnded;
    private handleError;
    loadQueue(tracks: Track[]): Promise<void>;
    private loadTrack;
    play(): Promise<void>;
    pause(): void;
    toggle(): Promise<void>;
    next(): Promise<void>;
    previous(): Promise<void>;
    seek(timeMs: number): void;
    setVolume(volume: number): void;
    setMuted(muted: boolean): void;
    getState(): PlayerState;
    destroy(): void;
}
//# sourceMappingURL=PlayerController.d.ts.map