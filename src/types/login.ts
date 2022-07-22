export type LoginContextType = {
  isLogged: boolean;
  setIsLogged: (isLogged: boolean) => void;
  userId: string;
  setUserId: (userId: string) => void;
  userName: string;
  setUserName: (userId: string) => void;
  userIsAdmin: boolean;
  setUserIsAdmin: (userIsAdmin: boolean) => void;
};
