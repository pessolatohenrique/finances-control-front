import axios from "axios";

async function refreshToken() {
  try {
    const response = await axios.post(`/refresh_token`, {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    localStorage.setItem("token", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

    return response.data.accessToken;
  } catch (error) {
    console.log("refresh error", error);
  }
}

async function initializeInterceptor() {
  return axios.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (error) {
      const message = error?.response?.data.message || undefined;
      const status = error?.request?.status || undefined;
      const originalRequest = error.config;

      if (
        status === 401 &&
        message === "jwt expired" &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const newToken = await refreshToken();
        originalRequest.headers["Authorization"] = "Bearer " + newToken;
        return await axios.request(originalRequest);
      }

      return Promise.reject(error);
    }
  );
}
export async function initializeAxios(tokenParam = "") {
  const token = tokenParam || localStorage.getItem("token");
  axios.defaults.baseURL = process.env.REACT_APP_API_URL;
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axios.defaults.headers.post["Content-Type"] = "application/json";
  await initializeInterceptor();
}

export default axios;
