"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
// Temple Player API exposed to renderer
const templeAPI = {
    // Window controls
    minimize: () => electron_1.ipcRenderer.send('temple:minimize'),
    close: () => electron_1.ipcRenderer.send('temple:close'),
    // File operations
    openFileDialog: () => electron_1.ipcRenderer.invoke('temple:open-file-dialog'),
    // App info
    getVersion: () => electron_1.ipcRenderer.invoke('temple:get-version'),
    // Player events (from renderer to main/player)
    player: {
        play: () => electron_1.ipcRenderer.send('player:play'),
        pause: () => electron_1.ipcRenderer.send('player:pause'),
        next: () => electron_1.ipcRenderer.send('player:next'),
        previous: () => electron_1.ipcRenderer.send('player:previous'),
        seek: (timeMs) => electron_1.ipcRenderer.send('player:seek', timeMs),
        setVolume: (volume) => electron_1.ipcRenderer.send('player:volume', volume),
        loadFiles: (filePaths) => electron_1.ipcRenderer.send('player:load-files', filePaths),
    },
    // Player state updates (from main/player to renderer)
    onPlayerState: (callback) => {
        const subscription = (_event, state) => callback(state);
        electron_1.ipcRenderer.on('player:state-update', subscription);
        return () => electron_1.ipcRenderer.removeListener('player:state-update', subscription);
    },
    // God Says feature
    onGodSays: (callback) => {
        const subscription = (_event, number) => callback(number);
        electron_1.ipcRenderer.on('temple:god-says', subscription);
        return () => electron_1.ipcRenderer.removeListener('temple:god-says', subscription);
    },
    // Quote updates
    onQuoteUpdate: (callback) => {
        const subscription = (_event, quote) => callback(quote);
        electron_1.ipcRenderer.on('temple:quote-update', subscription);
        return () => electron_1.ipcRenderer.removeListener('temple:quote-update', subscription);
    }
};
// Expose the API to the renderer process
electron_1.contextBridge.exposeInMainWorld('templeAPI', templeAPI);
//# sourceMappingURL=preload.js.map