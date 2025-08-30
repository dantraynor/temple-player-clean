import React, { useState, useEffect, useCallback } from 'react';

interface FileEntry {
  name: string;
  path: string;
  type: 'file' | 'directory';
  size?: number;
  isAudio?: boolean;
}

interface FileBrowserProps {
  isVisible: boolean;
  onClose: () => void;
  onFileSelect: (files: string[]) => void;
  currentPath?: string;
}

const AUDIO_EXTENSIONS = ['.mp3', '.wav', '.ogg', '.flac', '.m4a', '.aac'];

export const FileBrowser: React.FC<FileBrowserProps> = ({
  isVisible,
  onClose,
  onFileSelect,
  currentPath = '/'
}) => {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
  const [path, setPath] = useState(currentPath);

  // Mock file system data - in real implementation, this would come from Electron main process
  const loadDirectory = useCallback(async (dirPath: string) => {
    // This would be replaced with actual file system calls via IPC
    const mockFiles: FileEntry[] = [
      { name: '..', path: dirPath.split('/').slice(0, -1).join('/') || '/', type: 'directory' },
      { name: 'Music', path: `${dirPath}/Music`, type: 'directory' },
      { name: 'Downloads', path: `${dirPath}/Downloads`, type: 'directory' },
      { name: 'song1.mp3', path: `${dirPath}/song1.mp3`, type: 'file', size: 3456789, isAudio: true },
      { name: 'song2.flac', path: `${dirPath}/song2.flac`, type: 'file', size: 12345678, isAudio: true },
      { name: 'document.txt', path: `${dirPath}/document.txt`, type: 'file', size: 1234 },
    ];
    
    setFiles(mockFiles);
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    if (isVisible) {
      loadDirectory(path);
    }
  }, [isVisible, path, loadDirectory]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isVisible) return;

    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => Math.max(0, prev - 1));
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => Math.min(files.length - 1, prev + 1));
        break;
      case 'Enter':
        e.preventDefault();
        handleSelect();
        break;
      case 'Escape':
        e.preventDefault();
        onClose();
        break;
      case ' ':
        e.preventDefault();
        toggleFileSelection();
        break;
    }
  }, [isVisible, files.length, selectedIndex]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleSelect = () => {
    const selectedFile = files[selectedIndex];
    if (!selectedFile) return;

    if (selectedFile.type === 'directory') {
      setPath(selectedFile.path);
    } else if (selectedFile.isAudio) {
      const audioFiles = Array.from(selectedFiles).length > 0 
        ? Array.from(selectedFiles)
        : [selectedFile.path];
      onFileSelect(audioFiles);
      onClose();
    }
  };

  const toggleFileSelection = () => {
    const selectedFile = files[selectedIndex];
    if (!selectedFile || selectedFile.type === 'directory') return;

    const newSelected = new Set(selectedFiles);
    if (newSelected.has(selectedFile.path)) {
      newSelected.delete(selectedFile.path);
    } else {
      newSelected.add(selectedFile.path);
    }
    setSelectedFiles(newSelected);
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return '';
    const kb = bytes / 1024;
    const mb = kb / 1024;
    if (mb >= 1) return `${mb.toFixed(1)}MB`;
    if (kb >= 1) return `${kb.toFixed(1)}KB`;
    return `${bytes}B`;
  };

  const getFileIcon = (file: FileEntry): string => {
    if (file.type === 'directory') return file.name === '..' ? '↑' : '📁';
    if (file.isAudio) return '♪';
    return '📄';
  };

  if (!isVisible) return null;

  return (
    <div className="file-browser-overlay">
      <div className="file-browser">
        <div className="file-browser-header">
          <div className="file-browser-title">TEMPLE FILE BROWSER</div>
          <div className="file-browser-path">PATH: {path}</div>
        </div>
        
        <div className="file-browser-content">
          <div className="file-browser-instructions">
            <span className="text-cyan">↑↓</span> NAVIGATE  
            <span className="text-cyan">ENTER</span> SELECT  
            <span className="text-cyan">SPACE</span> MULTI-SELECT  
            <span className="text-cyan">ESC</span> CANCEL
          </div>
          
          <div className="file-list">
            {files.map((file, index) => (
              <div
                key={file.path}
                className={`file-entry ${index === selectedIndex ? 'selected' : ''} ${
                  selectedFiles.has(file.path) ? 'multi-selected' : ''
                }`}
              >
                <span className="file-icon">{getFileIcon(file)}</span>
                <span className="file-name">{file.name}</span>
                <span className="file-size">{formatFileSize(file.size)}</span>
              </div>
            ))}
          </div>
          
          {selectedFiles.size > 0 && (
            <div className="selection-info">
              <span className="text-yellow">SELECTED: {selectedFiles.size} FILES</span>
            </div>
          )}
        </div>
        
        <div className="file-browser-footer">
          <div className="text-gray">
            "SIMPLICITY IS DIVINE" - TERRY A. DAVIS
          </div>
        </div>
      </div>
    </div>
  );
};