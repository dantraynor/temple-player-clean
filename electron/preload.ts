import { contextBridge, ipcRenderer } from 'electron';

// Temple Player API exposed to renderer
const templeAPI = {
  // Window controls
  minimize: () => ipcRenderer.send('temple:minimize'),
  close: () => ipcRenderer.send('temple:close'),
  
  // File operations
  openFileDialog: () => ipcRenderer.invoke('temple:open-file-dialog'),
  
  // App info
  getVersion: () => ipcRenderer.invoke('temple:get-version'),
  
  // Player events (from renderer to main/player)
  player: {
    play: () => ipcRenderer.send('player:play'),
    pause: () => ipcRenderer.send('player:pause'),
    next: () => ipcRenderer.send('player:next'),
    previous: () => ipcRenderer.send('player:previous'),
    seek: (timeMs: number) => ipcRenderer.send('player:seek', timeMs),
    setVolume: (volume: number) => ipcRenderer.send('player:volume', volume),
    loadFiles: (filePaths: string[]) => ipcRenderer.send('player:load-files', filePaths),
  },
  
  // Player state updates (from main/player to renderer)
  onPlayerState: (callback: (state: any) => void) => {
    const subscription = (_event: any, state: any) => callback(state);
    ipcRenderer.on('player:state-update', subscription);
    return () => ipcRenderer.removeListener('player:state-update', subscription);
  },
  
  // God Says feature
  onGodSays: (callback: (number: number) => void) => {
    const subscription = (_event: any, number: number) => callback(number);
    ipcRenderer.on('temple:god-says', subscription);
    return () => ipcRenderer.removeListener('temple:god-says', subscription);
  },
  
  // Quote updates
  onQuoteUpdate: (callback: (quote: string) => void) => {
    const subscription = (_event: any, quote: string) => callback(quote);
    ipcRenderer.on('temple:quote-update', subscription);
    return () => ipcRenderer.removeListener('temple:quote-update', subscription);
  }
};

// Expose the API to the renderer process
contextBridge.exposeInMainWorld('templeAPI', templeAPI);

// Type definitions for TypeScript
export type TempleAPI = typeof templeAPI;