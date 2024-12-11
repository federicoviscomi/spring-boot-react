import {FC, PropsWithChildren, useEffect, useState} from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import {AppContext} from "./AppContext";
import {UserInfoResponse} from "../types/user";
import {AppRole} from "../types/role";

export const AppContextProvider: FC<PropsWithChildren> = ({children}) => {
    const localStorageJwtToken = localStorage.getItem("JWT_TOKEN");
    const [token, setToken] = useState<string | undefined>(
        localStorageJwtToken ? JSON.stringify(localStorageJwtToken) : undefined,
    );
    const [currentUser, setCurrentUser] = useState<UserInfoResponse | undefined>(
        undefined,
    );
    const [openSidebar, setOpenSidebar] = useState(true);
    const localStorageIsAdmin = localStorage.getItem("IS_ADMIN");

    const [isAdmin, setIsAdmin] = useState<boolean>(
        localStorageIsAdmin
            ? JSON.stringify(localStorageIsAdmin).toLowerCase() === "true"
            : false,
    );

    const fetchUser = async () => {
        const localStorageUser = localStorage.getItem("USER");
        if (!localStorageUser) {
            return;
        }
        const user = JSON.parse(localStorageUser);
        if (user?.username) {
            try {
                const {data} = await api.get<UserInfoResponse>("/auth/user");
                const roles = data.roles;

                if (roles.includes(AppRole.ROLE_ADMIN)) {
                    localStorage.setItem("IS_ADMIN", JSON.stringify(true));
                    setIsAdmin(true);
                } else {
                    localStorage.removeItem("IS_ADMIN");
                    setIsAdmin(false);
                }
                setCurrentUser(data);
            } catch (error) {
                toast.error("Error fetching current user " + error);
            }
        }
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    return (
        <AppContext.Provider
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
        </AppContext.Provider>
    );
};
