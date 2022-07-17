import React from 'react';
import useForm from '../../Hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_LOST } from '../../api';
import Error from '../Helper/Error';
const LoginPasswordLost = () => {
  const login = useForm();
  const { data, loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefaut();
    if (login.validate()) {
      const { url, options } = PASSWORD_LOST({
        login: login.value,
        url: 'http://localhost:3000/login/perdeu',
      });
      const { json } = await request(url, options);
    }
  }
  return (
    <section>
      <h1 className="title">Perdeu a senha?</h1>
      {data ? (
        <p style={{ color: '#4c1' }}>{data}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Input label="Email / Usuário" type="text" name="login" {...login} />
          {loading ? (
            <Button disabled>Enviando...</Button>
          ) : (
            <Button>Enviar E-mail</Button>
          )}
        </form>
      )}

      <Error error={error}></Error>
    </section>
  );
};

export default LoginPasswordLost;
