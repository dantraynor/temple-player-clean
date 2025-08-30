export interface Track {
    id: string;
    title: string;
    artistName: string;
    albumName: string;
    durationMs: number;
    artworkUrl?: string;
    explicit?: boolean;
    providerId: string;
}
export interface PlaybackSource {
    url: string;
    mime?: string;
    streamType: 'file' | 'http' | 'hls';
    headers?: Record<string, string>;
    drm?: {
        type: string;
        config: any;
    };
}
export interface SearchResult {
    tracks: Track[];
    nextCursor?: string;
}
export interface AuthState {
    status: 'unauthenticated' | 'authenticated' | 'error';
    userLabel?: string;
}
export interface ProviderCapabilities {
    canLocalFiles: boolean;
    canSearch: boolean;
    canGetArtwork: boolean;
    canAuth: boolean;
    canStreamHttp: boolean;
    supportsHls: boolean;
    supportsHeaders: boolean;
    supportsDrm: boolean;
}
export type ProviderErrorCode = 'auth_required' | 'content_unavailable' | 'not_supported' | 'network_error';
export declare class ProviderError extends Error {
    code: ProviderErrorCode;
    constructor(code: ProviderErrorCode, message: string);
}
export interface MusicProvider {
    id: string;
    name: string;
    initialize(): Promise<ProviderCapabilities>;
    shutdown(): Promise<void>;
    getCapabilities(): ProviderCapabilities;
    getAuthState(): AuthState;
    beginAuth?(): Promise<void>;
    endAuth?(): Promise<void>;
    resolveFromLocalPaths?(filePaths: string[]): Promise<Track[]>;
    getPlaybackSource(trackOrId: Track | string): Promise<PlaybackSource>;
    searchTracks?(query: string, cursor?: string): Promise<SearchResult>;
    getArtworkUrl?(trackOrId: Track | string, size?: number): Promise<string>;
}
export interface ProviderEvents {
    authStateChanged: AuthState;
    providerError: {
        code: ProviderErrorCode;
        message: string;
    };
}
//# sourceMappingURL=types.d.ts.map