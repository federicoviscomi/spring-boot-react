import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  AppBar,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Divider from '@mui/material/Divider';
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

  // Replace these handlers with your OAuth login logic
  const handleGoogleSignIn = () => {
    console.log('Sign in with Google');
    // Redirect to your Google OAuth endpoint
    window.location.href = '/auth/google'; // Example endpoint
  };

  const handleGitHubSignIn = () => {
    console.log('Sign in with GitHub');
    // Redirect to your GitHub OAuth endpoint
    window.location.href = '/auth/github'; // Example endpoint
  };

  return (
    <Container maxWidth="xs">
      <Stack
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Please sign in or sign up to continue.
        </Typography>

        <Stack spacing={2} direction="row" alignItems="center">
          <Button
            variant="outlined"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignIn}
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
            onClick={handleGitHubSignIn}
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

        <Divider className="font-semibold">OR</Divider>

        <Box sx={{ width: '100%', mt: 2 }}>
          <AppBar position="static" color="default">
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab id="sign-in-tab" label="Sign In" />
              <Tab id="sign-up-tab" label="Sign Up" />
            </Tabs>
          </AppBar>
          <Box sx={{ p: 3 }}>
            {activeTab === 0 && <SignIn />}
            {activeTab === 1 && (
              <SignUp switchToSignInTab={() => setActiveTab(0)} />
            )}
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default WelcomePage;
