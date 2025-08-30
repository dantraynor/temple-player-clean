import {
  MusicProvider,
  ProviderCapabilities,
  AuthState,
  Track,
  PlaybackSource,
  ProviderError
} from './types';

// Simple browser-compatible path utilities
const pathUtils = {
  basename: (filePath: string): string => {
    return filePath.split(/[\\/]/).pop() || '';
  },
  
  parse: (fileName: string): { name: string } => {
    const lastDotIndex = fileName.lastIndexOf('.');
    const name = lastDotIndex > 0 ? fileName.substring(0, lastDotIndex) : fileName;
    return { name };
  }
};

export class LocalFilesProvider implements MusicProvider {
  id = 'local';
  name = 'Local Files';
  
  private capabilities: ProviderCapabilities = {
    canLocalFiles: true,
    canSearch: false,
    canGetArtwork: false,
    canAuth: false,
    canStreamHttp: false,
    supportsHls: false,
    supportsHeaders: false,
    supportsDrm: false
  };
  
  async initialize(): Promise<ProviderCapabilities> {
    return this.capabilities;
  }
  
  async shutdown(): Promise<void> {
    // Nothing to clean up
  }
  
  getCapabilities(): ProviderCapabilities {
    return this.capabilities;
  }
  
  getAuthState(): AuthState {
    return { status: 'unauthenticated' };
  }
  
  async resolveFromLocalPaths(filePaths: string[]): Promise<Track[]> {
    return filePaths.map((filePath, index) => {
      const fileName = pathUtils.basename(filePath);
      const nameWithoutExt = pathUtils.parse(fileName).name;
      
      // Simple parsing - could be enhanced with metadata reading
      const parts = nameWithoutExt.split(' - ');
      const artist = parts.length > 1 ? parts[0] : 'Unknown Artist';
      const title = parts.length > 1 ? parts.slice(1).join(' - ') : nameWithoutExt;
      
      return {
        id: `local:${filePath}`,
        title,
        artistName: artist,
        albumName: 'Local Files',
        durationMs: 0, // Would need to read from file metadata
        providerId: this.id
      };
    });
  }
  
  async getPlaybackSource(trackOrId: Track | string): Promise<PlaybackSource> {
    const trackId = typeof trackOrId === 'string' ? trackOrId : trackOrId.id;
    
    if (!trackId.startsWith('local:')) {
      throw new ProviderError('not_supported', 'Track is not a local file');
    }
    
    const filePath = trackId.substring(6); // Remove 'local:' prefix
    
    return {
      url: `file://${filePath}`,
      streamType: 'file'
    };
  }
}