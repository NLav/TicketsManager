import React, { useCallback, useEffect } from 'react';
import { IButton } from '../../../types/buttons';
import { Button } from '../../Button';
import style from './UserPopup.module.scss';

interface Props {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  buttons: IButton[];
  id: string;
  email: string;
  setEmail: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  admin: boolean;
  setAdmin: (value: boolean) => void;
  error: boolean;
  setError: (value: boolean) => void;
}

export function UserPopup({
  trigger,
  setTrigger,
  buttons,
  id,
  email,
  setEmail,
  name,
  setName,
  password,
  setPassword,
  company,
  setCompany,
  admin,
  setAdmin,
  error,
  setError,
}: Props) {
  const ClosePopupEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTrigger(false);
      }
    },
    [setTrigger]
  );

  useEffect(() => {
    document.addEventListener('keydown', ClosePopupEsc);

    return () => {
      document.removeEventListener('keydown', ClosePopupEsc);
    };
  }, [ClosePopupEsc]);

  return trigger ? (
    <div className={style.popup}>
      <form>
        <label htmlFor='id'>ID</label>
        <input
          className={style.inputId}
          type='text'
          name='id'
          value={id}
          id='id'
          required
          readOnly
        />

        <label htmlFor='email'>E-mail</label>
        <input
          className={error ? style.inputError : ''}
          type='text'
          name='email'
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (setError) setError(false);
          }}
          id='email'
          required
        />

        <label htmlFor='name'>Nome</label>
        <input
          className={error ? style.inputError : ''}
          type='text'
          name='name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (setError) setError(false);
          }}
          id='name'
          required
        />

        <label htmlFor='company'>Senha</label>
        <input
          className={error ? style.inputError : ''}
          type='text'
          name='password'
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (setError) setError(false);
          }}
          id='password'
          required
        />

        <label htmlFor='company'>Empresa</label>
        <select
          className={error ? style.inputError : ''}
          name={'company'}
          value={company}
          onChange={(e) => {
            setCompany(e.target.value);
            if (setError) setError(false);
          }}
          id={'company'}
        >
          <option key='Não selecionada' value='Não selecionada'>
            Não selecionada
          </option>
          <option key='Angélico Advogados' value='Angélico Advogados'>
            Angélico Advogados
          </option>
          <option key='Therma' value='Therma'>
            Therma
          </option>
          <option key='Soares & Ramirez' value='Soares & Ramirez'>
            Soares & Ramirez
          </option>
        </select>

        <span>
          <input
            className={error ? style.inputError : ''}
            type='checkbox'
            name='checkbox'
            checked={admin}
            onChange={(e) => {
              setAdmin(e.target.checked);
              if (setError) setError(false);
            }}
            id={id}
          />
          <label id={id}> Admin </label>
        </span>

        <div className={style.container}>
          <Button buttons={buttons} />
        </div>
      </form>
    </div>
  ) : null;
}
