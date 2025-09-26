import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

// Lucide React Icons
import {
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Shuffle,
  Loader2,
  Volume2,
} from "lucide-react";

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

// Dữ liệu
import menuHsk from "../../data/menu/menuWord";

const FlashcardSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.login?.currentUser) || {
    accessToken: true,
  }; // Giả lập user
  const isLoggedIn = user && user.accessToken;

  const [words, setWords] = useState([]);
  const [currentHsk, setCurrentHsk] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [learnedWords, setLearnedWords] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/chinese/login");
      return;
    }

    const selectedHsk = menuHsk.find((hsk) => hsk.id == id);
    if (selectedHsk) {
      setCurrentHsk(selectedHsk);
      setWords(selectedHsk.link || []);
    } else {
      navigate("/chinese/flashcard");
    }
    setIsLoading(false);
  }, [id, isLoggedIn, navigate]);

  const handleFlip = () => setIsFlipped((prev) => !prev);

  const handleNext = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleToggleLearned = () => {
    setLearnedWords((prev) => {
      const newSet = new Set(prev);
      const currentWordId = words[currentIndex].id;
      if (newSet.has(currentWordId)) {
        newSet.delete(currentWordId);
      } else {
        newSet.add(currentWordId);
      }
      return newSet;
    });
  };

  const handleShuffle = () => {
    setWords((prevWords) => [...prevWords].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const currentWord = words[currentIndex];
  const progressPercentage =
    words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0;

  if (isLoading || !currentWord) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="w-full h-screen bg-white font-sans z-10 flex flex-col p-4 sm:p-6 lg:p-8 overflow-hidden">
      <header className="w-full max-w-5xl mx-auto mb-6">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/chinese/flashcard")}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-slate-900">
              {currentHsk?.level}
            </h1>
            <p className="text-sm text-slate-600">
              {currentIndex + 1} / {words.length}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={handleShuffle}>
            <Shuffle className="h-5 w-5" />
          </Button>
        </div>
        <Progress value={progressPercentage} className="h-2 mt-3" />
      </header>

      <div
        className="flex-1 flex flex-col items-center justify-center w-full"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence>
          <motion.div
            key={currentIndex}
            className="w-full max-w-2xl h-[400px] md:h-[450px]"
            onClick={handleFlip}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <motion.div
              className="relative w-full h-full cursor-pointer"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              {/* Card Front */}
              <Card
                className="absolute w-full h-full flex flex-col items-center justify-center p-6 bg-slate-50 border-slate-200"
                style={{ backfaceVisibility: "hidden" }}
              >
                <CardContent className="flex flex-col items-center justify-center text-center gap-4">
                  <Badge variant="outline">{currentWord.type}</Badge>
                  <p className="text-6xl md:text-8xl font-serif text-slate-900">
                    {currentWord.chinese}
                  </p>
                  <p className="text-xl md:text-2xl text-slate-500">
                    {currentWord.pinyin}
                  </p>
                </CardContent>
              </Card>

              {/* Card Back */}
              <Card
                className="absolute w-full h-full flex flex-col items-center justify-center p-6 bg-blue-500 border-blue-600 text-white"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <CardContent className="flex flex-col items-center justify-center text-center gap-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 text-white hover:bg-white/20"
                  >
                    <Volume2 />
                  </Button>
                  <p className="text-3xl md:text-4xl font-bold">
                    {currentWord.vietnamese}
                  </p>
                  <p className="text-lg md:text-xl opacity-80">
                    {currentWord.pinyin}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="w-full max-w-2xl mx-auto mt-6">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            variant={learnedWords.has(currentWord.id) ? "default" : "outline"}
            className={`w-40 transition-colors ${
              learnedWords.has(currentWord.id)
                ? "bg-green-500 hover:bg-green-600 border-green-500"
                : ""
            }`}
            onClick={handleToggleLearned}
          >
            {learnedWords.has(currentWord.id) ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <X className="mr-2 h-4 w-4" />
            )}
            {learnedWords.has(currentWord.id) ? "Đã thuộc" : "Chưa thuộc"}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-2 h-5 w-5" /> Trước
          </Button>
          <Button
            size="lg"
            onClick={handleNext}
            disabled={currentIndex === words.length - 1}
          >
            Tiếp theo <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </footer>
    </main>
  );
};

export default FlashcardSession;
