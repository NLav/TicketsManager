import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Navbar } from '../components/Navbar';
import { IButton } from '../types/buttons';
import style from './Pages.module.scss';

export function Home() {
  const navigate = useNavigate();

  const buttons: IButton[] = [
    {
      type: 'button',
      onClick: () => navigate('/gerenciadordechamados/novochamado'),
      children: 'Novo chamado',
      color: 'default',
    },
    {
      type: 'button',
      onClick: () => window.location.assign('/gerenciadordechamados/consultarchamados'),
      children: 'Consultar chamados',
      color: 'default',
    },
  ];

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className={style.AppStyle}>
        <div className={style.container}>
          <Button buttons={buttons} />
        </div>
      </div>
    </>
  );
}
