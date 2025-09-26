import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// API & State Management
import { register } from "../../api/authApi";

// Lucide React Icons
import {
  Eye,
  EyeOff,
  Loader2,
  BookOpen,
  CheckCircle2,
  XCircle,
} from "lucide-react";

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// === Component Input với hiệu ứng Floating Label (Tái sử dụng từ trang Login) ===
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
  const finalType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;
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
        className="h-14 w-full rounded-md border border-slate-300 bg-transparent px-4 pt-4 text-base text-slate-900 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
      />
      <Label
        htmlFor={id}
        className={`absolute left-4 origin-left transform cursor-text bg-white px-1 text-slate-500 transition-all duration-300 ${
          isActive
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
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </Button>
      )}
    </div>
  );
};

// Component hiển thị yêu cầu mật khẩu
const PasswordRequirement = ({ meets, text }) => (
  <div
    className={`flex items-center text-sm ${
      meets ? "text-green-600" : "text-slate-500"
    } transition-colors`}
  >
    {meets ? (
      <CheckCircle2 className="mr-2 h-4 w-4" />
    ) : (
      <XCircle className="mr-2 h-4 w-4" />
    )}
    {text}
  </div>
);

const Register = () => {
  // --- Giữ nguyên toàn bộ State và Logic xử lý form của bạn ---
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfPassword, setCfPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passwordChecks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    match: password && password === cfPassword,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (
      !passwordChecks.length ||
      !passwordChecks.uppercase ||
      !passwordChecks.number ||
      !passwordChecks.match
    ) {
      const errorMsg = "Mật khẩu chưa thỏa mãn tất cả các yêu cầu.";
      setError(errorMsg);
      toast.error(errorMsg);
      return;
    }

    setIsLoading(true);
    try {
      await register({ gmail, password }, dispatch, navigate);
      toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/chinese/login");
    } catch (error) {
      const errorMessage =
        error.message || "Đăng ký thất bại. Email có thể đã tồn tại.";
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
        className="relative z-10 w-full max-w-lg space-y-6 rounded-2xl border border-slate-200/80 bg-white/60 p-10 shadow-2xl shadow-slate-600/10 backdrop-blur-xl"
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BookOpen className="h-10 w-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-slate-900">ChineseApp</h1>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-gray-800">
            Tạo tài khoản mới
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Bắt đầu hành trình chinh phục tiếng Trung ngay hôm nay.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <AnimatedInput
              id="email"
              label="Email"
              type="email"
              value={gmail}
              onChange={(e) => setGmail(e.target.value)}
            />
            <AnimatedInput
              id="password"
              label="Mật khẩu"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordToggle={true}
            />
            <AnimatedInput
              id="confirm-password"
              label="Xác nhận Mật khẩu"
              type="password"
              value={cfPassword}
              onChange={(e) => setCfPassword(e.target.value)}
              showPasswordToggle={true}
            />
          </div>

          {/* Password requirements */}
          <div className="grid gap-1.5 pl-1 pt-2">
            <PasswordRequirement
              meets={passwordChecks.length}
              text="Ít nhất 8 ký tự"
            />
            <PasswordRequirement
              meets={passwordChecks.uppercase}
              text="Ít nhất một chữ hoa"
            />
            <PasswordRequirement
              meets={passwordChecks.number}
              text="Ít nhất một chữ số"
            />
            <PasswordRequirement
              meets={passwordChecks.match}
              text="Mật khẩu khớp"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" required />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none text-gray-700"
            >
              Tôi đồng ý với{" "}
              <Link to="#" className="underline text-blue-600">
                Điều khoản Dịch vụ
              </Link>
            </label>
          </div>

          {error && (
            <p className="text-center text-sm font-medium text-red-600">
              {error}
            </p>
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
              "Tạo tài khoản"
            )}
          </Button>
        </form>

        <p className="text-center text-base text-slate-600">
          Đã có tài khoản?{" "}
          <Link
            to="/chinese/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Đăng nhập
          </Link>
        </p>
      </motion.div>
    </main>
  );
};

export default Register;
