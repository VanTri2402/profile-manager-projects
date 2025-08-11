import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080/", // Cấu hình URL gốc của API
  headers: {
    "Content-Type": "application/json",
  },
});
instance.defaults.withCredentials = true;
// Interceptor để tự động xử lý response
instance.interceptors.response.use(
  (response) => response.data, // Chỉ trả về `data`, loại bỏ `response.data`
  (error) => {
    return Promise.reject(error.response?.data || { message: "Unknown error" });
  }
);

export default instance;
