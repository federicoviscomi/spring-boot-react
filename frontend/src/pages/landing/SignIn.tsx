import { FC, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import { Box, Button, TextField } from '@mui/material';

import { useMyContext } from '../../store/AppContext.ts';
import { SignInResponse } from '../../types/signIn.ts';
import { postSignIn } from '../../services';

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setToken, token } = useMyContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSuccessfulSignIn = async (signInResponse: SignInResponse) => {
    const jwtPayload = jwtDecode(signInResponse.jwtToken);
    const user = {
      username: jwtPayload.sub,
      roles: signInResponse.roles,
    };
    localStorage.setItem('JWT_TOKEN', signInResponse.jwtToken);
    localStorage.setItem('USER', JSON.stringify(user));
    setToken(signInResponse.jwtToken);
    await navigate('/notes');
  };

  const signIn = async () => {
    try {
      setLoading(true);
      const response = await postSignIn(username, password);
      if (response.status === 200 && response.data.jwtToken) {
        await handleSuccessfulSignIn(response.data);
      } else {
        toast.error(
          'SignIn failed. Please check your credentials and try again.',
          { duration: 3000 }
        );
      }
    } catch (error) {
      toast.error(
        'SignIn failed. Please check your credentials and try again.',
        { duration: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  return (
    <div>
      <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Username"
          required
          id="username"
          type="text"
          placeholder="type your username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <TextField
          label="Password"
          required
          id="password"
          type="password"
          placeholder="type your password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button
          id="sign-in-button"
          variant="contained"
          color="primary"
          fullWidth
          onClick={signIn}
          disabled={loading}
        >
          Sign In
        </Button>
      </Box>
      <Link className="underline hover:text-black" to="/forgot-password">
        Forgot Password?
      </Link>
    </div>
  );
};

export default SignIn;
