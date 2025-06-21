export type UploaderFileState = {
  onFileSelected?: (file: File) => void;
  onReset?: () => void;
  file: File | null;
  status: 'idle' | 'ready' | 'parsing' | 'success' | 'error';
};
