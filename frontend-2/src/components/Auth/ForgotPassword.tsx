import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import api from "../../services/api";
import { useMyContext } from "../../store/AppContext";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useMyContext();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // const response = await fetch("/api/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email }),
      // });
      const formData = new URLSearchParams();
      formData.append("email", email);
      const response = await api.post(
        "/auth/public/forgot-password",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      if (response.status === 200) {
        setSubmitted(true);
      } else {
        toast.error("Failed to send reset link.");
      }
    } catch (error) {
      toast.error("Error: " + error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          border: "1px solid #ccc",
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Forgot Password
        </Typography>
        {!submitted ? (
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <TextField
              label="Email Address"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Send Reset Link
            </Button>
          </form>
        ) : (
          <Typography variant="body1" color="text.secondary" align="center">
            A password reset link has been sent to your email, if it exists in
            our records. Please check your inbox.
          </Typography>
        )}
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <Button
            variant="text"
            color="secondary"
            onClick={() => {
              navigate("/");
            }}
          >
            Back to Login
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default ForgotPassword;
