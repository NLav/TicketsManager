import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './pages/Login';
import { User } from './pages/User';
import { Ticket } from './pages/Ticket';
import { Home } from './pages/Home';
import { TicketList } from './pages/TicketList';
import { UserList } from './pages/UserList';
import { LoginContext } from './Context/loginContext';
import { LoginContextType } from './types/login';
import { ForgotPassword } from './pages/ForgotPassword';
import { ChangePassword } from './pages/ChangePassword';

function App() {
  const { isLogged, userIsAdmin } = React.useContext(LoginContext) as LoginContextType;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/gerenciadordechamados' element={<Login />} />
        <Route path='/gerenciadordechamados/novousuario' element={<User />} />
        <Route path='/gerenciadordechamados/esquecisenha' element={<ForgotPassword />} />
        <Route
          path='/gerenciadordechamados/mudarsenha'
          element={isLogged ? <ChangePassword /> : <Login />}
        />
        <Route path='/gerenciadordechamados/home' element={isLogged ? <Home /> : <Login />} />
        <Route
          path='/gerenciadordechamados/novochamado'
          element={isLogged ? <Ticket /> : <Login />}
        />
        <Route
          path='/gerenciadordechamados/consultarchamados'
          element={isLogged ? <TicketList /> : <Login />}
        />
        <Route
          path='/gerenciadordechamados/consultarusuarios'
          element={isLogged ? userIsAdmin ? <UserList /> : <Home /> : <Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
