import React, { useState } from 'react';
import styles from './Uploader.module.css';

import cancel from '/cancel.svg';
import classNames from 'classnames';

export type UploaderFileState = {
  onFileSelected?: (file: File) => void;
  onReset?: () => void;
  file: File | null;
  status: 'idle' | 'ready' | 'parsing' | 'success' | 'error';
  parsing?: boolean;
  parsingDone?: boolean;
};

export default function Uploader({
  onFileSelected,
  onReset,
  file,
  status,
}: UploaderFileState) {
  const [dragActive, setDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) onFileSelected(droppedFile);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) onFileSelected(selectedFile);
  };

  return (
    <div
      className={classNames(
        styles.uploader,
        dragActive && styles['uploader--active'],
        status === 'success' && styles['uploader--success'],
        status === 'error' && styles['uploader--error'],
        status === 'ready' && styles['uploader--preview'],
        status === 'parsing' && styles['uploader--processing']
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {status === 'idle' && (
        <>
          <button
            className={styles.button}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            {status === 'idle' ? 'Загрузить файл' : 'Заменить файл'}
          </button>
          <p>Перетащите файл сюда</p>
          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={handleInputChange}
            style={{ display: 'none' }}
          />
        </>
      )}

      {status === 'ready' && file && (
        <div className={styles.uploader__preview}>
          <div className={styles.fileFlex}>
            <p>{file.name}</p>
            <button className={styles.iconButton} onClick={onReset}>
              <img src={cancel} alt="cancel" width={20} height={20} />
            </button>
          </div>
          <p>Файл загружен!</p>
        </div>
      )}

      {status === 'parsing' && (
        <div className={styles.uploader__processing}>
          <div className={styles.fileFlex}>
            <p>
              <div
                style={{ margin: '0 5rem' }}
                className={styles.uploader__spinner}
              ></div>
            </p>
          </div>
          <p>идет парсинг файла…</p>
        </div>
      )}

      {status === 'success' && (
        <div className={styles.uploader__result}>
          <div className={styles.fileFlex}>
            <p>{file?.name}</p>
            <button className={styles.iconButton} onClick={onReset}>
              <img src={cancel} alt="cancel" width={20} height={20} />
            </button>
          </div>
          <p>готово!</p>
        </div>
      )}

      {status === 'error' && (
        <div className={styles.uploader__error}>
          <div className={styles.fileFlex}>
            <p>{file?.name}</p>
            <button className={styles.iconButton} onClick={onReset}>
              <img src={cancel} alt="cancel" width={20} height={20} />
            </button>
          </div>
          <p>Произошла ошибка при парсинге</p>
        </div>
      )}
    </div>
  );
}
