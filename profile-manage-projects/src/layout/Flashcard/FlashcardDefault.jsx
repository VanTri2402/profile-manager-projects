import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Lucide React Icons
import { BookUp, Loader2, Play, Sparkles, CheckCircle } from "lucide-react";

// Shadcn/ui Components
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

// Dữ liệu và Logic
import menuHsk from "../../data/menu/menuWord";
import { getProgress, getWords } from "../../api/chineseApi";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/chineseUserSlice";

const FlashcardPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser);
  // Lấy state thật từ Redux thay vì giả lập
  const progress = useSelector((state) => state.chinese.progress);
  const words = useSelector((state) => state.chinese.words);

  const [isLoading, setIsLoading] = useState(true); // Bắt đầu với true để fetch data
  const isLoggedIn = user && user.accessToken;

  // Sử dụng useMemo để tránh tạo lại axios instance mỗi lần render
  const axiosJWT = useMemo(() => {
    if (!user) return null;
    return createAxios(user, dispatch, loginSuccess);
  }, [user, dispatch]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/chinese/login");
      return; // Dừng useEffect nếu chưa đăng nhập
    }

    // --- LỖI ĐÃ ĐƯỢC SỬA Ở ĐÂY ---
    // 1. Định nghĩa hàm `fetchData`
    const fetchData = async () => {
      try {
        // Bạn không cần setIsLoading(true) ở đây nữa vì đã có ở ngoài
        await getProgress(dispatch, axiosJWT, user.accessToken);
        await getWords(dispatch, axiosJWT , user.accessToken);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu trang Flashcard:", error);
        // Có thể xử lý lỗi thêm ở đây, ví dụ: hiển thị thông báo
      } finally {
        setIsLoading(false); // Dừng loading sau khi fetch xong (thành công hoặc thất bại)
      }
    };

    // 2. Gọi hàm vừa định nghĩa
    fetchData();
  }, [isLoggedIn, navigate, dispatch, axiosJWT, user]); // Thêm các dependency cần thiết

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  const currentHskLevel = menuHsk.find(
    (level) => level.id === (words?.currentHSK || "hsk1")
  );
  const wordsInCurrentLevel = currentHskLevel?.vocabCount || 150;
  const progressPercentage =
    (progress?.dailyWordCount / wordsInCurrentLevel) * 100;

  return (
    <main className="w-full min-h-screen bg-white font-sans z-10">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Flashcards
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Chọn một bộ thẻ để bắt đầu ôn tập và củng cố từ vựng của bạn.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-0">
            <div className="flex flex-col md:flex-row items-center justify-between p-8 gap-6">
              <div className="flex-1">
                <CardDescription className="text-blue-200 mb-1">
                  Bài học hiện tại của bạn
                </CardDescription>
                <CardTitle className="text-3xl font-bold text-white mb-4">
                  Tiếp tục với {currentHskLevel?.level || "HSK 1"}
                </CardTitle>
                <div className="flex items-center gap-4 mb-2">
                  <Progress
                    value={progressPercentage}
                    className="h-2 bg-white/30 [&>div]:bg-white"
                  />
                  <span className="text-sm font-medium whitespace-nowrap">
                    {progress?.dailyWordCount || 0} / {wordsInCurrentLevel} từ
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-slate-100 w-full md:w-auto transition-transform hover:scale-105"
                onClick={() =>
                  navigate(
                    `/chinese/flashcard/${currentHskLevel?.id || "hsk1"}`
                  )
                }
              >
                <Play className="mr-2 h-5 w-5" />
                Tiếp tục học
              </Button>
            </div>
          </Card>
        </motion.section>

        <Separator className="my-12 bg-slate-200" />

        <motion.section
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuHsk.map((item) => {
            const isCompleted = progress?.completedLevels?.includes(item.id);
            return (
              <motion.div
                key={item.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card
                  className="h-full flex flex-col bg-slate-50 hover:shadow-lg hover:border-blue-400 border-slate-200 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate(`/chinese/flashcard/${item.id}`)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{item.level}</CardTitle>
                      {isCompleted && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-700 border-green-200"
                        >
                          <CheckCircle className="mr-1.5 h-4 w-4" />
                          Hoàn thành
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{item.name}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <BookUp className="h-4 w-4" />
                      <span>Khoảng {item.vocabCount} từ vựng</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Bắt đầu học
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </motion.section>
      </div>
    </main>
  );
};

export default FlashcardPage;
