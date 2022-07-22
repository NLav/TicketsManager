import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from '../../Context/loginContext';
import { LoginContextType } from '../../types/login';
import style from './Navbar.module.scss';

export function Navbar() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [toggleNavbar, setToggleNavbar] = useState<boolean>(false);

  const { userName, userIsAdmin } = React.useContext(LoginContext) as LoginContextType;

  useEffect(() => {
    function handleWindowResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return windowWidth > 800 ? (
    <div className={style.navbar}>
      <div className={style.navbarLeft}>
        <Link to={'/gerenciadordechamados/home'}>Home</Link>
        <Link to={'/gerenciadordechamados/novochamado'}>Novo chamado</Link>
        <a href='/gerenciadordechamados/consultarchamados'>Consultar chamados</a>
        {userIsAdmin ? (
          <Link to={'/gerenciadordechamados/consultarusuarios'}>Consultar usuários</Link>
        ) : null}
        <Link to={'/gerenciadordechamados'}>Sair</Link>
      </div>
      <div className={style.navbarRight}>
        {userIsAdmin ? <label>Olá, Admin {userName}</label> : <label>Olá, {userName}</label>}
      </div>
    </div>
  ) : (
    <div className={style.reducedNavbar}>
      <div className={style.navbar}>
        <div className={style.navbarLeft}>
          <img
            onClick={() => {
              toggleNavbar ? setToggleNavbar(false) : setToggleNavbar(true);
            }}
            src='/gerenciadordechamados/assets/hamburger_menu.png'
            className={toggleNavbar ? style.imgHamburgerMenuClicked : style.imgHamburgerMenu}
            alt='hamburger-menu'
          />
        </div>
        <div className={style.navbarRight}>
          {userIsAdmin ? <label>Olá, Admin {userName}</label> : <label>Olá, {userName}</label>}
        </div>
      </div>
      <div
        className={
          toggleNavbar ? ` ${style.navbarMenu} ${style.navbarMenuExpanded} ` : style.navbarMenu
        }
      >
        <Link to={'/gerenciadordechamados/home'}>Home</Link>
        <Link to={'/gerenciadordechamados/novochamado'}>Novo chamado</Link>
        <a href='/gerenciadordechamados/consultarchamados'>Consultar chamados</a>
        {userIsAdmin ? (
          <Link to={'/gerenciadordechamados/consultarusuarios'}>Consultar usuários</Link>
        ) : null}
        <Link to={'/gerenciadordechamados'}>Sair</Link>
      </div>
    </div>
  );
}
