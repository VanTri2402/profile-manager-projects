import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

// Lucide React Icons
import {
  Flame,
  Target,
  Trophy,
  BookCopy,
  Star,
  Award,
  CalendarCheck,
  Loader2,
} from "lucide-react";

// Shadcn/ui Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Dữ liệu và Logic
import menuHsk from "../../data/menu/menuWord";
// import { getProgress, getWords } from "../../api/chineseApi";
// import { createAxios } from "../../createInstance";
// import { loginSuccess } from "../../redux/chineseUserSlice";

// --- MOCK DATA for Chart & Achievements (Dữ liệu giả để hiển thị) ---
const weeklyActivityData = [
  { day: "T2", words: 5 },
  { day: "T3", words: 8 },
  { day: "T4", words: 12 },
  { day: "T5", words: 7 },
  { day: "T6", words: 15 },
  { day: "T7", words: 10 },
  { day: "CN", words: 20 },
];

const achievementsData = [
  {
    icon: <Flame className="h-6 w-6" />,
    title: "Chuỗi 7 ngày",
    unlocked: true,
  },
  {
    icon: <BookCopy className="h-6 w-6" />,
    title: "100 từ đầu tiên",
    unlocked: true,
  },
  {
    icon: <Trophy className="h-6 w-6" />,
    title: "Hoàn thành HSK 1",
    unlocked: true,
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Học viên chăm chỉ",
    unlocked: false,
  },
  {
    icon: <CalendarCheck className="h-6 w-6" />,
    title: "Check-in 1 tháng",
    unlocked: false,
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Bậc thầy HSK 2",
    unlocked: false,
  },
];
// --------------------------------------------------------------------

const ProgressPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth .login?.currentUser);
  const { streak, progress, lastCheckIn, dailyWordCount, totalWordsLearned } =
    useSelector((state) => state.chinese.progress);
  const { currentHSK } = useSelector((state) => state.chinese.words);

  const [isLoading, setIsLoading] = useState(false);
  const isLoggedIn = user && user.accessToken;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/chinese/login");
    }
    // Logic fetch data thật của bạn sẽ ở đây
  }, [isLoggedIn, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white font-sans z-10">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* === Header === */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Tiến độ học tập
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Chào mừng quay trở lại, {user?.username || "bạn"}! Cùng xem lại hành
            trình của mình nhé.
          </p>
        </motion.section>

        <Separator className="my-8 bg-slate-200" />

        {/* === Key Metrics === */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          <KeyMetricCard
            icon={<Flame className="text-orange-500" />}
            value={streak || 0}
            label="Ngày Streak"
            delay={0.1}
          />
          <KeyMetricCard
            icon={<BookCopy className="text-blue-500" />}
            value={totalWordsLearned || 0}
            label="Tổng số từ đã học"
            delay={0.2}
          />
          <KeyMetricCard
            icon={<Trophy className="text-amber-500" />}
            value={achievementsData.filter((a) => a.unlocked).length}
            label="Thành tích đạt được"
            delay={0.3}
          />
        </motion.section>

        {/* === Main Dashboard Grid === */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Weekly Activity Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Hoạt động 7 ngày qua</CardTitle>
                  <CardDescription>
                    Biểu đồ số từ mới bạn đã học mỗi ngày.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={weeklyActivityData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="day"
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="#94a3b8"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        allowDecimals={false}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "white",
                          border: "1px solid #e2e8f0",
                          borderRadius: "0.5rem",
                        }}
                      />
                      <Bar
                        dataKey="words"
                        fill="hsl(221.2 83.2% 53.3%)"
                        radius={[4, 4, 0, 0]}
                        name="Từ mới"
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Thành Tích</CardTitle>
                  <CardDescription>
                    Những cột mốc đáng nhớ trên hành trình của bạn.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {achievementsData.map((ach, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center justify-center text-center p-4 rounded-lg border ${
                        ach.unlocked
                          ? "bg-amber-50 border-amber-200"
                          : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          ach.unlocked
                            ? "bg-amber-100 text-amber-500"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {ach.icon}
                      </div>
                      <p
                        className={`font-semibold text-sm ${
                          ach.unlocked ? "text-amber-900" : "text-slate-600"
                        }`}
                      >
                        {ach.title}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Overall HSK Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Lộ trình HSK</CardTitle>
                  <CardDescription>
                    Tiến độ tổng quan qua các cấp độ.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {menuHsk.map((level) => {
                    // Giả lập tiến độ cho mỗi level
                    const levelProgress =
                      level.id === "hsk1" ? 100 : level.id === "hsk2" ? 65 : 0;
                    return (
                      <div key={level.id}>
                        <div className="flex justify-between items-center mb-1">
                          <p className="font-medium text-sm text-slate-800">
                            {level.level}
                          </p>
                          <p className="font-medium text-sm text-slate-600">
                            {levelProgress}%
                          </p>
                        </div>
                        <Progress value={levelProgress} />
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

// Component con cho các thẻ chỉ số chính
const KeyMetricCard = ({ icon, value, label, delay }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
    transition={{ duration: 0.5, delay }}
  >
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {label}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900">{value}</div>
      </CardContent>
    </Card>
  </motion.div>
);

export default ProgressPage;
