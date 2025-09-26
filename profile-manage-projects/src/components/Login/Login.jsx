import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { login } from "../../api/authApi";
import { Eye, EyeOff, Loader2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// === Component Input đã được sửa lỗi và tối ưu hóa ===
const AnimatedInput = ({
  id,
  label,
  type,
  value,
  onChange,
  showPasswordToggle = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const finalType = showPasswordToggle ? (showPassword ? "text" : "password") : type;

  // Trạng thái "active" xác định khi nào label cần nổi lên
  // (khi được focus HOẶC khi đã có giá trị)
  const isActive = isFocused || value;

  return (
    <div className="relative">
      <Input
        id={id}
        type={finalType}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        required
        className="h-14 w-full rounded-md border border-slate-300 bg-transparent px-4 pt-4 text-base text-slate-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <Label
        htmlFor={id}
        // Logic CSS được đơn giản hóa và chính xác hơn
        className={`absolute left-4 origin-left transform cursor-text bg-white px-1 text-slate-500 transition-all duration-300 
                   ${isActive 
                     ? "-top-2 scale-75 text-xs text-blue-600" 
                     : "top-1/2 -translate-y-1/2 scale-100 text-base"
                   }`}
      >
        {label}
      </Label>
      {showPasswordToggle && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-500 hover:text-slate-900"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
        </Button>
      )}
    </div>
  );
};

const Login = () => {
  // --- State và Logic xử lý form giữ nguyên ---
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    const newUser = { gmail, password };
    setIsLoading(true);
    try {
      await login(newUser, dispatch, navigate);
      toast.success("Đăng nhập thành công!");
    } catch (error) {
      const errorMessage =
        error.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative flex w-full min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-100 p-4 font-sans">
      {/* --- SVG Background (Giữ nguyên) --- */}
      <div className="absolute inset-0 z-0">
        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#gradient-apple)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient id="gradient-apple">
              <stop stopColor="#5A95FF"></stop>
              <stop offset="1" stopColor="#3172F5"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-lg space-y-8 rounded-2xl border border-slate-200/80 bg-white/60 p-10 shadow-2xl shadow-slate-600/10 backdrop-blur-xl"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">ChineseApp</h1>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
            Chào mừng trở lại
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Nhập email và mật khẩu để tiếp tục.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-8">
          <div className="space-y-8"> {/* Tăng khoảng cách giữa các input */}
            <AnimatedInput
              id="email"
              label="Email"
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
            
            <div>
                 <AnimatedInput
                    id="password"
                    label="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    showPasswordToggle={true}
                />
                 <div className="flex items-center justify-end mt-2">
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-slate-500 hover:text-blue-600 hover:underline"
                    >
                        Quên mật khẩu?
                    </Link>
                </div>
            </div>
          </div>

          {error && (
            <p className="text-center text-sm font-medium text-red-600">{error}</p>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Đăng nhập"
            )}
          </Button>
        </form>

        <p className="text-center text-base text-slate-600">
          Chưa có tài khoản?{" "}
          <Link
            to="/chinese/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Đăng ký
          </Link>
        </p>
      </motion.div>
    </main>
  );
};

export default Login;