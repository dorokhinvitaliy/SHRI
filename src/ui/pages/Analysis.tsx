import Button from '../components/Button/Button';
import Uploader from '../components/Uploader/Uploader';
import { useState } from 'react';

import type { UploaderFileState } from '../components/Uploader/Uploader.types';
import { FieldSet } from '../components/Field/Field';

import { useRequestHistoryStore } from '../../store/useRequestHistoryStore';
import fetchAggregate from '../../api/fetchAggregate';
import type { jsonAnswer } from '../../shared/types/common.types';

export default function Analysis() {
  const [fileState, setFileState] = useState<UploaderFileState>({
    file: null,
    status: 'idle',
  });
  const { addToHistory } = useRequestHistoryStore();
  const [data, setData] = useState<jsonAnswer>({});

  const handleFileSelected = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      return;
    }
    setFileState({
      file,
      status: 'ready',
    });
    setData({});
  };

  const handleReset = () => {
    setFileState({
      file: null,
      status: 'idle',
    });
    setData({});
  };

  const handleStartParsing = async () => {
    const { file } = fileState;
    if (!file) return;
    setFileState((prev) => ({
      ...prev,
      status: 'parsing',
    }));
    await fetchAggregate(file, setData, setFileState, addToHistory);
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
        {fileState.status == 'success' || fileState.status == 'parsing' ? (
          <FieldSet data={data}></FieldSet>
        ) : (
          <p
            style={{
              fontSize: '1.2rem',
              textAlign: 'center',
              color: 'var(--dark-purple)',
            }}
          >
            Здесь появятся хайлайты
          </p>
        )}
      </div>
    </div>
  );
}
