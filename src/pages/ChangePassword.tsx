import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { IButton } from '../types/buttons';
import { IInput } from '../types/inputs';
import axios from 'axios';
import config from '../config/api.json';
import style from './Pages.module.scss';
import Swal from 'sweetalert2';
import { LoginContext } from '../Context/loginContext';
import { LoginContextType } from '../types/login';

export function ChangePassword() {
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { userId } = React.useContext(LoginContext) as LoginContextType;

  const navigate = useNavigate();

  const inputs: IInput[] = [
    {
      label: 'Nova senha',
      type: 'password',
      name: 'newPassword',
      value: newPassword,
      setValue: (newPassword) => setNewPassword(newPassword),
      id: 'newPassword',
      placeholder: 'Digite a nova senha',
      required: true,
    },
    {
      label: 'Confirmar a nova senha',
      type: 'password',
      name: 'confirmNewPassword',
      value: confirmNewPassword,
      setValue: (confirmNewPassword) => setConfirmNewPassword(confirmNewPassword),
      id: 'confirmNewPassword',
      placeholder: 'Digite novamente a nova senha',
      required: true,
    },
  ];

  const buttons: IButton[] = [
    {
      type: 'button',
      onClick: () => ChangePassword(newPassword, confirmNewPassword),
      children: 'Confirmar',
      color: 'green',
    },
    {
      type: 'button',
      onClick: () => navigate('/gerenciadordechamados'),
      children: 'Cancelar',
      color: 'red',
    },
  ];

  const ChangePasswordCallback = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        ChangePassword(newPassword, confirmNewPassword);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [newPassword, confirmNewPassword]
  );

  useEffect(() => {
    document.addEventListener('keydown', ChangePasswordCallback);

    return () => {
      document.removeEventListener('keydown', ChangePasswordCallback);
    };
  }, [ChangePasswordCallback]);

  function ChangePassword(newPassword: string, confirmNewPassword: string) {
    setLoading(true);
    if (newPassword !== '' && confirmNewPassword !== '' && newPassword === confirmNewPassword) {
      axios
        .put(config.api.url + `users/${userId}`, {
          password: newPassword,
        })
        .then((res) => {
          setLoading(false);
          Swal.fire({
            title: 'Senha alterada!',
            text: 'A senha foi alterada! Você será redirecionado de volta para a tela de Login, onde deverá usar a nova senha para acessar a conta.',
            icon: 'success',
            background: '#7687a1',
            color: '#f0f0f0',
          }).then((res) => {
            navigate('/gerenciadordechamados');
          });
        });
    } else {
      setLoading(false);
      setError(true);
    }
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
        {error && (newPassword === '' || confirmNewPassword === '') ? (
          <div className={`${style.container} ${style.divError}`}>
            <label>Preencha todos os campos</label>
          </div>
        ) : error ? (
          <div className={`${style.container} ${style.divError}`}>
            <label>As senhas devem ser iguais!</label>
          </div>
        ) : null}
      </div>
    </>
  );
}
