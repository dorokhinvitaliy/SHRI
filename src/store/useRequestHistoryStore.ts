import { create } from 'zustand';
import type { RequestHistoryItem, RequestHistoryState } from './store.types';

function getCurrentDateFormatted() {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0'); // День месяца
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяц (начинается с 0)
  const year = today.getFullYear();

  return `${day}.${month}.${year}`;
}

export const useRequestHistoryStore = create<RequestHistoryState>((set) => ({
  history: loadFromLocalStorage(),

  addToHistory: (item) =>
    set((state) => {
      const newItem: RequestHistoryItem = {
        ...item,
        id: crypto.randomUUID(),
        date: getCurrentDateFormatted(),
      };

      const newHistory = [newItem, ...state.history].slice(0, 50); // ограничение на 50 записей

      saveToLocalStorage(newHistory);

      return { history: newHistory };
    }),

  removeFromHistory: (id: string) =>
    set((state) => {
      const newHistory = state.history.filter((item) => item.id !== id);
      saveToLocalStorage(newHistory);
      return { history: newHistory };
    }),

  clearHistory: () =>
    set(() => {
      saveToLocalStorage([]);
      return { history: [] };
    }),
}));

// --- Вспомогательные функции для localStorage ---

function loadFromLocalStorage(): RequestHistoryItem[] {
  try {
    const saved = localStorage.getItem('requestHistory');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.error('Ошибка чтения из localStorage', e);
    return [];
  }
}

function saveToLocalStorage(history: RequestHistoryItem[]) {
  try {
    localStorage.setItem('requestHistory', JSON.stringify(history));
  } catch (e) {
    console.error('Ошибка записи в localStorage', e);
  }
}
