import { Navigate, Outlet } from "react-router-dom";
import { useMyContext } from "../store/AppContext";

const ProtectedRoute = () => {
  const { token } = useMyContext();
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
