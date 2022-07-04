import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import styles from './Header.module.css';
import { UserContext } from '../UserContext';
const Header = () => {
  // Como fazer para usar o UserContext importado e puxar o valores passado no value?
  // Através do Hook useContext
  const context = React.useContext(UserContext);
  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <Link className={styles.logo} to="/">
          <Dogs aria-label="Dogs - Home" />
        </Link>
        {context.data ? (
          <Link className={styles.login} to="/conta">
            {context.data.nome}
          </Link>
        ) : (
          <Link className={styles.login} to="/login">
            Login / Criar Login
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
