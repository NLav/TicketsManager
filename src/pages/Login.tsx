import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../components/Form/Login Form';
import { IButton } from '../types/buttons';
import { IInput } from '../types/inputs';
import { IUser } from '../types/user';
import { LoginContext } from '../Context/loginContext';
import { LoginContextType } from '../types/login';
import axios from 'axios';
import style from './Pages.module.scss';
import config from '../config/api.json';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setIsLogged, setUserId, setUserName, setUserIsAdmin } = React.useContext(
    LoginContext
  ) as LoginContextType;

  const inputs: IInput[] = [
    {
      label: 'Email',
      type: 'text',
      name: 'email',
      value: email,
      setValue: (email) => setEmail(email),
      id: 'email',
      placeholder: 'Insira o e-mail cadastrado',
      required: false,
    },
    {
      label: 'Senha',
      type: 'password',
      name: 'password',
      value: password,
      setValue: (password) => setPassword(password),
      id: 'password',
      placeholder: 'Insira a senha',
      required: false,
    },
  ];

  const buttons: IButton[] = [
    {
      type: 'button',
      onClick: () => AuthenticateUser(email, password),
      children: 'Entrar',
      color: 'green',
    },
  ];

  const LoginCallback = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        AuthenticateUser(email, password);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email, password]
  );

  useEffect(() => {
    localStorage.removeItem('isLogged');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userIsAdmin');

    document.addEventListener('keydown', LoginCallback);

    return () => {
      document.removeEventListener('keydown', LoginCallback);
    };
  }, [LoginCallback]);

  function AuthenticateUser(email: string, password: string) {
    if (email === '' || password === '') {
      setError(true);
    } else {
      setLoading(true);
      axios
        .get(config.api.url + 'users')
        .then((res) => {
          const validUser = res.data.find((obj: IUser) => {
            setUserId(obj.id);
            setUserName(obj.name);
            setUserIsAdmin(obj.admin ? true : false);
            localStorage.setItem('userId', obj.id);
            localStorage.setItem('userName', obj.name);
            localStorage.setItem('userIsAdmin', obj.admin ? 'true' : 'false');

            return (
              obj.email === email &&
              (obj.password === password ||
                (obj.tempPassword === password && Date.now() - obj.tempPasswordTime <= 1800000))
            );
          });

          if (validUser) {
            setIsLogged(true);
            localStorage.setItem('isLogged', 'true');

            validUser.password === password
              ? navigate('/gerenciadordechamados/home')
              : navigate('/gerenciadordechamados/mudarsenha');
          } else {
            setError(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  }

  return (
    <div>
      {loading ? (
        <div className={style.loadingDiv}>
          <img
            src='/gerenciadordechamados/assets/loading.png'
            className={style.loading}
            alt='loading'
          />
        </div>
      ) : null}
      <div className={`${style.AppStyle} ${style.LoginStyle}`}>
        <LoginForm buttons={buttons} inputs={inputs} error={error} setError={setError} />
        {error && (email === '' || password === '') ? (
          <div className={`${style.container} ${style.divError}`}>
            <label>Preencha todos os campos!</label>
          </div>
        ) : error ? (
          <div className={`${style.container} ${style.divError}`}>
            <label>E-mail e/ou Senha inválida</label>
          </div>
        ) : null}
      </div>
    </div>
  );
}
