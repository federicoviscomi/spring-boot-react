import { createContext, useContext } from 'react';
import { UserInfoResponse } from '../types/user';

export interface AppContextInterface {
  token: string | undefined;
  setToken: (token: string | undefined) => void;
  currentUser: UserInfoResponse | undefined;
  setCurrentUser: (currentUser: UserInfoResponse | undefined) => void;
  openSidebar: boolean;
  setOpenSidebar: (openSidebar: boolean) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const AppContext = createContext({} as AppContextInterface);

export const useMyContext = () => useContext(AppContext);
