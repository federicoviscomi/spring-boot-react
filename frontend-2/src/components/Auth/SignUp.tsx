import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useMyContext } from "../../store/AppContext";
import api from "../../services/api";
import { Box, Button, TextField } from "@mui/material";
import { AppRole } from "../../types/role";

interface SignUpProps {
  switchToSignInTab: () => void;
}

const SignUp = ({ switchToSignInTab }: SignUpProps) => {
  const { token } = useMyContext();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameError, setUsernameError] = useState<string | undefined>(
    undefined,
  );
  const [emailError, setEmailError] = useState<string | undefined>(undefined);

  const signUp = async () => {
    try {
      setLoading(true);
      const response = await api.post("/auth/public/sign-up", {
        username,
        email,
        password,
        role: [AppRole.ROLE_USER],
      });
      console.log("response " + response);
      toast.success("Registered Successful");
      if (response.data) {
        switchToSignInTab();
      }
    } catch (error) {
      console.log("error " + error);
      if (error && axios.isAxiosError(error) && error.response?.data?.message) {
        const errorMessage = error.response.data.message;
        if (errorMessage === "Error: Username is already taken!") {
          setUsernameError("username is already taken");
        } else if (errorMessage === "Error: Email is already in use!") {
          setEmailError("Email is already in use");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          required
          id="email"
          type="email"
          placeholder="type your email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        {emailError && (
          <span id="email-error" style={{ color: "red" }}>
            {emailError}
          </span>
        )}
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
        {usernameError && (
          <span id="username-error" style={{ color: "red" }}>
            {usernameError}
          </span>
        )}
        <TextField
          autoComplete="new-password"
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
          id="sign-up-button"
          variant="contained"
          color="primary"
          fullWidth
          onClick={signUp}
        >
          Sign Up
        </Button>
        <p className="text-center text-sm text-slate-700 mt-2">
          Already have an account?{" "}
          <Link
            className="font-semibold underline hover:text-black"
            to="/sign-in"
          >
            Sign in
          </Link>
        </p>
      </Box>
    </div>
  );
};

export default SignUp;
