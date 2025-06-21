import ReactDOM from 'react-dom';
import styles from './Modal.module.css';

import closeIcon from '/cancel.svg';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

export function Modal({
  isOpened,
  children,
  onClose,
}: {
  isOpened: boolean;
  children: React.ReactNode;
  onClose: () => void;
}) {
  const [isClosing, switchIsClosing] = useState(false);
  function closing() {
    switchIsClosing(true);
    setTimeout(() => {
      onClose();
      switchIsClosing(false);
    }, 500);
  }
  if (!isOpened) {
    return null;
  }
  return ReactDOM.createPortal(
    <div
      className={classNames(styles.modalContainer, isClosing && styles.closed)}
    >
      <div className={styles.modalInnerContainer}>
        <div className={styles.modal}>{children}</div>
        <div className={styles.closeButton}>
          <img
            src={closeIcon}
            alt="close"
            width={20}
            height={20}
            onClick={() => closing()}
          />
        </div>
      </div>
    </div>,
    document.body
  );
}
