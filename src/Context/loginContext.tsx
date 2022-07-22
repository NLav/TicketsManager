import React, { useState } from 'react';
import { LoginContextType } from '../types/login';

interface Props {
  children: React.ReactNode;
}

export const LoginContext = React.createContext<LoginContextType | null>(null);

const localIsLogged = localStorage.getItem('isLogged');
const localUserId = localStorage.getItem('userId');
const localUserName = localStorage.getItem('userName');
const localUserIsAdmin = localStorage.getItem('userIsAdmin');

export const LoginProvider: React.FC<Props> = ({ children }) => {
  const [isLogged, setIsLogged] = useState<boolean>(localIsLogged === 'true' ? true : false);
  const [userId, setUserId] = useState<string>(
    localUserId ? (localUserId.length > 0 ? localUserId : '') : ''
  );
  const [userName, setUserName] = useState<string>(
    localUserName ? (localUserName.length > 0 ? localUserName : '') : ''
  );
  const [userIsAdmin, setUserIsAdmin] = useState<boolean>(
    localUserIsAdmin === 'true' ? true : false
  );

  return (
    <LoginContext.Provider
      value={{
        isLogged,
        setIsLogged,
        userId,
        setUserId,
        userName,
        setUserName,
        userIsAdmin,
        setUserIsAdmin,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
