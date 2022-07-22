import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { IButton } from '../types/buttons';
import { IInput } from '../types/inputs';
import { IUser } from '../types/user';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../config/api.json';
import style from './Pages.module.scss';

export function ForgotPassword() {
  const [email, setEmail] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const inputs: IInput[] = [
    {
      label: 'E-mail',
      type: 'text',
      name: 'email',
      value: email,
      setValue: (email) => setEmail(email),
      id: 'email',
      placeholder: 'Insira o e-mail',
      required: true,
    },
  ];

  const buttons: IButton[] = [
    {
      type: 'button',
      onClick: () => sendMail(email),
      children: 'Enviar',
      color: 'green',
    },
    {
      type: 'button',
      onClick: () => navigate('/gerenciadordechamados'),
      children: 'Voltar para o Login',
      color: 'red',
    },
  ];

  const ForgotPasswordCallback = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMail(email);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [email]
  );

  useEffect(() => {
    document.addEventListener('keydown', ForgotPasswordCallback);

    return () => {
      document.removeEventListener('keydown', ForgotPasswordCallback);
    };
  }, [ForgotPasswordCallback]);

  function sendMail(email: string) {
    if (email !== '') {
      setLoading(true);
      axios.get(config.api.url + 'users').then((res) => {
        const validUser = res.data.find((obj: IUser) => {
          return obj.email === email;
        });

        if (validUser) {
          axios
            .post(config.api.url + 'tools/sendmail', { email: email })
            .then((res) => {
              if (res.data === 'error') {
                setLoading(false);
                Swal.fire({
                  title: 'E-mail não enviado',
                  text:
                    'E-mail não enviado, tente novamente mais tarde.' +
                    '\nSe o problema persistir, entre em contato com o administrador.',
                  icon: 'error',
                  background: '#7687a1',
                  color: '#f0f0f0',
                });
              } else {
                putTempPassword(email, validUser.id, res.data);
              }
            })
            .catch((error) => alert(error));
        } else {
          setError(true);
          setLoading(false);
        }
      });
    } else {
      setError(true);
    }
  }

  function putTempPassword(email: string, userId: number, tempPassword: string) {
    axios
      .put(config.api.url + `users/${userId}`, {
        tempPassword: tempPassword,
        tempPasswordTime: Date.now(),
      })
      .then((res) => {
        setLoading(false);
        Swal.fire({
          title: 'E-mail enviado',
          text:
            `Um e-mail foi enviado para ${email} com uma senha temporária!` +
            '\nUtilize a senha temporária para entrar na conta.',
          icon: 'success',
          background: '#7687a1',
          color: '#f0f0f0',
        }).then((res) => {
          navigate('/gerenciadordechamados');
        });
      })
      .catch((err) => {
        setLoading(false);
        alert(err);
      });
  }

  return (
    <>
      {loading ? (
        <div className={style.loadingDiv}>
          <img
            src='/gerenciadordechamados/assets/loading.png'
            className={style.loading}
            alt='loading'
          />
        </div>
      ) : null}
      <div className={style.AppStyle}>
        <Form
          pageTitle='Esqueci a senha'
          buttons={buttons}
          inputs={inputs}
          error={error}
          setError={setError}
        />
        {error && email === '' ? (
          <div className={`${style.container} ${style.divError}`}>
            <label>Preencha todos os campos</label>
          </div>
        ) : error && email !== '' ? (
          <div className={`${style.container} ${style.divError}`}>
            <label>E-mail inválido</label>
          </div>
        ) : null}
      </div>
    </>
  );
}
