import { atom, useAtom } from "jotai";
import axios from "axios";

const accessTokenAtom = atom<string | null>(null);

/**
 * Custom Hook managing Token
 */
const useAccessToken = () => {
  const [token, _setToken] = useAtom(accessTokenAtom);

  function setToken(t: string) {
    if (axios) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${t}`;
    }
    _setToken(t);
  }

  function resetToken() {
    _setToken(null);
    if (axios) {
      delete axios.defaults.headers.common["Authorization"];
    }
  }

  return {
    accessToken: token,
    setToken,
    resetToken,
  };
};

export default useAccessToken;
