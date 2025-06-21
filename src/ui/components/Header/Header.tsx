import { NavLink, useLocation } from 'react-router-dom';
import styles from './Header.module.css';

import logo from '/logo.svg';

import upload from '/upload.svg';
import plus from '/plus.svg';
import history from '/history.svg';
import classNames from 'classnames';

export default function Header() {
  const location = useLocation();

  const links = [
    { id: 1, text: 'CSV-аналитик', to: '/', icon: upload },
    { id: 2, text: 'CSV-генератор', to: '/generate', icon: plus },
    { id: 3, text: 'История', to: '/history', icon: history },
  ];

  function Logo() {
    return <img src={logo} width={268} height={59} alt="logo" />;
  }

  function Name() {
    return <div className={styles.name}>Межгалактическая аналитика</div>;
  }

  function Group({ children }: { children: React.ReactNode }) {
    return <div className={styles.group}>{children}</div>;
  }

  return (
    <div className={styles.header}>
      <Group>
        <Logo></Logo>
        <Name></Name>
      </Group>
      <Group>
        {links.map((link) => (
          <NavLink
            className={({ isActive }) =>
              classNames(styles.link, isActive && styles.active)
            }
            key={link.id}
            to={link.to}
          >
            <img src={link.icon} alt={link.text} width={20} height={20} />
            <span>{link.text}</span>
          </NavLink>
        ))}
      </Group>
    </div>
  );
}
