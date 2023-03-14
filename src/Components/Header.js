import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Dogs } from '../Assets/dogs.svg';
import styles from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
const Header = () => {
  const { data } = useSelector((state) => state.user);
  return (
    <header className={styles.header}>
      <nav className={`container ${styles.nav}`}>
        <Link className={styles.logo} to="/">
          <Dogs aria-label="Dogs - Home" />
        </Link>
        {data ? (
          <Link className={styles.login} to="/conta">
            {data.nome}
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
