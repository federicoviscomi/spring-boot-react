import {createContext, useContext} from "react";

export interface AppContextInterface {
    token: string | null;
    setToken: (token: string | null) => void;
    currentUser: any;
    setCurrentUser: any;
    openSidebar: any;
    setOpenSidebar: any;
    isAdmin: boolean;
    setIsAdmin: any;
}

export const AppContext = createContext({} as AppContextInterface);

export const useMyContext = () => {
    return useContext(AppContext);
};
