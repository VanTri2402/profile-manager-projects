import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Loader2, Target, Trophy, ChevronsRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import menuHsk from "../../data/menu/menuWord";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Hàm helper để tạo câu hỏi
const createQuiz = (words, questionCount = 10) => {
  const shuffled = [...words].sort(() => 0.5 - Math.random());
  const selectedWords = shuffled.slice(0, questionCount);

  return selectedWords.map((correctAnswer) => {
    const distractors = shuffled
      .filter((word) => word.id !== correctAnswer.id)
      .slice(0, 3)
      .map((d) => d.vietnamese);

    const options = [correctAnswer.vietnamese, ...distractors].sort(
      () => 0.5 - Math.random()
    );

    return {
      question: correctAnswer.chinese,
      pinyin: correctAnswer.pinyin,
      options,
      correctAnswer: correctAnswer.vietnamese,
    };
  });
};

const PracticeSession = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const hskLevel = menuHsk.find((hsk) => hsk.id == id);
    if (hskLevel && hskLevel.link) {
      setQuestions(createQuiz(hskLevel.link, 10)); // Tạo 10 câu hỏi
    } else {
      navigate("/chinese/practice");
    }
  }, [id, navigate]);

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return; // Không cho chọn lại khi đã có kết quả

    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].correctAnswer) {
      setIsCorrect(true);
      setScore((s) => s + 1);
    } else {
      setIsCorrect(false);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setIsFinished(true); // Kết thúc bài tập
    }
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <main className="w-full h-screen bg-slate-50 font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* === Header: Progress & Score === */}
        <header className="mb-8">
          <div className="flex justify-between items-center mb-2 text-slate-600 font-medium">
            <p>
              Câu hỏi {currentQuestionIndex + 1} / {questions.length}
            </p>
            <p>
              Điểm: <span className="text-blue-500 font-bold">{score}</span>
            </p>
          </div>
          <Progress value={progressPercentage} />
        </header>

        {/* === Question & Options === */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="text-center mb-8">
              <p className="text-lg text-slate-600">Chọn nghĩa đúng cho từ:</p>
              <h1 className="text-7xl font-serif text-slate-900 my-4">
                {currentQuestion.question}
              </h1>
              <p className="text-2xl text-slate-500">
                {currentQuestion.pinyin}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isTheCorrectAnswer =
                  option === currentQuestion.correctAnswer;

                let buttonVariant = "outline";
                let buttonClass = "";
                if (isSelected) {
                  buttonVariant = isCorrect ? "default" : "destructive";
                  buttonClass = isCorrect
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-red-500 hover:bg-red-600";
                } else if (selectedAnswer && isTheCorrectAnswer) {
                  buttonVariant = "default";
                  buttonClass = "bg-green-500 opacity-50"; // Làm mờ đáp án đúng nếu chọn sai
                }

                return (
                  <Button
                    key={index}
                    variant={buttonVariant}
                    className={`h-auto py-4 text-lg transition-all duration-300 ${buttonClass}`}
                    onClick={() => handleAnswerClick(option)}
                    disabled={!!selectedAnswer}
                  >
                    {option}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* === Feedback & Continue Button === */}
        <AnimatePresence>
          {selectedAnswer && (
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2
                className={`text-2xl font-bold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? "Chính xác!" : "Sai rồi!"}
              </h2>
              {!isCorrect && (
                <p className="text-slate-600 mt-1">
                  Đáp án đúng là:{" "}
                  <span className="font-bold">
                    {currentQuestion.correctAnswer}
                  </span>
                </p>
              )}
              <Button className="mt-4" size="lg" onClick={handleNextQuestion}>
                {currentQuestionIndex === questions.length - 1
                  ? "Hoàn thành"
                  : "Câu tiếp theo"}{" "}
                <ChevronsRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* === Results Dialog === */}
      <Dialog open={isFinished} onOpenChange={setIsFinished}>
        <DialogContent>
          <DialogHeader className="items-center text-center">
            <Trophy className="w-16 h-16 text-amber-400 mb-4" />
            <DialogTitle className="text-2xl">
              Hoàn thành bài luyện tập!
            </DialogTitle>
            <DialogDescription>
              Chúc mừng bạn đã hoàn thành. Cùng xem lại kết quả nhé.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <p className="text-center text-4xl font-bold">
              {score} / {questions.length}
            </p>
            <p className="text-center text-slate-600">Điểm số của bạn</p>
          </div>
          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/chinese/practice")}
            >
              Quay về
            </Button>
            <Button onClick={() => window.location.reload()}>Làm lại</Button>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default PracticeSession;
