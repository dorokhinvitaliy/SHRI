export type ButtonProperties = {
  children: React.ReactNode;
  className?: string;
  inactive?: boolean;
  clear?: boolean;
  download?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
