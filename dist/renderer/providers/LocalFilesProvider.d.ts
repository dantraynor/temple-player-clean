import { MusicProvider, ProviderCapabilities, AuthState, Track, PlaybackSource } from './types';
export declare class LocalFilesProvider implements MusicProvider {
    id: string;
    name: string;
    private capabilities;
    initialize(): Promise<ProviderCapabilities>;
    shutdown(): Promise<void>;
    getCapabilities(): ProviderCapabilities;
    getAuthState(): AuthState;
    resolveFromLocalPaths(filePaths: string[]): Promise<Track[]>;
    getPlaybackSource(trackOrId: Track | string): Promise<PlaybackSource>;
}
//# sourceMappingURL=LocalFilesProvider.d.ts.map