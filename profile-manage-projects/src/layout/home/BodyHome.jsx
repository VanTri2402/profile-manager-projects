import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

// Lucide React Icons
import {
  ArrowRight,
  BookCopy,
  CalendarDays,
  Flame,
  Languages,
  Loader2,
  PlayCircle,
  Star,
  Zap,
  BarChart3,
  Library,
  LineChart,
  MessageSquare,
} from "lucide-react";

// Shadcn/ui Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Dữ liệu giả lập (sử dụng logic gốc của bạn)
import {
  getStreak,
  getCurrentWord,
  skipDay,
} from "../../data/progress/progress";

// Component Card có thể tái sử dụng
const FeatureCard = ({
  icon,
  title,
  description,
  onClick,
  delay,
  className = "",
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: delay }}
  >
    <Card
      onClick={onClick}
      className="h-full bg-slate-50/80 hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer group border-slate-200"
    >
      <CardHeader>
        <div className="mb-3 w-10 h-10 bg-blue-100 text-blue-500 flex items-center justify-center rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
          {icon}
        </div>
        <CardTitle className="text-base text-slate-900">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
    </Card>
  </motion.div>
);

const BodyHome = () => {
  // --- State và Logic ---
  const [isCheckedToday, setIsCheckedToday] = useState(false);
  const [localCurrentWord, setLocalCurrentWord] = useState(getCurrentWord());
  const [localStreak, setLocalStreak] = useState(getStreak());
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isLoggedIn = user && user.accessToken && user.user;

  // --- Cập nhật hàm điều hướng ---
  const navigateLink = (path) => navigate(`/chinese/${path}`);

  const getUserInitials = () => {
    if (user?.user?.gmail && isLoggedIn) {
      return user.user.gmail.substring(0, 2).toUpperCase();
    }
    return "GT";
  };

  const getDisplayName = () => {
    if (user?.user?.gmail && isLoggedIn) {
      return user.user.gmail.split("@")[0];
    }
    return "Guest";
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/chinese/login"); // Đảm bảo route đúng
      return;
    }
    // Logic kiểm tra streak...
    const today = new Date().toDateString();
    const lastCheck = localStorage.getItem("lastCheckDate");
    if (lastCheck !== today) {
      setIsCheckedToday(false);
      localStorage.removeItem("lastCheckDate");
    } else {
      setIsCheckedToday(localStorage.getItem("isCheckedToday") === "true");
    }
  }, [isLoggedIn, navigate]);

  const handleCheckStreak = () => {
    if (!isCheckedToday) {
      // ... Logic xử lý streak
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">
            Đang chuyển hướng đến trang đăng nhập...
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white font-sans z-10">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* === Hero Section === */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <Badge
            variant="outline"
            className="text-sm font-medium border-blue-200 text-blue-600 bg-blue-50 mb-4"
          >
            #1 Ứng dụng học tiếng Trung miễn phí
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
            Học Tiếng Trung Hiệu Quả
            <br />
            <span className="text-blue-500">Mỗi Ngày</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 max-w-2xl mx-auto flex items-center justify-center gap-2">
            和 {getDisplayName()} 一起学习中文
            <Languages className="text-blue-500" />
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button size="lg" onClick={() => navigateLink("flashcard")}>
              Bắt Đầu Học Ngay
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline">
              <PlayCircle className="mr-2 h-5 w-5" />
              Xem Demo
            </Button>
          </div>
        </motion.section>

        {/* === Dashboard Section === */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: User Profile & Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <Card className="shadow-sm border-slate-200">
              <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="h-14 w-14 border-2 border-white">
                  <AvatarImage src={user?.user?.avatarUrl} />
                  <AvatarFallback className="text-lg font-bold bg-blue-100 text-blue-600">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle>{getDisplayName()}</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-orange-400 fill-orange-400" />
                    <span className="font-semibold">{localStreak}</span> ngày
                    Streak
                  </CardDescription>
                </div>
                <Button
                  size="sm"
                  onClick={handleCheckStreak}
                  disabled={isCheckedToday}
                >
                  {isCheckedToday ? "Đã Check" : "Check In"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-slate-600 mb-2">
                    <span>Tiến độ HSK 2</span>
                    <span className="font-semibold text-slate-900">65%</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-dashed border-slate-300 bg-transparent shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5 text-blue-500" />
                  Mục tiêu hôm nay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-700 mb-4">
                  Học 15 từ vựng mới về chủ đề "Gia đình"
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">
                    8/15 từ hoàn thành
                  </span>
                  <Button size="sm" variant="outline">
                    Tiếp tục
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Right Column: 5 Feature Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <FeatureCard
              icon={<BookCopy className="h-5 w-5" />}
              title="Flashcards"
              description="Ôn tập từ vựng hiệu quả"
              onClick={() => navigateLink("flashcard")}
              delay={0.4}
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Bài Tập"
              description="Củng cố kiến thức"
              onClick={() => navigateLink("exercises")}
              delay={0.5}
            />
            <FeatureCard
              icon={<LineChart className="h-5 w-5" />}
              title="Thống Kê"
              description="Theo dõi tiến độ"
              onClick={() => navigateLink("progress")}
              delay={0.6}
            />
            <FeatureCard
              icon={<Library className="h-5 w-5" />}
              title="Thư Viện Từ"
              description="Khám phá kho từ vựng"
              onClick={() => navigateLink("vocabulary")}
              delay={0.7}
            />
            <FeatureCard
              className="sm:col-span-2" // Thẻ này chiếm 2 cột
              icon={<MessageSquare className="h-5 w-5" />}
              title="Cộng Đồng"
              description="Giao lưu, học hỏi và thực hành cùng mọi người"
              onClick={() => navigateLink("community")}
              delay={0.8}
            />
          </div>
        </section>
      </div>
    </main>
  );
};

export default BodyHome;
