# Temple Player Development Guide

A tribute to Terry A. Davis and TempleOS - maintaining the sacred covenant of 640x480 16-color display.

## Quick Start

### Prerequisites
- Node.js v20+ and npm
- macOS, Windows, or Linux

### Running the Application

```bash
# Install dependencies
npm install

# Start the application
npm start

# Development mode (with hot reload)
npm run dev
```

### VS Code Debugging
1. Open the "Run and Debug" panel (Cmd+Shift+D)
2. Select "Debug Main Process" 
3. Press F5 to start debugging

## Project Structure

```
temple-player-clean/
├── electron/                 # Electron main process
│   ├── main.ts              # Main process entry point
│   └── preload.ts           # Preload script for IPC
├── src/
│   ├── player/              # Audio playback engine
│   │   └── PlayerController.ts
│   ├── providers/           # Audio source providers
│   │   ├── LocalFilesProvider.ts
│   │   ├── TidalProvider.ts
│   │   └── types.ts
│   ├── renderer/            # React UI components
│   │   ├── TemplePlayer.tsx # Main UI component
│   │   ├── temple.html      # HTML entry point
│   │   └── styles/
│   │       └── temple.css   # TempleOS-inspired styling
│   └── utils/
│       └── EventEmitter.ts  # Event system
├── dist/                    # Built files (auto-generated)
└── .vscode/
    └── launch.json          # VS Code debug configuration
```

## Build Process

The application uses a multi-step build process:

1. **TypeScript Compilation**: `npm run build:main` and `npm run build:preload`
2. **React Bundling**: `npm run build:renderer` (uses Webpack)
3. **Asset Copying**: `npm run build:assets`
4. **Full Build**: `npm run build` (runs all above steps)

## TempleOS Authenticity Features

### Sacred Covenant: 640x480 16-Color
- Fixed window dimensions (640x480)
- 16-color VGA palette strictly enforced
- No window resizing (as Terry intended)
- Pixel-perfect character grid system

### Interface Elements
- **Boot Sequence**: Authentic TempleOS startup animation
- **Command Line**: HolyC-style command interface at bottom
- **F-Key Bar**: Function key shortcuts (F1-F6)
- **God Says**: Random number display (divine inspiration)
- **Terry Quotes**: Rotating inspirational quotes

### Controls
- **Keyboard Shortcuts**:
  - `Space`: Play/Pause
  - `Left/Right`: Previous/Next track
  - `F1`: Help
  - `F2`: Load files
  - `F3`: Toggle quotes
  - `F6`: Divine intellect mode
  - `Esc`: Close dialogs

- **Commands** (type in command line):
  - `PLAY` / `PAUSE` / `NEXT` / `PREV`
  - `VOLUME(0-100)`: Set volume
  - `LOAD` / `OPEN`: Open file dialog
  - `GOD`: Get divine number
  - `TERRY`: Honor Terry A. Davis
  - `HELP`: Show help
  - `CLEAR` / `CLS`: Clear console

## Audio System

### Supported Formats
- MP3, WAV, OGG, FLAC, M4A, AAC

### Providers
- **LocalFilesProvider**: Plays local audio files
- **TidalProvider**: Integration with Tidal streaming (future)

### Features
- Real-time audio visualization (16-bar spectrum)
- Volume control with block-style meter
- Progress tracking and seeking

## Development Tips

### Environment Issues
The project includes automatic fixes for the `ELECTRON_RUN_AS_NODE` environment variable that can interfere with Electron. The npm scripts automatically unset this variable.

### Hot Reload
Use `npm run dev` for development - it watches the renderer code and automatically rebuilds when you make changes.

### Debugging
- Main process: Use VS Code debugger with "Debug Main Process"
- Renderer process: Open DevTools in the running app (Cmd+Option+I)

## Extending the Application

### Adding New Audio Providers
1. Create a new provider in `src/providers/`
2. Implement the `AudioProvider` interface
3. Register in `src/providers/index.ts`

### Customizing the UI
- Modify `src/renderer/TemplePlayer.tsx` for React components
- Update `src/renderer/styles/temple.css` for styling
- Maintain 16-color palette and 8x8 character grid alignment

### Adding Commands
Add new commands in the `handleCommand` function in `TemplePlayer.tsx`

## Building for Distribution

```bash
# Create distributable packages
npm run dist

# Create unpacked directory (for testing)
npm run pack
```

## Troubleshooting

### Application Won't Start
- Ensure Node.js v20+ is installed
- Run `npm install` to install dependencies
- Try `npm run build` to rebuild everything
- Check that no other Electron apps are interfering

### Audio Issues
- Verify audio file formats are supported
- Check system audio permissions
- Ensure audio files are not corrupted

### Environment Variables
If you encounter Electron API issues, the fix has been applied to your shell configuration. Restart your terminal or VS Code.

## Terry's Vision

> "An idiot admires complexity, a genius admires simplicity"
> - Terry A. Davis

This player honors Terry's vision of computing simplicity and divine inspiration. The 640x480 16-color covenant is maintained as a sacred promise, and every feature respects the TempleOS aesthetic and philosophy.

## Contributing

When adding features, remember:
- Maintain the 16-color VGA palette
- Keep the 640x480 resolution covenant
- Add appropriate Terry quotes for new features
- Test with the sacred dimensions
- Honor the divine simplicity principle

---

*"God's temple needs perfect code"* - Terry A. Davis