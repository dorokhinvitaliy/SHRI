import type { SetStateAction } from 'react';
import type { jsonAnswer } from '../shared/types/common.types';
import type { RequestHistoryItem } from '../store/store.types';
import type { UploaderFileState } from '../ui/components/Uploader/Uploader.types';

export default async function fetchAggregate(
  file: string | Blob,
  setData: {
    (value: SetStateAction<jsonAnswer>): void;
    (arg0: { (prev: any): any; (prev: any): any }): void;
  },
  setFileState: {
    (value: SetStateAction<UploaderFileState>): void;
    (arg0: { (prev: any): any; (prev: any): any }): void;
  },
  addToHistory: {
    (item: Omit<RequestHistoryItem, 'id'>): void;
    (arg0: { fileName: any; status: string; result?: jsonAnswer }): void;
  }
) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`http://localhost:3000/aggregate?rows=1000`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok || !response.body) {
      throw new Error('Ошибка при загрузке файла');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let buffer = '';
    let latestData: jsonAnswer = {};

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let boundary;
      while ((boundary = buffer.indexOf('\n')) >= 0) {
        const line = buffer.slice(0, boundary).trim();
        buffer = buffer.slice(boundary + 1);

        if (!line) continue;

        try {
          const json = JSON.parse(line);
          latestData = { ...latestData, ...json };
          setData((prev: any) => ({ ...prev, ...json }));
        } catch (e) {
          console.error('Ошибка парсинга:', line);
        }
      }
    }
    if (buffer.trim()) {
      try {
        const json = JSON.parse(buffer.trim());
        latestData = { ...latestData, ...json };
        setData((prev: any) => ({ ...prev, ...json }));
      } catch (e) {
        console.error('Ошибка парсинга остатка:', buffer);
      }
    }

    setFileState((prev: any) => ({
      ...prev,
      status: 'success',
      parsing: false,
      parsingDone: true,
    }));

    addToHistory({
      fileName: file.name,
      status: 'success',
      result: latestData,
    });
  } catch (e) {
    setFileState((prev: any) => ({
      ...prev,
      status: 'error',
      parsing: false,
      parsingDone: false,
    }));
    addToHistory({
      fileName: file.name,
      status: 'failed',
    });
  }
}
