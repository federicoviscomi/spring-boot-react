import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useMyContext } from "../store/AppContext";

interface ProtectedRouteProps {
  children: ReactElement;
}

const AuthenticatedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useMyContext();
  if (!token) {
    return <Navigate to="/" />;
  }
  return children;
};

export default AuthenticatedRoute;
