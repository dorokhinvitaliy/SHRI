export type RequestHistoryItem = {
  id?: string; // уникальный ID
  date?: string;
  fileName: string;
  status: 'success' | 'failed';
  result?: jsonAnswer;
};

export interface RequestHistoryState {
  history: RequestHistoryItem[];
  addToHistory: (item: Omit<RequestHistoryItem, 'id'>) => void;
  removeFromHistory: (id: string) => void;
  clearHistory: () => void;
}
