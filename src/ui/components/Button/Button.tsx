type ButtonProperties = {
  children: React.ReactNode;
  className?: string;
  inactive?: boolean;
  clear?: boolean;
  download?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

import classNames from 'classnames';

import styles from './Button.module.css';

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
