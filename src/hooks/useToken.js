import { useState } from "react";
import { initializeAxios } from "../utils/requests";

function useToken() {
  const [token, setToken] = useState(getToken());
  const [refreshToken, setRefreshToken] = useState(getRefreshToken());

  function getToken() {
    const token = localStorage.getItem("token");
    return token || "";
  }

  function getRefreshToken() {
    const refreshToken = localStorage.getItem("refreshToken");
    return refreshToken || "";
  }

  async function saveToken(token) {
    localStorage.setItem("token", token);
    initializeAxios(token);
    setToken(token);
  }

  async function saveRefreshToken(token) {
    localStorage.setItem("refreshToken", token);
    setRefreshToken(token);
  }

  return {
    token,
    refreshToken,
    setToken: saveToken,
    setRefreshToken: saveRefreshToken,
  };
}

export default useToken;
