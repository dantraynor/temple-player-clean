import React from 'react';
interface FileBrowserProps {
    isVisible: boolean;
    onClose: () => void;
    onFileSelect: (files: string[]) => void;
    currentPath?: string;
}
export declare const FileBrowser: React.FC<FileBrowserProps>;
export {};
//# sourceMappingURL=FileBrowser.d.ts.map