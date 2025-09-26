import { toast } from "react-toastify";

// Import tất cả các action cần thiết từ Redux slice
import {
  getProgressStart,
  getProgressSuccess,
  getProgressFailed,
  getWordsStart,
  getWordsSuccess,
  getWordsFailed,
  checkInStart,
  checkInSuccess,
  checkInFailed,
  updateSettingsStart,
  updateSettingsSuccess,
  updateSettingsFailed,
  resetProgressStart,
  resetProgressSuccess,
  resetProgressFailed,
} from "../redux/chineseSlice"; // Đảm bảo đường dẫn đúng

const API_URL = "http://localhost:3000/api/chinese"; // Base URL cho API

/**
 * Lấy dữ liệu tiến trình học tập của người dùng.
 * @param {Function} dispatch - Hàm dispatch của Redux.
 * @param {Object} axiosJWT - Instance của Axios đã được cấu hình với interceptor.
 * @param {string} accessToken - Access token của người dùng.
 * @returns {Promise<Object|undefined>} Dữ liệu tiến trình hoặc undefined nếu lỗi.
 */
export const getProgress = async (dispatch, axiosJWT, accessToken) => {
  dispatch(getProgressStart());
  try {
    const res = await axiosJWT.get(`${API_URL}/progress`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getProgressSuccess(res.data));
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Không thể tải dữ liệu tiến trình.";
    dispatch(getProgressFailed(errorMessage));
    toast.error(errorMessage);
  }
};

/**
 * Lấy danh sách từ vựng gợi ý cho người dùng.
 * @param {Function} dispatch - Hàm dispatch của Redux.
 * @param {Object} axiosJWT - Instance của Axios đã được cấu hình.
 * @param {string} accessToken - Access token của người dùng.
 * @returns {Promise<Object|undefined>} Dữ liệu từ vựng hoặc undefined nếu lỗi.
 */
export const getWords = async (dispatch, axiosJWT, accessToken) => {
  dispatch(getWordsStart());
  try {
    const res = await axiosJWT.get(`${API_URL}/words`, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getWordsSuccess(res.data));
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Không thể tải danh sách từ vựng.";
    dispatch(getWordsFailed(errorMessage));
    toast.error(errorMessage);
  }
};

/**
 * Thực hiện check-in hàng ngày.
 * @param {Function} dispatch - Hàm dispatch của Redux.
 * @param {Object} axiosJWT - Instance của Axios đã được cấu hình.
 * @param {string} accessToken - Access token của người dùng.
 * @returns {Promise<Object|undefined>} Kết quả check-in hoặc undefined nếu lỗi.
 */
export const checkIn = async (dispatch, axiosJWT, accessToken) => {
  dispatch(checkInStart());
  try {
    // API check-in là POST và không cần gửi body
    const res = await axiosJWT.post(
      `${API_URL}/check-in`,
      {},
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(checkInSuccess(res.data));
    toast.success(res.data.message || "Check-in thành công!");
    return res.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Check-in thất bại.";
    dispatch(checkInFailed(errorMessage));
    toast.error(errorMessage);
  }
};

/**
 * Cập nhật cài đặt của người dùng.
 * @param {Function} dispatch - Hàm dispatch của Redux.
 * @param {Object} axiosJWT - Instance của Axios đã được cấu hình.
 * @param {string} accessToken - Access token của người dùng.
 * @param {Object} settings - Object chứa các cài đặt cần cập nhật (vd: { dailyWordCount: 20 }).
 * @returns {Promise<Object|undefined>} Dữ liệu cài đặt đã cập nhật hoặc undefined nếu lỗi.
 */
export const updateSettings = async (
  dispatch,
  axiosJWT,
  accessToken,
  settings
) => {
  dispatch(updateSettingsStart());
  try {
    const res = await axiosJWT.put(`${API_URL}/settings`, settings, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(updateSettingsSuccess(res.data));
    toast.success(res.data.message || "Cập nhật cài đặt thành công!");
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Cập nhật cài đặt thất bại.";
    dispatch(updateSettingsFailed(errorMessage));
    toast.error(errorMessage);
  }
};

/**
 * Reset tiến trình học tập của người dùng.
 * @param {Function} dispatch - Hàm dispatch của Redux.
 * @param {Object} axiosJWT - Instance của Axios đã được cấu hình.
 * @param {string} accessToken - Access token của người dùng.
 * @returns {Promise<Object|undefined>} Dữ liệu tiến trình sau khi reset hoặc undefined nếu lỗi.
 */
export const resetProgress = async (dispatch, axiosJWT, accessToken) => {
  dispatch(resetProgressStart());
  try {
    const res = await axiosJWT.post(
      `${API_URL}/reset-progress`,
      {},
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(resetProgressSuccess(res.data));
    toast.success(res.data.message || "Reset tiến trình thành công!");
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Reset tiến trình thất bại.";
    dispatch(resetProgressFailed(errorMessage));
    toast.error(errorMessage);
  }
};
