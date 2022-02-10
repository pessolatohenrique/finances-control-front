import axios from "axios";

export async function initializeAxios(tokenParam = "") {
  const token = tokenParam || localStorage.getItem("token");
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";
}

export default axios;
