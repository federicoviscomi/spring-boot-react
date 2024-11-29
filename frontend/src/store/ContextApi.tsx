import React, {createContext, FC, PropsWithChildren, useContext, useState} from "react";
import {useEffect} from "react";
import api from "../services/api";
import toast from "react-hot-toast";

interface ContextInterface {
    token: any;
    setToken: any;
    currentUser: any;
    setCurrentUser: any;
    openSidebar: any;
    setOpenSidebar: any;
    isAdmin: any;
    setIsAdmin: any;
}

const ContextApi = createContext<ContextInterface>({
    currentUser: undefined,
    isAdmin: undefined,
    openSidebar: undefined,
    setCurrentUser: undefined,
    setIsAdmin: undefined,
    setOpenSidebar: undefined,
    setToken: undefined,
    token: undefined
});

export const ContextProvider: FC<PropsWithChildren> = ({children}) => {
    //store the token
    const [token, setToken] = useState((localStorage.getItem("JWT_TOKEN")
        ? JSON.stringify(localStorage.getItem("JWT_TOKEN"))
        : null));

    //store the current loggedin user
    const [currentUser, setCurrentUser] = useState(null);

    //handle sidebar opening and closing in the admin panel
    const [openSidebar, setOpenSidebar] = useState(true);

    //check the loggedin user is admin or not
    const [isAdmin, setIsAdmin] = useState((localStorage.getItem("IS_ADMIN")
        ? JSON.stringify(localStorage.getItem("IS_ADMIN"))
        : false));

    const fetchUser = async () => {
        const localStorageUser = localStorage.getItem("USER");
        if (localStorageUser) {
            const user = JSON.parse(localStorageUser);
            if (user?.username) {
                try {
                    const {data} = await api.get(`/auth/user`);
                    const roles = data.roles;

                    if (roles.includes("ROLE_ADMIN")) {
                        localStorage.setItem("IS_ADMIN", JSON.stringify(true));
                        setIsAdmin(true);
                    } else {
                        localStorage.removeItem("IS_ADMIN");
                        setIsAdmin(false);
                    }
                    setCurrentUser(data);
                } catch (error) {
                    console.error("Error fetching current user", error);
                    toast.error("Error fetching current user");
                }
            }
        }
    };

    //if  token exist fetch the current user
    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    //through context provider you are sending all the datas so that we access at anywhere in your application
    return (
        <ContextApi.Provider
            value={{
                token,
                setToken,
                currentUser,
                setCurrentUser,
                openSidebar,
                setOpenSidebar,
                isAdmin,
                setIsAdmin,
            }}
        >
            {children}
        </ContextApi.Provider>
    );
};

//by using this (useMyContext) custom hook we can reach our context provier and access the datas across our components
export const useMyContext = () => {
    const context = useContext(ContextApi);

    return context;
};
