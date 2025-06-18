// src/components/Uploader.tsx
import React, { useState } from 'react'
import styles from './Uploader.module.css'

interface FileState {
  file: File | null
  status: 'idle' | 'loading' | 'success' | 'error'
}

export const Uploader: React.FC = () => {
  const [dragActive, setDragActive] = useState(false)
  const [fileState, setFileState] = useState<FileState>({
    file: null,
    status: 'idle',
  })

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = Array.from(e.dataTransfer.files)
    if (droppedFiles.length > 0) {
      const file = droppedFiles[0]

      // Проверка формата файла
      if (!file.name.endsWith('.csv')) {
        alert('Поддерживаются только CSV-файлы')
        return
      }

      setFileState({ file, status: 'loading' })

      // Имитация обработки файла
      simulateProcessing(file)
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0]

      if (!file.name.endsWith('.csv')) {
        alert('Поддерживаются только CSV-файлы')
        return
      }

      setFileState({ file, status: 'loading' })

      // Имитация обработки файла
      simulateProcessing(file)
    }
  }

  const simulateProcessing = (file: File) => {
    // Имитация длительной операции
    setTimeout(() => {
      setFileState((prev) => ({ ...prev, status: 'success' }))
    }, 2000)

    setTimeout(() => {
      // Случайная ошибка
      if (Math.random() < 0.3) {
        setFileState((prev) => ({ ...prev, status: 'error' }))
      }
    }, 4000)
  }

  const resetFile = () => {
    setFileState({ file: null, status: 'idle' })
  }

  return (
    <div
      className={`${styles.uploader} ${
        dragActive ? styles['uploader--active'] : ''
      } ${fileState.status === 'success' ? styles['uploader--success'] : ''} ${
        fileState.status === 'error' ? styles['uploader--error'] : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {fileState.status === 'idle' && (
        <>
          <p>Перетащите файл сюда</p>
          <button
            type="button"
            onClick={() => document.getElementById('file-input')?.click()}
          >
            Загрузить файл
          </button>
          <input
            id="file-input"
            type="file"
            accept=".csv"
            onChange={handleFileInput}
            style={{ display: 'none' }}
          />
        </>
      )}

      {fileState.status === 'loading' && (
        <div className={styles.uploader__processing}>
          <div className={styles.uploader__spinner}></div>
          <p>Идёт парсинг файла</p>
          <p>{fileState.file?.name}</p>
        </div>
      )}

      {fileState.status === 'success' && (
        <div className={styles.uploader__result}>
          <p>✅ Готово!</p>
          <p>{fileState.file?.name}</p>
          <button type="button" onClick={resetFile}>
            Удалить
          </button>
        </div>
      )}

      {fileState.status === 'error' && (
        <div className={styles.uploader__error}>
          <p>⚠️ Упс, не то…</p>
          <p>{fileState.file?.name}</p>
          <button type="button" onClick={resetFile}>
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  )
}