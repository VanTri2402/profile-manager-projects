import axios from "axios";
import { jwtDecode } from "jwt-decode";

const URL_BE = "http://localhost:3000";
const refreshToken = async () => {
  try {
    const res = await axios.post(
      `${URL_BE}/refresh`,
      {},
      {
        withCredentials: true,
      },
      {
        headers
      }
    );
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
//stateSuccess is used to update the state after refreshing the token
export const createAxios = (memoizedUser, dispatch, stateSuccess) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(memoizedUser.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...memoizedUser,
          accessToken: data.accessToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = `Bearer ${data.accessToken}`;
      }
      return config;
    },
    (err) => Promise.reject(err)
  );
  return newInstance;
};
