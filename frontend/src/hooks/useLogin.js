
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useLogin = () => {
  const [loginError, setLoginError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async ({ email, password, rememberMe }) => {
    setLoginError(null);

    try {
      const response = await axios.post("/api/login", { email, password });
      const user = response.data;

      // Store user in localStorage if rememberMe
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        localStorage.removeItem("user");
      }

      // Update context state
      dispatch({ type: "LOGIN", payload: user });

      return user;
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(error.response?.data?.error || "Invalid credentials");
    }
  };

  return { login, loginError };
};
