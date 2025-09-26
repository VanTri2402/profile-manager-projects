import axios from "axios";
import {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutStart,
  logoutFailed,
  logoutSuccess,
} from "../redux/authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  getUsersFailed,
  getUsersStart,
  getUsersSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  updateAdminFailed,
  updateAdminStart,
  updateAdminSuccess,
} from "../redux/userSlice";
import { toast } from "react-toastify";
const API_URL = "http://localhost:3000"; // Base URL khớp với BE

export const login = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(`${API_URL}/login`, user, {
      withCredentials: true,
    });
    console.log("data login : ", response.data.refreshToken);
    dispatch(loginSuccess(response.data));
    navigate("/chinese");
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || // BE trả về message
      error.response?.data?.error || // Backup nếu BE trả về error
      error.message ||
      "Đăng nhập thất bại";
    dispatch(loginFailed());
    throw new Error(errorMessage);
  }
};

export const register = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    dispatch(registerSuccess());
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || // BE trả về message
      error.response?.data?.error || // Backup nếu BE trả về error
      error.message ||
      "Đăng ky thất bại";
    dispatch(registerFailed());
    throw new Error(errorMessage);
  }
};

export const getAllUsers = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get(`${API_URL}/read`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    const usersData = Array.isArray(res.data.users) ? res.data.users : [];
    dispatch(getUsersSuccess(usersData)); // Gửi mảng users trực tiếp
    return usersData;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || // BE trả về message
      error.response?.data?.error || // Backup nếu BE trả về error
      error.message ||
      "Lấy danh sách người dùng thất bại";
    dispatch(getUsersFailed(errorMessage));
  }
};

export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(`${API_URL}/delete/${id}`, {
      headers: { token: `Bearer ${accessToken}` },
      withCredentials: true,
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (error) {
    toast.error("You are not authorized to delete this user.");
    dispatch(deleteUserFailed(errorMessage));
  }
};

export const logout = async (dispatch, navigate, token, axiosJWT) => {
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

    toast.success("Đăng xuất thành công!");
    navigate("/chinese/login"); // SỬA LỖI: Bỏ chữ "login" thừa
  } catch (error) {
    dispatch(logoutFailed());
    const errorMessage =
      error.response?.data?.message || "Đăng xuất thất bại, vui lòng thử lại.";
    toast.error(errorMessage);
  }
};

export const updateUser = async (dispatch, user) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(`${API_URL}/update/${user._id}`, user);
    dispatch(updateUserSuccess(res.data));
    toast.success("Cập nhật người dùng thành công.");
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || // BE trả về message
      error.response?.data?.error || // Backup nếu BE trả về error
      error.message ||
      "Cập nhật người dùng thất bại";
    dispatch(updateUserFailed(errorMessage));
    toast.error(errorMessage);
  }
};

export const updateAdmin = async (dispatch, user, token) => {
  dispatch(updateAdminStart());
  try {
    const res = await axios.post(`${API_URL}/auth-admin`, user, {
      headers: {
        token: `Bearer ${token}`, // Token để xác thực
      },
    });
    dispatch(updateAdminSuccess(res.data));
    toast.success("Cập nhật phân quyền admin thành công.");
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Cập nhật người dùng thất bại";
    dispatch(updateAdminFailed(errorMessage));
    toast.error(errorMessage);
  }
};
