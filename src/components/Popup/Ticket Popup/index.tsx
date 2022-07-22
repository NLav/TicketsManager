import React, { useCallback, useEffect, useState } from 'react';
import { LoginContext } from '../../../Context/loginContext';
import { IButton } from '../../../types/buttons';
import { LoginContextType } from '../../../types/login';
import { Button } from '../../Button';
import configAPP from '../../../config/app.json';
import style from './TicketPopup.module.scss';

interface Props {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  buttons: IButton[];
  id: string;
  userId: number;
  userEmail: string;
  subject: string;
  setSubject: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  description: string;
  setDescription: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  error: boolean;
  setError: (value: boolean) => void;
}

export function TicketPopup({
  trigger,
  setTrigger,
  buttons,
  id,
  userId,
  userEmail,
  subject,
  setSubject,
  priority,
  setPriority,
  description,
  setDescription,
  status,
  setStatus,
  error,
  setError,
}: Props) {
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const { userIsAdmin } = React.useContext(LoginContext) as LoginContextType;

  const ClosePopupEsc = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setTrigger(false);
      }
    },
    [setTrigger]
  );

  useEffect(() => {
    function handleWindowResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener('resize', handleWindowResize);
    document.addEventListener('keydown', ClosePopupEsc);

    return () => {
      document.removeEventListener('keydown', ClosePopupEsc);
    };
  }, [ClosePopupEsc]);

  return trigger ? (
    <div className={userIsAdmin ? style.popup : `${style.popup} ${style.popupUser}`}>
      <form>
        <label htmlFor='id'>ID do chamado</label>
        <input
          className={style.inputTicketId}
          type='text'
          name='id'
          value={id}
          id='id'
          required
          readOnly
        />
        <div className={style.divUser}>
          <div className={style.divUserId}>
            <label htmlFor='id'>ID do usuário</label>
            <input
              className={style.inputUserId}
              type='text'
              name='userId'
              value={userId}
              id='userId'
              required
              readOnly
            />
          </div>
          <div className={style.divUserEmail}>
            <label htmlFor='id'>E-mail do usuário</label>
            <input
              className={style.inputUserEmail}
              type='text'
              name='userEmail'
              value={userEmail}
              id='userEmail'
              required
              readOnly
            />
          </div>
        </div>
        <label htmlFor='subject'>Assunto</label>
        <input
          className={error ? style.inputError : ''}
          type='text'
          name='subject'
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
            if (setError) setError(false);
          }}
          id='subject'
          required
          readOnly={!userIsAdmin}
        />

        <label htmlFor='priority'>Prioridade</label>
        <select
          className={error ? style.inputError : ''}
          name={'priority'}
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value);
            if (setError) setError(false);
          }}
          id={'priority'}
          disabled={!userIsAdmin}
        >
          <option key='Baixa' value='Baixa'>
            Baixa
          </option>
          <option key='Média' value='Média'>
            Média
          </option>
          <option key='Alta' value='Alta'>
            Alta
          </option>
        </select>

        <label htmlFor='status'>Status</label>
        <select
          className={error ? style.inputError : ''}
          name={'status'}
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            if (setError) setError(false);
          }}
          id={'status'}
          disabled={!userIsAdmin}
        >
          <option key='Aguardando' value='Aguardando'>
            Aguardando
          </option>
          <option key='Em andamento' value='Em andamento'>
            Em andamento
          </option>
          <option key='Finalizado' value='Finalizado'>
            Finalizado
          </option>
          <option key='Cancelado' value='Cancelado'>
            Cancelado
          </option>
        </select>

        <label htmlFor='description'>
          {userIsAdmin
            ? `Descrição(${description.length} / ${configAPP.textarea.characterLimit} caracteres)`
            : 'Descrição'}
        </label>
        <textarea
          className={error ? style.inputError : ''}
          name='description'
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            if (setError) setError(false);
          }}
          id='description'
          rows={windowHeight >= 700 ? 15 : 5}
          required
          readOnly={!userIsAdmin}
        />
        <div className={style.container}>
          <Button buttons={buttons} />
        </div>
      </form>
    </div>
  ) : null;
}
