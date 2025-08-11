import React, { useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { register } from "../../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  placeholder,
  showToggle,
  toggleVisibility,
  showPassword,
}) => (
  <div className="relative">
    <input
      type={showPassword ? "text" : type}
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="peer w-full p-4 pr-12 border border-gray-400 rounded-xl focus:border-primary-400 focus:ring-2 focus:ring-primary-300 outline-none transition-all duration-300 text-gray-800 placeholder-transparent"
      placeholder={placeholder}
      required
      aria-label={label}
    />
    <label
      htmlFor={id}
      className="absolute left-4 top-4 text-gray-500 transition-all duration-300 peer-focus:-top-3 peer-focus:text-primary-400 peer-focus:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-valid:-top-3 peer-valid:text-sm bg-white px-1"
    >
      {label}
    </label>
    {showToggle && (
      <button
        type="button"
        onClick={toggleVisibility}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary-600"
        aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
      >
        {showPassword ? <FaEyeSlash /> : <FaEye />}
      </button>
    )}
  </div>
);

const Register = () => {
  const [gmail, setGmail] = useState(""); // Đổi từ email thành gmail
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== cfPassword) {
      setError("Mật khẩu không khớp");
      return;
    }
    if (
      password.length < 8 ||
      !/[A-Z]/.test(password) ||
      !/[0-9]/.test(password)
    ) {
      setError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa và số");
      return;
    }

    setIsLoading(true);
    try {
      await register({ gmail, password }, dispatch, navigate);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập tài khoản...");
      navigate("/chinese/login");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || error.message || "Đăng ký thất bại";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const togglePasswordCfVisibility = () => setShowCfPassword((prev) => !prev);

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-8 lg:px-16 bg-gradient-to-br from-blue-50 to-purple-50 overflow-visible flex items-center justify-center">
      <div className="flex flex-col lg:flex-row rounded-2xl shadow-2xl w-full max-w-5xl bg-white">
        {/* Left Section */}
        <div className="relative rounded-l-2xl w-full lg:w-[380px] h-auto bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h2 className="font-semibold text-3xl">Học Tiếng Trung</h2>
            <p className="text-lg">
              Khám phá ngôn ngữ và văn hóa Trung Quốc cùng chúng tôi
            </p>
            <p className="font-serif text-yellow-400 text-xl">
              你好 / nǐ hǎo /
            </p>
            <hr className="border-gray-400 mt-4" />
          </div>
          <div className="flex flex-col gap-6 text-base">
            <div className="flex items-center gap-4">
              <div className="p-3 text-xl rounded-full bg-yellow-400 size-12 flex items-center justify-center">
                <FaBookReader />
              </div>
              <span>Hơn 5000 bài học</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 text-xl rounded-full bg-yellow-400 size-12 flex items-center justify-center">
                <RiUserCommunityFill />
              </div>
              <span>Cộng đồng hỗ trợ 24/7</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 text-xl rounded-full bg-yellow-400 size-12 flex items-center justify-center">
                <PiStudentBold />
              </div>
              <span>Đầy đủ từ vựng từ HSK 1 - HSK 6</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex flex-col p-8 gap-6 w-full lg:w-[450px] bg-white">
          <h3 className="text-gray-800 font-semibold text-3xl">
            Đăng ký tài khoản
          </h3>
          <p className="text-gray-500 text-lg">
            Chào mừng bạn đã đến với chúng tôi! Vui lòng đăng ký tài khoản để
            bắt đầu học.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <InputField
              id="gmail"
              label="Gmail"
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
              placeholder="Gmail"
            />
            <InputField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              showToggle
              toggleVisibility={togglePasswordVisibility}
              showPassword={showPassword}
            />
            <InputField
              id="cf-password"
              label="Confirm Password"
              type="password"
              value={cfPassword}
              onChange={(e) => setCfPassword(e.target.value)}
              placeholder="Confirm Password"
              showToggle
              toggleVisibility={togglePasswordCfVisibility}
              showPassword={showCfPassword}
            />
            {error && (
              <p className="text-red-500 text-sm" role="alert">
                {error}
              </p>
            )}
            <div className="flex justify-between">
              <div className="flex gap-1 my-auto">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  aria-label="Ghi nhớ đăng nhập"
                />
                <label htmlFor="remember" className="text-gray-600 text-[14px]">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <a
                href="#"
                className="text-primary-600 hover:underline text-sm"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/forgot-password");
                }}
              >
                Quên mật khẩu?
              </a>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                    ></path>
                  </svg>
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>
            <div className="relative">
              <div className="border border-gray-500">
                <p className="text-gray-400 text-center absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-2">
                  Hoặc đăng nhập với
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-6 p-4 justify-center">
              <button
                type="button"
                className="px-4 py-2 text-text flex w-[180px] border border-gray-300 bg-background rounded-xl shadow-lg items-center"
                aria-label="Đăng nhập bằng Google"
              >
                <FcGoogle className="text-2xl m-auto" />
                <span className="m-auto text-[18px] font-sans -ml-4 text-center">
                  Google
                </span>
              </button>
              <button
                type="button"
                className="px-4 py-2 text-text flex w-[180px] border border-gray-300 bg-background rounded-xl shadow-lg items-center"
                aria-label="Đăng nhập bằng Facebook"
              >
                <FaFacebook className="text-2xl m-auto text-blue-600" />
                <span className="m-auto text-[18px] -ml-2 font-sans text-center">
                  Facebook
                </span>
              </button>
            </div>
            <div className="flex flex-row justify-center gap-1 p-2 text-[16px]">
              <span className="text-gray-500">Đã có tài khoản?</span>
              <button
                type="button"
                onClick={() => navigate("/chinese/login")}
                className="text-primary-600 hover:underline"
                aria-label="Đăng nhập tài khoản"
              >
                Đăng nhập ngay
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Thêm ToastContainer */}
    </div>
  );
};

export default Register;
