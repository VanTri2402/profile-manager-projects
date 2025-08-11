import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { register } from "../api/authApi";

const ManagerUserRegister = () => {
  const [gmail, setgmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [showCfPassword, setShowCfPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    // Simulate API call
    if (password !== confirmPassword) {
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
    const newUser = {
      gmail: gmail,
      password: password,
    };
    setIsLoading(true);
    try {
      await register(newUser, dispatch, navigate);
      toast.success(
        "Đăng ký tài khoản thành công! Vui lòng đăng nhập tài khoản để tiếp tục..."
      );
      setTimeout(() => {
        navigate("/managerUser/login");
      }, 2300);
      setgmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || error.message || "Đăng ký thất bại";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleCfPasswordVisibility = () => {
    setShowCfPassword((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-700 animate-fadeIn">
        {/* Header */}
        <div className="p-8 pb-6 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <User className="w-6 h-6 text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white text-center mb-2">
            Đăng Ký Tài Khoản
          </h2>
          <p className="text-indigo-200 text-center text-sm">
            Chào mừng trở lại! Vui lòng đăng ký tài khoản để tiếp tục
          </p>
        </div>

        {/* Form */}
        <div className="p-8 pt-6">
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Gmail Field */}
            <div className="relative">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="gmail"
                  name="gmail"
                  value={gmail}
                  onChange={(e) => setgmail(e.target.value)}
                  className="peer w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  placeholder="gmail"
                  required
                  aria-label="Nhập địa chỉ gmail"
                />
                <label
                  htmlFor="gmail"
                  className="absolute left-10 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-3 peer-focus:left-3 peer-focus:text-indigo-400 peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-valid:-top-3 peer-valid:left-3 peer-valid:text-sm bg-gray-900 px-1"
                >
                  gmail
                </label>
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  placeholder="Password"
                  required
                  aria-label="Nhập mật khẩu"
                />
                <label
                  htmlFor="password"
                  className="absolute left-10 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-3 peer-focus:left-3 peer-focus:text-indigo-400 peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-valid:-top-3 peer-valid:left-3 peer-valid:text-sm bg-gray-900 px-1"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
            {/* Confirm Password Field */}
            <div className="relative">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showCfPassword ? "text" : "password"}
                  id="cfpassword"
                  name="cfpassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="peer w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  placeholder="Confirm-Password"
                  required
                  aria-label="Nhập mật khẩu"
                />
                <label
                  htmlFor="cfpassword"
                  className="absolute left-10 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-3 peer-focus:left-3 peer-focus:text-indigo-400 peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-valid:-top-3 peer-valid:left-3 peer-valid:text-sm bg-gray-900 px-1"
                >
                  Confirm Password
                </label>
                <button
                  type="button"
                  onClick={toggleCfPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  aria-label={showCfPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showCfPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Display */}
            {error && (
              <div className="flex items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <AlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                <p className="text-red-400 text-sm" role="alert">
                  {error}
                </p>
              </div>
            )}

            {/* Remember Me and Forgot Password */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="remember"
                  id="remember"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                  aria-label="Ghi nhớ đăng nhập"
                />
                <label htmlFor="remember" className="text-gray-300 text-sm">
                  Ghi nhớ đăng nhập
                </label>
              </div>
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 ${
                isLoading ? "opacity-50 cursor-not-allowed transform-none" : ""
              }`}
            >
              {isLoading ? "Đang đăng ký tài khoản..." : "Đăng ký"}
            </button>

            {/* Social Login Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="flex gap-6 justify-center">
              <button
                type="button"
                className="flex items-center justify-center w-44 py-3 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-gray-300 hover:bg-gray-750 hover:border-gray-600 transform hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Đăng nhập bằng Google"
              >
                <svg
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center w-44 py-3 px-4 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-gray-300 hover:bg-gray-750 hover:border-gray-600 transform hover:-translate-y-0.5 transition-all duration-200"
                aria-label="Đăng nhập bằng Facebook"
              >
                <svg
                  className="h-5 w-5 mr-2 text-blue-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>

            {/* Register Link */}
            <div className="text-center">
              <span className="text-gray-400 text-base">Đã có tài khoản? </span>
              <button
                type="button"
                onClick={() => navigate("/managerUser/login")}
                className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors"
                aria-label="Đăng ký tài khoản"
              >
                Đăng nhập ngay
              </button>
            </div>
          </form>
        </div>
      </div>

      <div />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ManagerUserRegister;
