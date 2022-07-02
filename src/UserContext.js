import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';
export const UserContext = React.createContext();

// O UserStorage vai ser o elemento que eu tenho que envolver todos os outros elementos
// que terão acesso ao contexto desse elemento aqui

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  // Estado que verifica se o usuário está logado ou não
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  const userLogout = React.useCallback(
    async function userLogout() {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      const { url, options } = TOKEN_POST({ username, password });
      const tokenRes = await fetch(url, options);
      console.log(tokenRes);
      if (!tokenRes.ok)
        throw new Error(`Erro:${tokenRes.statusText} Usuário Inválido`);
      const json = await tokenRes.json();
      console.log(json);
      window.localStorage.setItem('token', json.token);
      await getUser(json.token);
      navigate('/conta');
    } catch (error) {
      setError(error.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (error) {
          userLogout();
        } finally {
          setLoading(false);
        }
      }
    }
    autoLogin();
  }, [userLogout]);

  return (
    // Prover a informação com .Provider
    // Para envolver os outros elementos eu preciso envolver o children
    // Usaremos o User Storage inicialmente no nosso App
    // Envolvendo o App com o UserStorage é o primeiro passo
    // Agora como passamos a informação pra baixo? Para se ter acesso nos componentes dentro de UserStorage no App, como Header e etc.
    // Temos que definir o Value no User Context onde passamos um objeto, no caso, aqui estamos passando uma função que pode ser acionada
    // em qualquer lugar onde esteja o userContext, e também o data, estado reativo que recebe os dados do Fetch
    //
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
    // Com isso Podemos Atribuir esse elemento a função de fazer login
  );
};
