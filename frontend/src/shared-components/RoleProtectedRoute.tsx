import { Navigate, Outlet } from 'react-router-dom';
import { AppRole } from '../types/role';
import { FC } from 'react';
import { useMyContext } from '../store/AppContext';

interface RoleProtectedRouteProps {
  allowedRoles: AppRole[];
}

const RoleProtectedRoute: FC<RoleProtectedRouteProps> = ({ allowedRoles }) => {
  const { currentUser } = useMyContext();
  if (currentUser?.roles.some((role) => allowedRoles.includes(role))) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default RoleProtectedRoute;
