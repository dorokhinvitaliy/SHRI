import Button from '../Button/Button';

import styles from './StateButton.module.css';
import cancel from '/cancel.svg';

export type state = 'basic' | 'loading' | 'success' | 'error';

export default function StateButton({
  children,
  state,
  onClick,
  onReset,
}: {
  children: React.ReactNode;
  state: state;
  onClick: () => void;
  onReset: () => void;
}) {
  if (state == 'basic') {
    return (
      <div className={styles.uploader__preview}>
        <Button onClick={onClick}>{children}</Button>
      </div>
    );
  }

  if (state == 'loading') {
    return (
      <div className={styles.uploader__processing}>
        <div className={styles.fileFlex}>
          <div className={styles.fileArea}>
            <div
              style={{ margin: '0 5rem' }}
              className={styles.uploader__spinner}
            ></div>
          </div>
        </div>
        <p>идет процесс генерации...</p>
      </div>
    );
  }

  if (state == 'success') {
    return (
      <div className={styles.uploader__result}>
        <div className={styles.fileFlex}>
          <div className={styles.fileArea}>Done!</div>
          <button className={styles.iconButton} onClick={onReset}>
            <img src={cancel} alt="cancel" width={20} height={20} />
          </button>
        </div>
        <p>файл сгенерирован!</p>
      </div>
    );
  }

  if (state == 'error') {
    return (
      <div className={styles.uploader__error}>
        <div className={styles.fileFlex}>
          <div className={styles.fileArea}>Ошибка</div>
          <button className={styles.iconButton} onClick={onReset}>
            <img src={cancel} alt="cancel" width={20} height={20} />
          </button>
        </div>
        <p>упс, не то</p>
      </div>
    );
  }
}
