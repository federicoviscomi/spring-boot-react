import { useMyContext } from '../../store/AppContext.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignOut = () => {
  const navigate = useNavigate();

  const { setToken, setCurrentUser, setIsAdmin } = useMyContext();

  useEffect(() => {
    localStorage.removeItem('JWT_TOKEN');
    localStorage.removeItem('USER');
    localStorage.removeItem('CSRF_TOKEN');
    localStorage.removeItem('IS_ADMIN');
    setToken(undefined);
    setCurrentUser(undefined);
    setIsAdmin(false);
    navigate('/');
  }, [navigate, setCurrentUser, setIsAdmin, setToken]);

  return <div>Signing out...</div>;
};

export default SignOut;
