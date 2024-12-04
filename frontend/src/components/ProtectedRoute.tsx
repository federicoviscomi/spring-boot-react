import React, { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { useMyContext } from "../store/AppContext";

export interface ProtectedRouteProps {
  children: ReactElement;
  adminPage?: boolean;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  adminPage = false,
}) => {
  const { token, isAdmin } = useMyContext();
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (token && adminPage && !isAdmin) {
    return <Navigate to="/access-denied" />;
  }
  return children;
};

export default ProtectedRoute;
