import { MusicProvider, ProviderCapabilities, AuthState, Track, PlaybackSource, SearchResult } from './types';
export declare class TidalProvider implements MusicProvider {
    id: string;
    name: string;
    private capabilities;
    private authState;
    initialize(): Promise<ProviderCapabilities>;
    shutdown(): Promise<void>;
    getCapabilities(): ProviderCapabilities;
    getAuthState(): AuthState;
    beginAuth(): Promise<void>;
    endAuth(): Promise<void>;
    getPlaybackSource(trackOrId: Track | string): Promise<PlaybackSource>;
    searchTracks(query: string, cursor?: string): Promise<SearchResult>;
    getArtworkUrl(trackOrId: Track | string, size?: number): Promise<string>;
}
//# sourceMappingURL=TidalProvider.d.ts.map