import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

import closeIcon from '/cancel.svg';

export function Modal({ children }: { children: React.ReactNode }) {
  return ReactDOM.createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.closeButton}>
        <img src={closeIcon} alt="close" width={20} height={20} />
      </div>
      <div className={styles.modal}>{children}</div>
    </div>,
    document.getElementById('modalArea')
  );
}
