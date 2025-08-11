import React, { useState, useEffect } from "react";

// Icons components (sử dụng lucide-react thay thế react-icons)
import { BookOpen, Monitor, Menu, X } from "lucide-react";
import menuHsk from "../../data/menu/menuWord";
import { useParams, useNavigate } from "react-router-dom";
// Flashcard Component
const Flashcard = ({ onBack }) => {
  const [flippedCards, setFlippedCards] = useState({});
  const [currentHsk, setCurrentHsk] = useState(null);
  const [words, setWords] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const selectedHskId = parseInt(id, 10); // Chuyển id thành số
  // const paramsId = useParams();
  const backgroundColors = [
    "bg-gradient-to-br from-pink-400 via-pink-500 to-red-500",
    "bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600",
    "bg-gradient-to-br from-green-400 via-teal-500 to-blue-500",
    "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500",
    "bg-gradient-to-br from-purple-400 via-purple-500 to-pink-500",
    "bg-gradient-to-br from-indigo-400 via-indigo-500 to-blue-600",
    "bg-gradient-to-br from-teal-400 via-green-500 to-blue-500",
    "bg-gradient-to-br from-red-400 via-pink-500 to-purple-500",
  ];

  useEffect(() => {
    const selectedHsk = menuHsk.find((hsk) => hsk.id === selectedHskId);
    if (selectedHsk) {
      setCurrentHsk(selectedHsk);
      setWords(selectedHsk.link || []);
      setFlippedCards({});
    }
  }, [selectedHskId]);

  const getRandomBackground = (index) => {
    return backgroundColors[index % backgroundColors.length];
  };

  const handleCardClick = (wordId) => {
    setFlippedCards((prev) => {
      const currentState = prev[wordId] || 0;
      const nextState = currentState === 0 ? 1 : 0;
      return {
        ...prev,
        [wordId]: nextState,
      };
    });
  };
  const backout = () => {
    navigate("/flashcard");
  };
  if (!currentHsk) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Đang tải dữ liệu...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen m-auto bg-gray-50 p-4 md:p-6">
      <style jsx>{`
        .flip-card {
          perspective: 1000px;
        }

        .flip-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          text-align: center;
          transition: transform 0.6s;
          transform-style: preserve-3d;
        }

        .flip-card.flipped .flip-card-inner {
          transform: rotateY(180deg);
        }

        .flip-card-front,
        .flip-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          border-radius: 1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .flip-card-back {
          transform: rotateY(180deg);
        }

        @media (min-width: 768px) {
          .flip-card-front,
          .flip-card-back {
            border-radius: 1.5rem;
          }
        }
      `}</style>

      <div className="  max-w-7xl mx-auto">
        <div className="text-center mb-8 flex items-center justify-center gap-9">
          {onBack && (
            <button
              onClick={onBack}
              className="mb-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              ← Quay lại
            </button>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Flashcard {currentHsk.level}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Click vào thẻ để lật và xem nghĩa • Tổng cộng: {words.length} từ
          </p>
          <div className="">
            <button
              onClick={backout}
              className="w-[100px] h-[70px] bg-primary-500 cursor-pointer hover:bg-primary-400 duration-300 transition-colors font-bold text-[16px] rounded-3xl px-4 py-2"
            >
              Quay Lai
            </button>
          </div>
        </div>
      </div>
      <div className=" overflow-y-scroll sm:m-auto md:m-auto lg:m-auto h-screen shadow-xl p-8 w-[65vw] bg-background grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {words.map((word, index) => {
          const isFlipped = flippedCards[word.id] === 1;

          return (
            <div
              key={word.id}
              className={`flip-card ${
                isFlipped ? "flipped" : ""
              } h-48 md:h-56 cursor-pointer transform hover:scale-105 transition-transform duration-300`}
              onClick={() => handleCardClick(word.id)}
            >
              <div className="flip-card-inner">
                <div
                  className={`flip-card-front ${getRandomBackground(
                    index
                  )} shadow-lg text-white hover:shadow-2xl transition-shadow duration-300`}
                >
                  <div className="text-center p-4 relative w-full h-full flex flex-col justify-center">
                    <div className="absolute top-3 right-3 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full font-medium">
                      {word.type}
                    </div>
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 font-serif drop-shadow-lg">
                      {word.chinese}
                    </div>
                    <div className="text-base md:text-lg font-medium opacity-90 drop-shadow">
                      {word.pinyin}
                    </div>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-xs opacity-70">
                      Click để xem nghĩa
                    </div>
                  </div>
                </div>

                <div
                  className={`flip-card-back ${getRandomBackground(
                    index
                  )} shadow-lg text-white hover:shadow-2xl transition-shadow duration-300`}
                >
                  <div className="text-center p-4 relative w-full h-full flex flex-col justify-center">
                    <div className="absolute top-3 right-3 text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full font-medium">
                      Nghĩa
                    </div>
                    <div className="text-xl md:text-2xl font-bold mb-3 drop-shadow-lg">
                      {word.vietnamese}
                    </div>
                    <div className="text-sm md:text-base opacity-75 drop-shadow">
                      {word.chinese} ({word.pinyin})
                    </div>
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-xs opacity-70">
                      Click để quay lại
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {words.length > 0 && (
        <div className="text-center mt-12 p-6 bg-white rounded-lg shadow-sm">
          <div className="text-gray-600">
            <span className="font-semibold text-blue-600">
              {currentHsk.level}
            </span>{" "}
            - Tổng cộng {words.length} từ vựng
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Đã lật:{" "}
            {
              Object.keys(flippedCards).filter((key) => flippedCards[key] === 1)
                .length
            }{" "}
            thẻ
          </div>
        </div>
      )}
    </div>
  );
};
export default Flashcard;
