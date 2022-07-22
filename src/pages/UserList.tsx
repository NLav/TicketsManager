import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { IUser } from '../types/user';
import { UserTable } from '../components/Table/User Table';
import { UserPopup } from '../components/Popup/User Popup';
import { IButton } from '../types/buttons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../config/api.json';
import style from './Pages.module.scss';

export function UserList() {
  const [data, setData] = useState<IUser[]>([]);
  const [deleted, setDeleted] = useState<string>('');
  const [triggerEditUser, setTriggerEditUser] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [company, setCompany] = useState<string>('');
  const [admin, setAdmin] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(config.api.url + 'users').then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [deleted, triggerEditUser]);

  function updateUser() {
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
        Swal.fire({
          title: 'Atualizado!',
          text: 'A conta de usuário foi atualizada',
          icon: 'success',
          background: '#7687a1',
          color: '#f0f0f0',
        });
        axios
          .put(config.api.url + `users/${id}`, {
            email: email,
            name: name,
            password: password,
            company: company,
            admin: admin,
          })
          .then((res) => {
            setTriggerEditUser(false);
          })
          .catch((err) => alert('Erro!' + err.message));
      }
    });
  }

  function deleteUser(id: string) {
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
          text: 'A conta de usuário foi removida',
          icon: 'success',
          background: '#7687a1',
          color: '#f0f0f0',
        });
        axios.delete(config.api.url + `users/${id}`).then((res) => setDeleted(res.data.id));
      }
    });
  }

  function editUser(id: string) {
    axios.get(config.api.url + `users/${id}`).then((res) => {
      setId(res.data.id);
      setEmail(res.data.email);
      setName(res.data.name);
      setPassword(res.data.password);
      setCompany(res.data.company);
      setAdmin(res.data.admin);
      setTriggerEditUser(true);
    });
  }

  const buttons: IButton[] = [
    {
      type: 'button',
      onClick: () => updateUser(),
      children: 'Atualizar',
      color: 'green',
    },
    {
      type: 'button',
      onClick: () => setTriggerEditUser(false),
      children: 'Cancelar',
      color: 'red',
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
        <div className={style.header}>
          <div>
            <label>Lista de usuários</label>
          </div>
          <div className={style.divButton}>
            <button
              className={style.novoUsuario}
              onClick={() => navigate('/gerenciadordechamados/novousuario')}
            >
              Novo Usuário
            </button>
          </div>
        </div>
        <div className={style.container}>
          <UserTable data={data} editUser={editUser} deleteUser={deleteUser} />
          <UserPopup
            trigger={triggerEditUser}
            setTrigger={setTriggerEditUser}
            buttons={buttons}
            id={id}
            email={email}
            setEmail={setEmail}
            name={name}
            setName={setName}
            password={password}
            setPassword={setPassword}
            company={company}
            setCompany={setCompany}
            admin={admin}
            setAdmin={setAdmin}
            error={error}
            setError={setError}
          />
        </div>
      </div>
    </>
  );
}
