import React, {createContext, FC, PropsWithChildren, useContext, useEffect, useState} from "react";
import api from "../services/api";
import toast from "react-hot-toast";

interface ContextInterface {
}

const ContextApi = createContext<ContextInterface>({});

export const ContextProvider: FC<PropsWithChildren> = ({children}) => {
    const localStorageJwtToken = localStorage.getItem("JWT_TOKEN");
    const [token, setToken] = useState(
        localStorageJwtToken ? JSON.stringify(localStorageJwtToken) : null
    );
    const [currentUser, setCurrentUser] = useState(null);
    const [openSidebar, setOpenSidebar] = useState(true);
    const localStorageIsAdmin = localStorage.getItem("IS_ADMIN");
    const [isAdmin, setIsAdmin] = useState(
        localStorageIsAdmin ? JSON.stringify(localStorageIsAdmin) : false
    );

    const fetchUser = async () => {
        const localStorageUser = localStorage.getItem("USER");
        if (!localStorageUser) {
            return;
        }
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
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

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

export const useMyContext = () => {
    return useContext(ContextApi);
};
