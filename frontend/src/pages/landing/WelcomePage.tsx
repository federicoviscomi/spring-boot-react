import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useMyContext } from '../../store/AppContext.ts';
import SignIn from './SignIn.tsx';
import SignUp from './SignUp.tsx';

const WelcomePage = () => {
  const { token } = useMyContext();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  if (token) {
    navigate('/notes');
  }

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOAuthSignIn = (provider: 'google' | 'github') => {
    const urls = {
      google: '/auth/google',
      github: '/auth/github',
    };
    window.location.href = urls[provider];
  };

  return (
    <Container maxWidth="xs">
      <Stack spacing={3} alignItems="center" sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" component="h1">Welcome</Typography>
        <Typography variant="body1" color="text.secondary">
          Please sign in or sign up to continue.
        </Typography>

        <Stack spacing={2} direction="row" sx={{ width: '100%', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={() => handleOAuthSignIn('google')}
            sx={{
              textTransform: 'none',
              borderColor: '#4285F4',
              color: '#4285F4',
              '&:hover': {
                borderColor: '#4285F4',
                backgroundColor: 'rgba(66, 133, 244, 0.1)',
              },
            }}
          >
            Sign in with Google
          </Button>
          <Button
            variant="contained"
            startIcon={<GitHubIcon />}
            onClick={() => handleOAuthSignIn('github')}
            sx={{
              textTransform: 'none',
              backgroundColor: '#333',
              '&:hover': {
                backgroundColor: '#000',
              },
            }}
          >
            Sign in with GitHub
          </Button>
        </Stack>

        <Divider sx={{ width: '100%', fontWeight: 'bold' }}>OR</Divider>

        <Box sx={{ width: '100%' }}>
          <AppBar position="static" color="default">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Sign In" />
              <Tab label="Sign Up" />
            </Tabs>
          </AppBar>
          <Box sx={{ p: 3 }}>
            {activeTab === 0 ? <SignIn /> : <SignUp switchToSignInTab={() => setActiveTab(0)} />}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default WelcomePage;
