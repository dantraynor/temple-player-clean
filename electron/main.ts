import { app, BrowserWindow, ipcMain, dialog, screen } from 'electron';
import * as path from 'path';

// Sacred covenant dimensions
const TEMPLE_DIMENSIONS = {
  WIDTH: 640,
  HEIGHT: 480
} as const;

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  // Get primary display to center the window
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width: screenWidth, height: screenHeight } = primaryDisplay.workAreaSize;
  
  const x = Math.floor((screenWidth - TEMPLE_DIMENSIONS.WIDTH) / 2);
  const y = Math.floor((screenHeight - TEMPLE_DIMENSIONS.HEIGHT) / 2);

  mainWindow = new BrowserWindow({
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
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for window controls
ipcMain.on('temple:minimize', () => {
  mainWindow?.minimize();
});

ipcMain.on('temple:close', () => {
  mainWindow?.close();
});

// IPC handler for file dialog
ipcMain.handle('temple:open-file-dialog', async () => {
  const result = await dialog.showOpenDialog(mainWindow!, {
    properties: ['openFile', 'multiSelections'],
    filters: [
      { name: 'Audio Files', extensions: ['mp3', 'wav', 'ogg', 'flac', 'm4a', 'aac'] },
      { name: 'All Files', extensions: ['*'] }
    ]
  });
  
  return result.filePaths;
});

// IPC handler for app version
ipcMain.handle('temple:get-version', () => {
  return app.getVersion();
});