import React, { useEffect, useState } from 'react';
import { TicketTable } from '../components/Table/Ticket Table';
import { Navbar } from '../components/Navbar';
import { ITicket } from '../types/tickets';
import style from './Pages.module.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../config/api.json';
import { IButton } from '../types/buttons';
import { TicketPopup } from '../components/Popup/Ticket Popup';
import { LoginContext } from '../Context/loginContext';
import { LoginContextType } from '../types/login';

export function TicketList() {
  const [data, setData] = useState<ITicket[]>([]);
  const [deleted, setDeleted] = useState(false);
  const [triggerEditTicket, setTriggerEditTicket] = useState(false);
  const [id, setId] = useState('');
  const [userId, setUserId] = useState(0);
  const [userEmail, setUserEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Baixa');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const { userIsAdmin } = React.useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    axios.get(config.api.url + 'tickets').then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [deleted, triggerEditTicket]);

  function updateTicket() {
    Swal.fire({
      title: 'Tem certeza que deseja atualizar os dados?',
      text: 'Essa ação é irreversível!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, atualizar!',
      confirmButtonColor: '#3085d6',
      background: '#7687a1',
      color: '#f0f0f0',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(config.api.url + `tickets/${id}`, {
            subject: subject,
            priority: priority,
            description: description,
            status: status,
          })
          .then((res) => {
            Swal.fire({
              title: 'Atualizado!',
              text: 'O chamado foi atualizado',
              icon: 'success',
              background: '#7687a1',
              color: '#f0f0f0',
            });
            setTriggerEditTicket(false);
          })
          .catch((err) => alert('Erro!' + err.message));
      }
    });
  }

  function deleteTicket(id: string) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Essa ação é irreversível!',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Sim, apagar!',
      cancelButtonColor: '#d33',
      background: '#7687a1',
      color: '#f0f0f0',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Apagado!',
          text: 'O chamado foi removido',
          icon: 'success',
          background: '#7687a1',
          color: '#f0f0f0',
        });
        axios.delete(config.api.url + `tickets/${id}`).then((res) => setDeleted(res.data.id));
      }
    });
  }

  function editTicket(id: string) {
    axios.get(config.api.url + `tickets/${id}`).then((res) => {
      setId(res.data.id);
      setUserId(res.data.userId);
      setSubject(res.data.subject);
      setPriority(res.data.priority);
      setDescription(res.data.description);
      setStatus(res.data.status);
      setTriggerEditTicket(true);

      axios.get(config.api.url + `users/${res.data.userId}`).then((res) => {
        setUserEmail(res.data.email);
      });
    });
  }

  const buttonsAdmin: IButton[] = [
    {
      type: 'button',
      onClick: () => updateTicket(),
      children: 'Atualizar',
      color: 'green',
    },
    {
      type: 'button',
      onClick: () => setTriggerEditTicket(false),
      children: 'Cancelar',
      color: 'red',
    },
  ];

  const buttonsUser: IButton[] = [
    {
      type: 'button',
      onClick: () => setTriggerEditTicket(false),
      children: 'Voltar',
      color: 'default',
    },
  ];

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
      <div>
        <Navbar />
      </div>
      <div className={style.AppStyle}>
        <label>Lista de chamados</label>
        <div className={style.container}>
          <TicketTable data={data} editTicket={editTicket} deleteTicket={deleteTicket} />

          <TicketPopup
            trigger={triggerEditTicket}
            setTrigger={setTriggerEditTicket}
            buttons={userIsAdmin ? buttonsAdmin : buttonsUser}
            id={id}
            userId={userId}
            userEmail={userEmail}
            subject={subject}
            setSubject={setSubject}
            priority={priority}
            setPriority={setPriority}
            description={description}
            status={status}
            setStatus={setStatus}
            setDescription={setDescription}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </>
  );
}
