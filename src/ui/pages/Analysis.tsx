import Button from '../components/Button/Button';
import Uploader from '../components/Uploader/Uploader';
import { useState } from 'react';

import type { UploaderFileState } from '../components/Uploader/Uploader';
import Field, { FieldSet } from '../components/Field/Field';

import { useRequestHistoryStore } from '../../store/useRequestHistoryStore';
import type { RequestHistoryItem } from '../../store/useRequestHistoryStore';

export type jsonAnswer = {
  total_spend_galactic?: number;
  rows_affected?: number;
  less_spent_at?: number;
  big_spent_at?: number;
  less_spent_value?: number;
  big_spent_value?: number;
  average_spend_galactic?: number;
  big_spent_civ?: string;
  less_spent_civ?: string;
};

export default function Analysis() {
  const [fileState, setFileState] = useState<UploaderFileState>({
    file: null,
    status: 'idle',
    parsing: false,
    parsingDone: false,
  });

  const { addToHistory } = useRequestHistoryStore();

  const [data, setData] = useState<jsonAnswer>({});

  const fieldset = [
    {
      id: 1,
      title: 'общие расходы в галактических кредитах',
      value: data.total_spend_galactic,
    },
    {
      id: 2,
      title: 'общие расходы в галактических кредитах',
      value: data.total_spend_galactic,
    },
  ];

  const handleFileSelected = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      alert('Поддерживаются только CSV-файлы');
      return;
    }

    setFileState({
      file,
      status: 'ready',
      parsing: false,
      parsingDone: false,
    });
    setData({});
  };

  const handleReset = () => {
    setFileState({
      file: null,
      status: 'idle',
      parsing: false,
      parsingDone: false,
    });
    setData({});
  };

  const handleStartParsing = async () => {
    const { file } = fileState;
    if (!file) return;

    setFileState((prev) => ({
      ...prev,
      status: 'parsing',
      parsing: true,
      parsingDone: false,
    }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        `http://localhost:3000/aggregate?rows=1000`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok || !response.body) {
        throw new Error('Ошибка при загрузке файла');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let buffer = '';

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
            setData((prev) => ({ ...prev, ...json }));
          } catch (e) {
            console.error('Ошибка парсинга:', line);
          }
        }
      }
      if (buffer.trim()) {
        try {
          const json = JSON.parse(buffer.trim());
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
        result: data,
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
  };

  return (
    <div className="area">
      <p style={{ fontSize: '1.2rem', textAlign: 'center' }}>
        Загрузите <b>CSV</b> файл и получите <b>полную информацию</b> о нём за
        сверхнизкое время.
      </p>

      <Uploader
        file={fileState.file}
        status={fileState.status}
        onFileSelected={handleFileSelected}
        onReset={handleReset}
      />

      {(fileState.status == 'idle' || fileState.status == 'ready') && (
        <Button
          style={{ margin: '1rem auto' }}
          inactive={fileState.status !== 'ready'}
          onClick={handleStartParsing}
        >
          Отправить
        </Button>
      )}

      <div style={{ marginTop: '2rem' }}>
        {(fileState.status == 'success' || fileState.status == 'parsing') && (
          <FieldSet>
            <Field
              title="общие расходы в галактических кредитах"
              value={data.total_spend_galactic}
            />
            <Field
              title="количество обработанных записей"
              value={data.rows_affected}
            />
            <Field
              title="день года с минимальными расходами"
              value={data.less_spent_at}
            />
            <Field
              title="цивилизация с минимальными расходами"
              value={data.less_spent_civ}
            />
            <Field
              title="день года с максимальными расходами"
              value={data.big_spent_at}
            />
            <Field
              title="максимальная сумма расходов за день"
              value={data.big_spent_value}
            />
            <Field
              title="средние расходы в галактических кредитах"
              value={data.average_spend_galactic}
            />
            <Field
              title="цивилизация с максимальными расходами"
              value={data.big_spent_civ}
            />
            {/* <Field
            title="минимальная сумма расходов за день"
            value={data.less_spent_value}
          /> */}
          </FieldSet>
        )}
      </div>
    </div>
  );
}
