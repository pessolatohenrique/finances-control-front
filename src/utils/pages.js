import { PATHS_WITHOUT_LOGIN } from "../constants/pages_settings";

export const isPageWithoutLogin = () => {
  return PATHS_WITHOUT_LOGIN.includes(window.location.pathname);
};
