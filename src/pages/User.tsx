import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form } from '../components/Form';
import { IButton } from '../types/buttons';
import { IInput } from '../types/inputs';
import { ISelect } from '../types/selects';
import { ICheckbox } from '../types/checkboxes';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../config/api.json';
import style from './Pages.module.scss';

export function User() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('Não selecionado');
  const [admin, setAdmin] = useState(false);
  const [error, setError] = useState(false);

  const localIsLogged = localStorage.getItem('isLogged');
  const localUserIsAdmin = localStorage.getItem('userIsAdmin');

  const navigate = useNavigate();

  const inputs: IInput[] = [
    {
      label: 'Email',
      type: 'text',
      name: 'email',
      value: email,
      setValue: (email) => setEmail(email),
      id: 'email',
      placeholder: 'Insira seu e-mail empresarial',
      required: true,
    },
    {
      label: 'Nome',
      type: 'text',
      name: 'name',
      value: name,
      setValue: (name) => setName(name),
      id: 'name',
      placeholder: 'Insira seu nome completo',
      required: true,
    },
    {
      label: 'Senha',
      type: 'password',
      name: 'password',
      value: password,
      setValue: (password) => setPassword(password),
      id: 'password',
      placeholder: 'Insira uma senha',
      required: true,
    },
  ];

  const selects: ISelect[] = [
    {
      label: 'Empresa',
      name: 'company',
      value: company,
      setValue: (company) => setCompany(company),
      id: 'company',
      options: ['Não selecionada', 'Angélico Advogados', 'Therma', 'Soares & Ramirez'],
    },
  ];

  const checkboxes: ICheckbox[] = [
    {
      label: 'Admin',
      name: 'admin',
      checked: admin,
      setValue: (admin) => setAdmin(admin),
      id: 'admin',
    },
  ];

  const buttons: IButton[] = [
    {
      type: 'button',
      onClick: () => createUser(email, name, password, company, admin),
      children: 'Cadastrar',
      color: 'green',
    },
    {
      type: 'button',
      onClick: () =>
        localIsLogged === 'true'
          ? navigate('/gerenciadordechamados/consultarusuarios')
          : navigate('/gerenciadordechamados'),
      children: 'Cancelar',
      color: 'red',
    },
  ];

  function createUser(
    email: string,
    name: string,
    password: string,
    company: string,
    admin: boolean
  ) {
    if (email !== '' && name !== '' && password !== '') {
      Swal.fire({
        title: 'Conta criada',
        text: 'A conta de usuário foi criada!',
        icon: 'success',
        background: '#7687a1',
        color: '#f0f0f0',
      }).then(() => {
        axios
          .post(config.api.url + 'users', {
            email: email,
            name: name,
            password: password,
            company: company,
            admin: admin,
          })
          .then((res) => {
            localIsLogged === 'true'
              ? navigate('/gerenciadordechamados/consultarusuarios')
              : navigate('/gerenciadordechamados');
          })
          .catch((err) => alert(err));
      });
    } else {
      setError(true);
    }
  }

  return (
    <div className={style.AppStyle}>
      <Form
        pageTitle='Cadastrar usuário'
        buttons={buttons}
        inputs={inputs}
        selects={localUserIsAdmin ? selects : []}
        checkboxes={localUserIsAdmin ? checkboxes : []}
        error={error}
        setError={setError}
      />
      {error ? (
        <div className={`${style.container} ${style.divError}`}>
          <label>Preencha todos os campos</label>
        </div>
      ) : null}
    </div>
  );
}
