import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"; // Sử dụng hook của Redux
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Lucide React Icons
import {
  BookMarked,
  CheckCircle2,
  PenLine,
  Sparkles,
  Loader2,
} from "lucide-react";

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Dữ liệu
import menuHsk from "../../data/menu/menuWord";

const Vocabulary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // --- THAY ĐỔI QUAN TRỌNG: Cập nhật Redux Selector ---
  // 1. Lấy user từ chineseUser slice thay vì auth slice
  const user = useSelector((state) => state.auth.login?.currentUser);

  // 2. Lấy dữ liệu tiến trình từ chinese slice
  const { currentWord, isLoading } = useSelector(
    (state) => state.chinese.progress
  );

  const [selectedHsk, setSelectedHsk] = useState(menuHsk[0] || {});

  const isLoggedIn = user && user.accessToken;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/chinese/login");
    }
    // Ở đây bạn có thể dispatch một action để fetch dữ liệu từ vựng nếu cần
    // dispatch(fetchVocabularyData());
  }, [isLoggedIn, navigate, dispatch]);

  const handleHskClick = (item) => {
    setSelectedHsk(item);
  };

  const handleNavigateFlashcard = () => {
    const flashcardLink = `/chinese/flashcard/${selectedHsk.id}`;
    navigate(flashcardLink);
  };

  const wordsInLevel = selectedHsk.link?.length || 0;
  // 3. Sử dụng currentWord từ Redux, có thể cần check null/undefined
  const wordsLearnedInLevel = Math.min(currentWord || 0, wordsInLevel);
  const progressPercentage =
    wordsInLevel > 0 ? (wordsLearnedInLevel / wordsInLevel) * 100 : 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

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
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Thư Viện Từ Vựng
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Khám phá và ôn tập từ vựng theo từng cấp độ HSK.
              </p>
            </div>
            <div className="flex-shrink-0 p-1 bg-slate-100 rounded-lg flex gap-1">
              {menuHsk.map((item) => (
                <Button
                  key={item.id}
                  variant={selectedHsk.id === item.id ? "default" : "ghost"}
                  onClick={() => handleHskClick(item)}
                  className={`transition-all duration-300 ${
                    selectedHsk.id === item.id
                      ? "bg-blue-500 text-white shadow"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {item.level}
                </Button>
              ))}
            </div>
          </div>
        </motion.section>

        <Separator className="my-8 bg-slate-200" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <motion.div
            key={selectedHsk.id}
            className="lg:col-span-2 max-h-[calc(100vh-320px)] overflow-y-auto pr-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {selectedHsk.link && selectedHsk.link.length > 0 ? (
              <div className="space-y-3">
                {selectedHsk.link.map((word, index) => {
                  const isLearned = word.id <= (currentWord || 0);
                  return (
                    <motion.div
                      key={word.id || index}
                      variants={itemVariants}
                      className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-blue-300 hover:bg-white transition-colors duration-300"
                    >
                      <div className="grid grid-cols-12 items-center gap-4">
                        <div className="col-span-1 text-center text-slate-500 font-medium">
                          {index + 1}
                        </div>
                        <div className="col-span-4">
                          <p className="text-2xl font-serif text-slate-800">
                            {word.chinese}
                          </p>
                          <p className="text-sm text-slate-500 italic">
                            {word.pinyin}
                          </p>
                        </div>
                        <div className="col-span-4">
                          <p className="text-base font-sans text-blue-600">
                            {word.vietnamese}
                          </p>
                          <p className="text-xs text-slate-400">
                            ({word.type})
                          </p>
                        </div>
                        <div className="col-span-3 flex items-center justify-end gap-3">
                          {isLearned && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Đã học</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <Button variant="ghost" size="sm" className="h-8">
                            <PenLine className="mr-2 h-4 w-4" />
                            Luyện viết
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-500">
                Không có từ vựng để hiển thị.
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-1 sticky top-24"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookMarked className="h-6 w-6 text-blue-500" />
                  Tiến Trình {selectedHsk.level}
                </CardTitle>
                <CardDescription>
                  Bạn đã học được {wordsLearnedInLevel} trên tổng số{" "}
                  {wordsInLevel} từ.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={progressPercentage} className="h-2 mb-4" />
                <div className="flex justify-between items-center text-sm text-slate-600 mb-6">
                  <span>Bắt đầu</span>
                  <span>Hoàn thành</span>
                </div>
                <Button
                  size="lg"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                  onClick={handleNavigateFlashcard}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Học bằng Flashcard
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Vocabulary;
