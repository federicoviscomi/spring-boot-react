import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { Box, Button, TextField } from "@mui/material";

import { useMyContext } from "../../store/AppContext";
import api from "../../services/api";
import { SignInResponse } from "../../types/signIn";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { setToken, token } = useMyContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSuccessfulSignIn = async (signInResponse: SignInResponse) => {
    console.log(signInResponse);
    const jwtPayload = jwtDecode(signInResponse.jwtToken);
    const user = {
      username: jwtPayload.sub,
      roles: signInResponse.roles,
    };
    localStorage.setItem("JWT_TOKEN", signInResponse.jwtToken);
    localStorage.setItem("USER", JSON.stringify(user));
    setToken(signInResponse.jwtToken);
    console.log("navigating to notes");
    await navigate("/notes");
  };

  const signIn = async () => {
    try {
      setLoading(true);
      const response = await api.post<SignInResponse>("/auth/public/sign-in", {
        username,
        password,
      });
      if (response.status === 200 && response.data.jwtToken) {
        await handleSuccessfulSignIn(response.data);
      } else {
        toast.error(
          "SignIn failed. Please check your credentials and try again.",
        );
      }
    } catch (error) {
      if (error) {
        toast.error(
          (t) => (
            <span id="sign-in-failed">
              Sign in failed
              <Button
                id="close-sign-in-failed"
                onClick={() => toast.dismiss(t.id)}
                style={{
                  marginLeft: "10px",
                  color: "blue",
                  cursor: "pointer",
                }}
              >
                Close
              </Button>
            </span>
          ),
          {
            duration: Infinity,
          },
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  return (
    <div>
      <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
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
        >
          Sign In
        </Button>
      </Box>
      <p className=" text-sm text-slate-700 ">
        <Link className=" underline hover:text-black" to="/forgot-password">
          Forgot Password?
        </Link>
      </p>
    </div>
  );
};

export default SignIn;
