import classNames from 'classnames';
import styles from './Field.module.css';
import type { FieldProps } from './Field.types';

export default function Field({ title, value }: FieldProps) {
  return (
    <div className={classNames(styles.field)}>
      <div>{value === undefined ? '-' : value}</div>
      <strong>{title}</strong>
    </div>
  );
}

export function FieldSet({
  children,
  secondary,
}: {
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return (
    <div className={classNames(styles.fieldset, secondary && styles.secondary)}>
      {children}
    </div>
  );
}
