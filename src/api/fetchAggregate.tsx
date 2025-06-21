import type { jsonAnswer } from '../ui/pages/Analysis';

export default async function fetchAggregate(
  file,
  setData,
  setFileState,
  addToHistory
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
          setData((prev) => ({ ...prev, ...json }));
        } catch (e) {
          console.error('Ошибка парсинга:', line);
        }
      }
    }
    if (buffer.trim()) {
      try {
        const json = JSON.parse(buffer.trim());
        latestData = { ...latestData, ...json };
        setData((prev) => ({ ...prev, ...json }));
      } catch (e) {
        console.error('Ошибка парсинга остатка:', buffer);
      }
    }

    setFileState((prev) => ({
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
    setFileState((prev) => ({
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
