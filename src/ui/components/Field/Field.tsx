interface FieldProps {
  title: string;
  value?: any;
}

import styles from './Field.module.css';

export default function Field({ title, value }: FieldProps) {
  return (
    <div className={styles.field}>
      <div>{value === undefined ? '-' : value}</div>
      <strong>{title}</strong>
    </div>
  );
}

export function FieldSet({ children }: { children: React.ReactNode }) {
  return <div className={styles.fieldset}>{children}</div>;
}
