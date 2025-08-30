declare const templeAPI: {
    minimize: () => void;
    close: () => void;
    openFileDialog: () => Promise<any>;
    getVersion: () => Promise<any>;
    player: {
        play: () => void;
        pause: () => void;
        next: () => void;
        previous: () => void;
        seek: (timeMs: number) => void;
        setVolume: (volume: number) => void;
        loadFiles: (filePaths: string[]) => void;
    };
    onPlayerState: (callback: (state: any) => void) => () => Electron.IpcRenderer;
    onGodSays: (callback: (number: number) => void) => () => Electron.IpcRenderer;
    onQuoteUpdate: (callback: (quote: string) => void) => () => Electron.IpcRenderer;
};
export type TempleAPI = typeof templeAPI;
export {};
//# sourceMappingURL=preload.d.ts.map