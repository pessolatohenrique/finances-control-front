import { useState } from "react";
import { initializeAxios } from "../utils/requests";

function useToken() {
  const [token, setToken] = useState(getToken());

  function getToken() {
    const token = localStorage.getItem("token");
    return token || "";
  }

  async function saveToken(token) {
    await localStorage.setItem("token", token);
    initializeAxios(token);
    setToken(token);
  }

  return {
    token,
    setToken: saveToken,
  };
}

export default useToken;
