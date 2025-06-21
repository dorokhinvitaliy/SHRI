import classNames from 'classnames';
import { useRequestHistoryStore } from '../../../store/useRequestHistoryStore';

import happyIcon from '/happy.svg';
import sadIcon from '/sad.svg';
import fileIcon from '/file.svg';
import trashIcon from '/trash.svg';

import styles from './HistoryItem.module.css';
import { Modal } from '../Modal/Modal';
import { FieldSet } from '../Field/Field';
import { useState } from 'react';
import type { RequestHistoryItem } from '../../../store/store.types';

export default function HistoryItem({
  id,
  fileName,
  date,
  status,
  result,
}: RequestHistoryItem) {
  const { removeFromHistory } = useRequestHistoryStore();
  const [opened, switchOpened] = useState(false);
  return (
    <div className={styles.item}>
      <div className={styles.itemBlock} onClick={() => switchOpened(true)}>
        <div className={styles.itemBlock_section}>
          <img src={fileIcon} alt={fileIcon} width={25} height={25} />
          {fileName}
        </div>
        <div className={styles.itemBlock_section}>{date}</div>
        <div
          className={classNames(
            styles.itemBlock_section,
            status == 'failed' && styles.inactive
          )}
        >
          <img src={happyIcon} alt={happyIcon} width={25} height={25} />
          Обработан успешно
        </div>
        <div
          className={classNames(
            styles.itemBlock_section,
            status == 'success' && styles.inactive
          )}
        >
          <img src={sadIcon} alt={sadIcon} width={25} height={25} />
          Не удалось обработать
        </div>
      </div>
      <button
        className={styles.itemDelete}
        onClick={(e) => removeFromHistory(id)}
      >
        <img src={trashIcon} alt={'trash'} width={20} height={20} />
      </button>
      {status == 'success' && (
        <Modal isOpened={opened} onClose={() => switchOpened(false)}>
          <FieldSet secondary data={result}></FieldSet>
        </Modal>
      )}
    </div>
  );
}

export function HistoryItems({ items }: { items: RequestHistoryItem[] }) {
  return (
    <div className={styles.items}>
      {items.map((item) => (
        <HistoryItem
          key={item.id}
          date={item.date}
          fileName={item.fileName}
          status={item.status}
          id={item.id}
          result={item.result}
        />
      ))}
    </div>
  );
}
