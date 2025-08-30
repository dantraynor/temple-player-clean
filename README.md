# Temple Player

A music player tribute to Terry A. Davis and TempleOS, built with Electron, TypeScript, and React.

## About

This application honors Terry A. Davis (1969-2018), creator of TempleOS, by recreating the authentic TempleOS interface as a functional music player. It maintains the sacred covenant of 640x480 resolution and 16-color VGA palette while providing modern audio playback capabilities.

## Features

- Authentic TempleOS visual design with light gray backgrounds and proper window styling
- Central cross symbol as the focal point of the interface
- Windowed desktop environment with multiple functional panels
- Support for common audio formats (MP3, FLAC, WAV, OGG, M4A, AAC)
- Real-time audio visualization
- Keyboard shortcuts and command-line interface
- File browser for loading music
- Terry Davis quotes and "God Says" random numbers

## Installation

```bash
npm install
```

## Usage

```bash
# Start the application
npm start

# Development mode with hot reload
npm run dev
```

## Controls

- **Space**: Play/Pause
- **Arrow Keys**: Previous/Next track
- **F1**: Help
- **F2**: Load files
- **F3**: Toggle quotes
- **F6**: Divine mode
- **Esc**: Close dialogs

## Commands

Type these commands in the command line at the bottom:

- `PLAY` / `PAUSE` - Control playback
- `NEXT` / `PREV` - Navigate tracks
- `VOLUME(0-100)` - Set volume level
- `LOAD` / `OPEN` - Open file browser
- `GOD` - Get divine number
- `TERRY` - Honor Terry A. Davis
- `HELP` - Show help
- `CLEAR` - Clear console

## Development

The project uses:
- Electron for the desktop application framework
- TypeScript for type safety
- React for the user interface
- Webpack for bundling
- Web Audio API for audio processing

### Project Structure

```
src/
├── electron/          # Electron main process
├── renderer/          # React UI components
├── player/            # Audio playback controller
├── providers/         # Audio source providers
└── utils/             # Utility functions
```

### Building

```bash
# Build all components
npm run build

# Build individual parts
npm run build:main      # Electron main process
npm run build:preload   # Preload script
npm run build:renderer  # React UI
npm run build:assets    # Copy static files
```

## Tribute

> "An idiot admires complexity, a genius admires simplicity"
> - Terry A. Davis

This project maintains the sacred covenant of 640x480 16-color display as specified by Terry. The interface recreates the authentic TempleOS experience while serving as a functional music player.

## License

MIT License - Created in memory of Terry A. Davis and his divine vision of computing simplicity.