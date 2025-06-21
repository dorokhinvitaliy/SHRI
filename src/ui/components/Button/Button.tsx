import classNames from 'classnames';
import styles from './Button.module.css';
import type { ButtonProperties } from './Button.types';

export default function Button({
  children,
  className,
  inactive,
  clear,
  download,
  ...props
}: ButtonProperties) {
  return (
    <button
      className={classNames(
        styles.button,
        inactive && styles.inactive,
        clear && styles.clear,
        download && styles.download,
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Buttons({ children }: { children: React.ReactNode }) {
  return <div className={styles.buttons}>{children}</div>;
}
