import React from "react";
import menuHsk from "../../data/menu/menuWord";
import { useState } from "react";
import { FaPen, FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getCurrentWord } from "../../data/progress/progress";
import { totalWords, totalWordHsk } from "../../data/menu/menuWord";

const Vocabulary = ({ menuItems, onMenuClick }) => {
  const [selectedHsk, setSelectedHsk] = useState(menuHsk[0] || {});
  const [hoveredWord, setHoveredWord] = useState(null);
  const currentWord = getCurrentWord(); // Sử dụng hàm getCurrentWord
  const navigate = useNavigate();

  // ✅ Function bị thiếu - đã thêm
  const handleHskClick = (item) => {
    setSelectedHsk(item);
  };

  const handleNavigateFlashcard = () => {
    // ✅ Sửa cách truyền id qua URL parameter
    const flashcardLink = `/flashcard/${selectedHsk.id}`;
    navigate(flashcardLink);
  };

  return (
    <div className="bg-background flex flex-col md:flex-row gap-6 w-full h-[80vh] p-4">
      <div className="w-full md:w-[130px] bg-gradient-to-b from-blue-500 to-blue-600 shadow-lg rounded-lg">
        <div className="flex flex-col h-full py-4">
          {menuHsk.length > 0 ? (
            menuHsk.map((item) => (
              <div
                key={item.id}
                className={`cursor-pointer transition-all duration-300 text-center flex items-center justify-center font-medium text-white hover:bg-white/20 hover:scale-105 border-b border-white/10 ${
                  selectedHsk.id === item.id ? "bg-white/20 scale-105" : ""
                }`}
                onClick={() => handleHskClick(item)} // ✅ Đã sửa
              >
                <span className="text-lg sm:text-xl">{item.level}</span>
              </div>
            ))
          ) : (
            <div className="text-center text-white">Không có dữ liệu HSK</div>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 sm:pl-[30px] space-y-4 max-h-[70vh] items-center justify-center overflow-y-auto">
        {selectedHsk.link && selectedHsk.link.length > 0 ? (
          selectedHsk.link.map((word, index) => {
            const isLearned = word.id <= currentWord && currentWord > 0;
            return (
              <div
                key={word.id || index}
                className={`bg-white w-full sm:w-[90%] hover:-translate-y-1 cursor-pointer rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 ${
                  isLearned ? "border-green-500 bg-green-75" : "border-red-500"
                }`}
                onMouseEnter={() => setHoveredWord(word.id || index)}
                onMouseLeave={() => setHoveredWord(null)}
              >
                <div className="flex items-center p-4 shadow-xl">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 text-black text-[30px] rounded-lg flex items-center justify-center font-bold sm:text-lg mr-2 sm:mr-4">
                    {index + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                    <div className="text-center">
                      <div className="text-2xl sm:text-3xl font-serif text-gray-800 mb-1">
                        {word.chinese}
                      </div>
                      <div className="text-sm sm:text-base text-gray-500 italic">
                        {word.pinyin}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-base sm:text-lg font-sans text-blue-600 mb-1">
                        {word.vietnamese}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">
                        ({word.type})
                      </div>
                    </div>
                    <div className="flex flex-row gap-4 items-center justify-center text-center">
                      <button
                        className={`inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-medium transition-all duration-300 ${
                          hoveredWord === (word.id || index)
                            ? "bg-red-500 text-white shadow-md transform scale-105"
                            : "bg-red-100 text-red-600 hover:bg-red-200"
                        }`}
                      >
                        <FaPen size={14} />
                        <span className="text-sm sm:text-base">Luyện viết</span>
                      </button>
                      {isLearned && (
                        <FaCheck className="text-green-500 ml-2 text-2xl" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-gray-500">
            Không có từ vựng để hiển thị
          </div>
        )}
      </div>

      <div className="gap-2 font-semibold bg-background text-gray-500 shadow-lg w-[300px] max-h-[230px] flex flex-col items-center justify-center px-4 py-6">
        <div className="text-center text-xl">Progress</div>
        <div className="text-center mt-2">
          số từ đã học được{" "}
          <span className="font-semibold text-xl text-primary-400">
            {currentWord}
          </span>
          / {selectedHsk.link?.length || 0} từ
        </div>
        <div className="text-left text-gray-600">
          level:{" "}
          <span className="text-primary-400 text-left font-bold text-xl">
            {selectedHsk.level}
          </span>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 shadow-md"
          onClick={handleNavigateFlashcard}
          type="button"
        >
          Học bằng Flashcard
        </button>
      </div>
    </div>
  );
};

export default Vocabulary;
