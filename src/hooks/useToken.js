import { useState } from "react";

function useToken() {
  const [token, setToken] = useState(getToken());

  function getToken() {
    const token = localStorage.getItem("token");
    return token || "";
  }

  function saveToken(token) {
    localStorage.setItem("token", token);
    setToken(token);
  }

  return {
    token,
    setToken: saveToken,
  };
}

export default useToken;
