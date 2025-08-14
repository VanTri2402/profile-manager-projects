import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutSuccess,
  logoutFailed,
} from "../redux/chineseUserSlice";

import {
  checkInStart,
  checkInSuccess,
  checkInFailed,
  getWordsStart,
  getWordsSuccess,
  getWordsFailed,
  getProgressStart,
  getProgressSuccess,
  getProgressFailed,
  updateSettingsStart,
  updateSettingsSuccess,
  updateSettingsFailed,
  resetProgressStart,
  resetProgressSuccess,
  resetProgressFailed,
} from "../redux/chineseSlice";

const API_URL = "http://localhost:3000/api/chinese";

// Auth APIs
export const loginChinese = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}/login`, user, {
      withCredentials: true,
    });
    dispatch(loginSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(loginFailed());
    throw new Error(errorMessage);
  }
};

export const registerChinese = async (user, dispatch) => {
  dispatch(registerStart());
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    dispatch(registerSuccess());
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(registerFailed());
    throw new Error(errorMessage);
  }
};

export const logoutChinese = async (dispatch, axiosJWT, token) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post(
      `${API_URL}/logout`,
      {},
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutFailed());
  }
};

// Learning APIs
export const checkIn = async (dispatch, axiosJWT, token) => {
  dispatch(checkInStart());
  try {
    const response = await axiosJWT.post(
      `${API_URL}/check-in`,
      {},
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    dispatch(checkInSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(checkInFailed(errorMessage));
    throw new Error(errorMessage);
  }
};

export const getWords = async (dispatch, axiosJWT, token) => {
  dispatch(getWordsStart());
  try {
    const response = await axiosJWT.get(`${API_URL}/words`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getWordsSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(getWordsFailed(errorMessage));
    throw new Error(errorMessage);
  }
};

export const getProgress = async (dispatch, axiosJWT, token) => {
  dispatch(getProgressStart());
  try {
    const response = await axiosJWT.get(`${API_URL}/progress`, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(getProgressSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(getProgressFailed(errorMessage));
    throw new Error(errorMessage);
  }
};

export const updateSettings = async (settings, dispatch, axiosJWT, token) => {
  dispatch(updateSettingsStart());
  try {
    const response = await axiosJWT.put(`${API_URL}/settings`, settings, {
      headers: { token: `Bearer ${token}` },
    });
    dispatch(updateSettingsSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(updateSettingsFailed(errorMessage));
    throw new Error(errorMessage);
  }
};

export const resetProgress = async (dispatch, axiosJWT, token) => {
  dispatch(resetProgressStart());
  try {
    const response = await axiosJWT.post(
      `${API_URL}/reset-progress`,
      {},
      {
        headers: { token: `Bearer ${token}` },
      }
    );
    dispatch(resetProgressSuccess(response.data));
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    dispatch(resetProgressFailed(errorMessage));
    throw new Error(errorMessage);
  }
};
