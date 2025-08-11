import React, { useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { RiUserCommunityFill } from "react-icons/ri";
import { PiStudentBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdLanguage, MdStar } from "react-icons/md";
import { login } from "../../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  const [gmail, setgmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  useEffect(() => {
    console.log("user", user);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const newUser = {
      gmail: gmail,
      password: password,
    };
    setIsLoading(true);
    try {
      await login(newUser, dispatch, navigate);
      toast.success("Đăng nhập thành công! Chuyển hướng về dashboard...");
      setTimeout(() => {
        navigate("/chinese");
      }, 2300);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 flex items-center justify-center p-4 w-full">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-200/30 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-200/40 rounded-full blur-lg"></div>
        <div className="absolute bottom-20 left-32 w-24 h-24 bg-orange-200/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-red-300/30 rounded-full blur-lg"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-0 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20">
          {/* Left Panel - Hero Section */}
          <div className="relative bg-gradient-to-br from-red-600 via-red-700 to-orange-600 p-8 lg:p-12 text-white overflow-hidden">
            {/* Decorative patterns */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-400 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              {/* Header */}
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                    <MdLanguage className="text-2xl text-red-700" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">Chinese Learning</h1>
                    <p className="text-red-100">中文学习平台</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                    Chào mừng <br />
                    <span className="text-yellow-300">trở lại!</span>
                  </h2>
                  <p className="text-red-100 text-lg">
                    Tiếp tục hành trình học tiếng Trung của bạn
                  </p>
                </div>

                {/* Chinese Characters Decoration */}
                <div className="flex space-x-4 text-yellow-300/60 text-6xl font-serif">
                  <span>学</span>
                  <span>习</span>
                  <span>中</span>
                  <span>文</span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FaBookReader className="text-xl text-red-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold">5000+ Bài học</h3>
                      <p className="text-red-100 text-sm">
                        Từ cơ bản đến nâng cao
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MdStar className="text-xl text-red-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold">HSK 1-6</h3>
                      <p className="text-red-100 text-sm">Đầy đủ từ vựng HSK</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                    <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0">
                      <RiUserCommunityFill className="text-xl text-red-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Cộng đồng 24/7</h3>
                      <p className="text-red-100 text-sm">
                        Hỗ trợ mọi lúc mọi nơi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Login Form */}
          <div className="p-8 lg:p-12 bg-white">
            <div className="max-w-md mx-auto">
              {/* Form Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  Đăng nhập
                </h3>
                <p className="text-gray-600">
                  Nhập thông tin để truy cập tài khoản của bạn
                </p>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="gmail"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="gmail"
                      name="gmail"
                      value={gmail}
                      onChange={(e) => setgmail(e.target.value)}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 text-gray-800"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 pr-12 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all duration-300 text-gray-800"
                      placeholder="Nhập mật khẩu của bạn"
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={20} />
                      ) : (
                        <FaEye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                    <p className="text-red-600 text-sm">{error}</p>
                  </div>
                )}

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-600">
                      Ghi nhớ đăng nhập
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-red-600 hover:text-red-700 hover:underline"
                  >
                    Quên mật khẩu?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg ${
                    isLoading ? "opacity-50 cursor-not-allowed scale-100" : ""
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Đang đăng nhập...</span>
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">
                      Hoặc đăng nhập với
                    </span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                  >
                    <FcGoogle size={20} />
                    <span className="text-gray-700 font-medium">Google</span>
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center space-x-2 py-3 px-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                  >
                    <FaFacebook size={20} className="text-blue-600" />
                    <span className="text-gray-700 font-medium">Facebook</span>
                  </button>
                </div>

                {/* Register Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Chưa có tài khoản?{" "}
                    <button
                      type="button"
                      onClick={() => navigate("/chinese/register")}
                      className="text-red-600 hover:text-red-700 font-semibold hover:underline"
                    >
                      Đăng ký ngay
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
