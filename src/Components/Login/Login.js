import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginCreate from './LoginCreate';
import LoginForm from './LoginForm';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Login.module.css';
import NotFound from '../NotFound';
import Loading from '../Helper/Loading';

const Login = () => {
  const { data, loading } = useSelector((state) => state.user);
  if (loading) return <Loading />;
  if (data) return <Navigate to="/conta" />;
  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        {/* Esse componente faz as nested routes do Login, como: Cadastrar novo Login e Perdeu a Senha e Resetar senha */}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          {/* Login criar só aparece quando clickamos no Link to="criar" porque tem uma configuração onde no App.js
        onde deve-se colocar /login/* para indicar que a rota tem subrotas */}
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
};

export default Login;
