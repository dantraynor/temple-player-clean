"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = __importStar(require("path"));
// Sacred covenant dimensions
const TEMPLE_DIMENSIONS = {
    WIDTH: 640,
    HEIGHT: 480
};
let mainWindow = null;
function createWindow() {
    // Get primary display to center the window
    const primaryDisplay = electron_1.screen.getPrimaryDisplay();
    const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
    const x = Math.floor((screenWidth - TEMPLE_DIMENSIONS.WIDTH) / 2);
    const y = Math.floor((screenHeight - TEMPLE_DIMENSIONS.HEIGHT) / 2);
    mainWindow = new electron_1.BrowserWindow({
        width: TEMPLE_DIMENSIONS.WIDTH,
        height: TEMPLE_DIMENSIONS.HEIGHT,
        x,
        y,
        resizable: false, // Sacred covenant - no resizing!
        frame: false, // We'll draw our own TempleOS frame
        transparent: false,
        backgroundColor: '#000000', // Start with black
        alwaysOnTop: false,
        fullscreenable: false,
        minimizable: true,
        maximizable: false,
        title: 'Temple Player (Terry Tribute)',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    });
    // Load the temple.html
    mainWindow.loadFile(path.join(__dirname, '../renderer/temple.html'));
    // Handle window closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}
// App event handlers
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
// IPC handlers for window controls
electron_1.ipcMain.on('temple:minimize', () => {
    mainWindow?.minimize();
});
electron_1.ipcMain.on('temple:close', () => {
    mainWindow?.close();
});
// IPC handler for file dialog
electron_1.ipcMain.handle('temple:open-file-dialog', async () => {
    const result = await electron_1.dialog.showOpenDialog(mainWindow, {
        properties: ['openFile', 'multiSelections'],
        filters: [
            { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'] },
            { name: 'All Files', extensions: ['*'] }
        ]
    });
    return result.filePaths;
});
// IPC handler for app version
electron_1.ipcMain.handle('temple:get-version', () => {
    return electron_1.app.getVersion();
});
//# sourceMappingURL=main.js.map