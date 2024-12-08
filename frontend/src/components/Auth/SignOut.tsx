import { useMyContext } from "../../store/AppContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignOut = () => {
  const navigate = useNavigate();

  const { setToken, setCurrentUser, setIsAdmin } = useMyContext();

  const handleSignOut = () => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("USER");
    localStorage.removeItem("CSRF_TOKEN");
    localStorage.removeItem("IS_ADMIN");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
    navigate("/welcome");
  };

  useEffect(() => {
    handleSignOut();
  }, []);

  return <div>Signing out...</div>;
};

export default SignOut;
