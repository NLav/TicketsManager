import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Form } from '../components/Form/index';
import { Navbar } from '../components/Navbar';
import { LoginContext } from '../Context/loginContext';
import { IButton } from '../types/buttons';
import { IInput } from '../types/inputs';
import { LoginContextType } from '../types/login';
import { ISelect } from '../types/selects';
import { ITextArea } from '../types/textareas';
import configAPI from '../config/api.json';
import configAPP from '../config/app.json';
import style from './Pages.module.scss';

export function Ticket() {
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Aguardando');
  const [error, setError] = useState(false);

  const { userId } = useContext(LoginContext) as LoginContextType;

  const inputs: IInput[] = [
    {
      label: 'Assunto',
      type: 'text',
      name: 'subject',
      value: subject,
      setValue: (subject) => setSubject(subject),
      id: 'subject',
      placeholder: 'Assunto do chamado',
      required: true,
    },
  ];

  const selects: ISelect[] = [
    {
      label: 'Prioridade',
      name: 'priority',
      value: priority,
      setValue: (priority) => setPriority(priority),
      id: 'priority',
      options: ['Baixa', 'Média', 'Alta'],
    },
  ];

  const textareas: ITextArea[] = [
    {
      label: `Descrição (${description.length}/${configAPP.textarea.characterLimit} caracteres)`,
      name: 'description',
      value: description,
      setValue: (description) => setDescription(description),
      id: 'description',
      placeholder: 'Descreva o problema',
      rows: 15,
      required: true,
    },
  ];

  const buttons: IButton[] = [
    {
      type: 'button',
      onClick: () => createTicket(subject, priority, description, status),
      children: 'Enviar',
      color: 'default',
    },
  ];

  function createTicket(subject: string, priority: string, description: string, status: string) {
    if (subject !== '' && description !== '') {
      Swal.fire({
        title: 'Chamado criado',
        text: 'O chamado foi criado!',
        icon: 'success',
        background: '#7687a1',
        color: '#f0f0f0',
      }).then(() => {
        axios
          .post(configAPI.api.url + 'tickets', {
            subject: subject,
            priority: priority,
            description: description,
            status: status,
            userId: userId,
          })
          .then((res) => {
            setSubject('');
            setPriority('Baixa');
            setDescription('');
            setStatus('Aguardando');
          })
          .catch((err) => alert(err));
      });
    } else {
      setError(true);
    }
  }

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={style.AppStyle}>
        <Form
          pageTitle='Novo chamado'
          buttons={buttons}
          inputs={inputs}
          textareas={textareas}
          selects={selects}
          error={error}
          setError={setError}
        />
      </div>
    </>
  );
}
