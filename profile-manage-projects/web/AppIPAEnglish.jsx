import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Volume2,
  Play,
  Pause,
  RotateCcw,
  Target,
  Award,
  BookOpen,
  Headphones,
} from "lucide-react";

const AppIPALearning = () => {
  // IPA symbols with examples and audio
  const ipaData = {
    vowels: [
      { symbol: "iː", example: "see", word: "see", audio: "si:" },
      { symbol: "ɪ", example: "sit", word: "sit", audio: "sɪt" },
      { symbol: "e", example: "bed", word: "bed", audio: "bed" },
      { symbol: "æ", example: "cat", word: "cat", audio: "kæt" },
      { symbol: "ɑː", example: "car", word: "car", audio: "kɑː" },
      { symbol: "ɒ", example: "hot", word: "hot", audio: "hɒt" },
      { symbol: "ɔː", example: "saw", word: "saw", audio: "sɔː" },
      { symbol: "ʊ", example: "put", word: "put", audio: "pʊt" },
      { symbol: "uː", example: "too", word: "too", audio: "tuː" },
      { symbol: "ʌ", example: "cup", word: "cup", audio: "kʌp" },
      { symbol: "ɜː", example: "bird", word: "bird", audio: "bɜːd" },
      { symbol: "ə", example: "about", word: "about", audio: "əˈbaʊt" },
    ],
    consonants: [
      { symbol: "p", example: "pen", word: "pen", audio: "pen" },
      { symbol: "b", example: "big", word: "big", audio: "bɪg" },
      { symbol: "t", example: "top", word: "top", audio: "tɒp" },
      { symbol: "d", example: "dog", word: "dog", audio: "dɒg" },
      { symbol: "k", example: "cat", word: "cat", audio: "kæt" },
      { symbol: "g", example: "go", word: "go", audio: "gəʊ" },
      { symbol: "f", example: "fish", word: "fish", audio: "fɪʃ" },
      { symbol: "v", example: "very", word: "very", audio: "ˈveri" },
      { symbol: "θ", example: "think", word: "think", audio: "θɪŋk" },
      { symbol: "ð", example: "this", word: "this", audio: "ðɪs" },
      { symbol: "s", example: "see", word: "see", audio: "siː" },
      { symbol: "z", example: "zoo", word: "zoo", audio: "zuː" },
      { symbol: "ʃ", example: "shoe", word: "shoe", audio: "ʃuː" },
      { symbol: "ʒ", example: "measure", word: "measure", audio: "ˈmeʒə" },
      { symbol: "tʃ", example: "chair", word: "chair", audio: "tʃeə" },
      { symbol: "dʒ", example: "job", word: "job", audio: "dʒɒb" },
      { symbol: "h", example: "hot", word: "hot", audio: "hɒt" },
      { symbol: "m", example: "man", word: "man", audio: "mæn" },
      { symbol: "n", example: "no", word: "no", audio: "nəʊ" },
      { symbol: "ŋ", example: "sing", word: "sing", audio: "sɪŋ" },
      { symbol: "l", example: "let", word: "let", audio: "let" },
      { symbol: "r", example: "red", word: "red", audio: "red" },
      { symbol: "w", example: "win", word: "win", audio: "wɪn" },
      { symbol: "j", example: "yes", word: "yes", audio: "jes" },
    ],
    diphthongs: [
      { symbol: "eɪ", example: "day", word: "day", audio: "deɪ" },
      { symbol: "aɪ", example: "my", word: "my", audio: "maɪ" },
      { symbol: "ɔɪ", example: "boy", word: "boy", audio: "bɔɪ" },
      { symbol: "aʊ", example: "now", word: "now", audio: "naʊ" },
      { symbol: "əʊ", example: "go", word: "go", audio: "gəʊ" },
      { symbol: "ɪə", example: "ear", word: "ear", audio: "ɪə" },
      { symbol: "eə", example: "air", word: "air", audio: "eə" },
      { symbol: "ʊə", example: "poor", word: "poor", audio: "pʊə" },
    ],
  };

  const [currentTab, setCurrentTab] = useState("learn");
  const [selectedCategory, setSelectedCategory] = useState("vowels");
  const [selectedSymbol, setSelectedSymbol] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameMode, setGameMode] = useState("listen"); // 'listen' or 'read'
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [gameQuestions, setGameQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game questions
  const initializeGame = (mode) => {
    const allSymbols = [
      ...ipaData.vowels,
      ...ipaData.consonants,
      ...ipaData.diphthongs,
    ];
    const shuffled = allSymbols.sort(() => Math.random() - 0.5).slice(0, 10);
    const questions = shuffled.map((symbol) => {
      const wrongAnswers = allSymbols
        .filter((s) => s.symbol !== symbol.symbol)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      const options = [symbol, ...wrongAnswers].sort(() => Math.random() - 0.5);
      return {
        ...symbol,
        options,
        correctAnswer: symbol.symbol,
      };
    });
    setGameQuestions(questions);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameStarted(true);
  };

  // Text-to-speech function (simplified)
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      setIsPlaying(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.lang = "en-US";
      utterance.onend = () => setIsPlaying(false);
      speechSynthesis.speak(utterance);
    }
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === gameQuestions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }

    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setGameStarted(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const renderLearningMode = () => (
    <div className="space-y-6">
      {/* Category Selection */}
      <div className="flex flex-wrap gap-4 justify-center">
        {Object.keys(ipaData).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                : "bg-white border-2 border-gray-200 text-gray-700 hover:border-blue-300"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* IPA Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {ipaData[selectedCategory].map((item, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl p-4 border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
              selectedSymbol?.symbol === item.symbol
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedSymbol(item)}
          >
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600">
                /{item.symbol}/
              </div>
              <div className="text-sm text-gray-600">{item.example}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  speakText(item.word);
                }}
                className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Symbol Details */}
      {selectedSymbol && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
          <div className="text-center space-y-4">
            <div className="text-6xl font-bold text-blue-600">
              /{selectedSymbol.symbol}/
            </div>
            <div className="text-2xl font-semibold text-gray-800">
              Example:{" "}
              <span className="text-blue-600">{selectedSymbol.word}</span>
            </div>
            <div className="text-lg text-gray-600">
              IPA: /{selectedSymbol.audio}/
            </div>
            <button
              onClick={() => speakText(selectedSymbol.word)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              Listen
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderGameMode = () => {
    if (!gameStarted) {
      return (
        <div className="text-center space-y-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Choose Game Mode
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <button
                onClick={() => {
                  setGameMode("listen");
                  initializeGame("listen");
                }}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <Headphones className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Listening Practice</h3>
                <p className="text-green-100">
                  Listen to sounds and choose the correct IPA symbol
                </p>
              </button>
              <button
                onClick={() => {
                  setGameMode("read");
                  initializeGame("read");
                }}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl hover:shadow-lg transition-all duration-300"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Reading Practice</h3>
                <p className="text-purple-100">
                  See IPA symbols and choose the correct word
                </p>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (showResult) {
      const percentage = Math.round((score / gameQuestions.length) * 100);
      return (
        <div className="text-center space-y-6">
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 border border-yellow-200">
            <Award className="w-16 h-16 mx-auto mb-4 text-yellow-600" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Game Complete!
            </h2>
            <div className="text-6xl font-bold text-yellow-600 mb-4">
              {percentage}%
            </div>
            <p className="text-xl text-gray-600 mb-6">
              You scored {score} out of {gameQuestions.length} questions
              correctly!
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={resetGame}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
              >
                Play Again
              </button>
              <button
                onClick={() => setCurrentTab("learn")}
                className="bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-gray-400 transition-all duration-300"
              >
                Back to Learning
              </button>
            </div>
          </div>
        </div>
      );
    }

    const currentQ = gameQuestions[currentQuestion];
    return (
      <div className="space-y-6">
        {/* Progress */}
        <div className="bg-white rounded-xl p-4 border-2 border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-gray-600">
              Question {currentQuestion + 1} of {gameQuestions.length}
            </span>
            <span className="text-sm font-semibold text-green-600">
              Score: {score}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestion + 1) / gameQuestions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200 text-center">
          {gameMode === "listen" ? (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Listen and choose the correct IPA symbol
              </h3>
              <button
                onClick={() => speakText(currentQ.word)}
                className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <Volume2 className="w-5 h-5" />
                Play Sound
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Choose the correct word for this IPA symbol
              </h3>
              <div className="text-6xl font-bold text-blue-600">
                /{currentQ.symbol}/
              </div>
            </div>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-4">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                handleAnswerSelect(
                  gameMode === "listen" ? option.symbol : option.word
                )
              }
              className={`p-4 rounded-xl border-2 font-semibold transition-all duration-300 ${
                selectedAnswer ===
                (gameMode === "listen" ? option.symbol : option.word)
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
              }`}
            >
              {gameMode === "listen" ? `/${option.symbol}/` : option.word}
            </button>
          ))}
        </div>

        {/* Next Button */}
        {selectedAnswer && (
          <div className="text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              {currentQuestion < gameQuestions.length - 1
                ? "Next Question"
                : "Show Results"}
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            IPA Learning
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Center
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master English pronunciation with interactive IPA (International
            Phonetic Alphabet) training
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-xl p-2 border-2 border-gray-200 flex gap-2">
            <button
              onClick={() => setCurrentTab("learn")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentTab === "learn"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <BookOpen className="w-5 h-5 inline mr-2" />
              Learn
            </button>
            <button
              onClick={() => setCurrentTab("practice")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentTab === "practice"
                  ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Target className="w-5 h-5 inline mr-2" />
              Practice
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
          {currentTab === "learn" ? renderLearningMode() : renderGameMode()}
        </div>
      </div>
    </div>
  );
};

export default AppIPALearning;
