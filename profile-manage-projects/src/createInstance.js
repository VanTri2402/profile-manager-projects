import axios from "axios";
import { jwtDecode } from "jwt-decode"; // <<< THÊM: Import jwt-decode
import { toast } from "react-toastify";

// Import các action tương ứng với slice bạn đang dùng (authSlice hoặc chineseUserSlice)
import { loginSuccess, logoutSuccess } from "../src/redux/authSlice"

const API_URL = "http://localhost:3000";

// --- HÀM LÀM MỚI TOKEN (ĐÃ SỬA LỖI) ---
// Hàm này gọi đến endpoint "/refresh" mà bạn đã định nghĩa ở backend.
const refreshToken = async () => {
  try {
    // Request làm mới token CHỈ cần `withCredentials: true` để gửi httpOnly cookie chứa refresh token lên server.
    // Không cần truyền thêm headers tùy chỉnh ở đây.
    const res = await axios.post(
      `${API_URL}/refresh`,
      {},
      {
        withCredentials: true,
      }
    );
    return res.data; // Trả về { accessToken } mới
  } catch (err) {
    console.error("Could not refresh token:", err);
    throw err; // Ném lỗi ra ngoài để interceptor xử lý
  }
};

export const createAxios = (user, dispatch, successAction) => {
  const newInstance = axios.create();

  // --- INTERCEPTOR XỬ LÝ TRƯỚC KHI GỬI REQUEST ---
  newInstance.interceptors.request.use(
    async (config) => {
      // Chỉ kiểm tra và làm mới token nếu người dùng đã đăng nhập
      if (user?.accessToken) {
        const decodedToken = jwtDecode(user.accessToken);
        const currentTime = new Date().getTime() / 1000;

        // Kiểm tra nếu token hết hạn
        if (decodedToken.exp < currentTime) {
          try {
            console.log("Access token expired, refreshing...");
            const data = await refreshToken();

            // Cập nhật user trong Redux với accessToken mới
            const refreshedUser = {
              ...user,
              accessToken: data.accessToken,
            };
            // Dùng successAction (có thể là loginSuccess) để cập nhật state
            dispatch(successAction(refreshedUser));

            // Gắn accessToken MỚI vào header của request ban đầu
            config.headers["token"] = `Bearer ${data.accessToken}`;
          } catch (error) {
            // Nếu refresh token thất bại, đăng xuất người dùng
            console.error("Failed to refresh token, logging out.");
            dispatch(logoutSuccess());
            toast.info("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
            // Không cần navigate ở đây vì các component sẽ tự động redirect khi state Redux thay đổi
            return Promise.reject(error);
          }
        } else {
          // Nếu token còn hạn, gắn nó vào header
          config.headers["token"] = `Bearer ${user.accessToken}`;
        }
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  return newInstance;
};
