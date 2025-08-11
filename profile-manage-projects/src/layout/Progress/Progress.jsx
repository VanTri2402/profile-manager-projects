import React, { useState, useEffect } from "react";
import {
  FaFire,
  FaTrophy,
  FaBook,
  FaGraduationCap,
  FaChevronRight,
  FaCheck,
  FaClock,
  FaBullseye,
  FaStar,
} from "react-icons/fa";
import menuHsk from "../../data/menu/menuWord";
const Progress = () => {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [currentWord, setCurrentWord] = useState(175);

  useEffect(() => {
    // Set default selected level to HSK 2
    if (menuHsk.length > 1) {
      setSelectedLevel(menuHsk[1]); // HSK 2 (index 1)
    }
  }, []);

  // Hàm tính phần trăm tiến trình
  const calculateProgress = (vocabCount) => {
    const progress = (currentWord / vocabCount) * 100;
    return Math.max(Math.floor(progress), progress > 0 ? 1 : 0);
  };

  // Hàm xử lý khi click vào level
  const handleLevelClick = (level) => {
    setSelectedLevel(level);
  };

  // Hàm tạo style cho circular progress
  const getCircularProgressStyle = (progress) => {
    const angle = Math.max((progress / 100) * 360, progress > 0 ? 3.6 : 0);
    return {
      background: `conic-gradient(from -90deg, #EF4444 0deg, #EF4444 ${angle}deg, #E5E7EB ${angle}deg, #E5E7EB 360deg)`,
      borderRadius: "50%",
      position: "relative",
    };
  };

  // Get level difficulty info
  const getLevelInfo = (levelId) => {
    const info = {
      1: {
        difficulty: "Cơ bản",
        time: "1-2 tháng",
        desc: "Giao tiếp đơn giản, giới thiệu bản thân",
      },
      2: {
        difficulty: "Sơ cấp",
        time: "2-3 tháng",
        desc: "Giao tiếp cơ bản trong tình huống đơn giản",
      },
      3: {
        difficulty: "Trung cấp dưới",
        time: "3-4 tháng",
        desc: "Hiểu và sử dụng tiếng Trung trong công việc, học tập",
      },
      4: {
        difficulty: "Trung cấp",
        time: "4-6 tháng",
        desc: "Thảo luận nhiều chủ đề, đọc báo đơn giản",
      },
      5: {
        difficulty: "Trung cấp trên",
        time: "6-8 tháng",
        desc: "Đọc, viết các văn bản phức tạp",
      },
      6: {
        difficulty: "Cao cấp",
        time: "8-12 tháng",
        desc: "Sử dụng tiếng Trung thành thạo như người bản xứ",
      },
    };
    return info[levelId] || info[1];
  };

  const selectedProgress = selectedLevel
    ? calculateProgress(selectedLevel.vocabCount)
    : 0;
  const selectedWordsLearned = selectedLevel
    ? Math.min(currentWord, selectedLevel.vocabCount)
    : 0;

  return (
    <div className="flex bg-gradient-to-br from-primary-50 to-red-orange-50 min-h-screen w-full">
      {/* Left Sidebar - HSK Levels */}
      <div className="w-[360px] p-6 bg-white border-r border-primary-100 flex-shrink-0 shadow-lg">
        <div className="mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent mb-2">
            Cấp Độ HSK
          </h1>
          <p className="text-gray-600 text-sm">Chọn cấp độ để xem tiến trình</p>
        </div>

        <div className="flex flex-col gap-3">
          {menuHsk.map((item) => {
            const isSelected = selectedLevel?.id === item.id;
            const progress = calculateProgress(item.vocabCount);
            const wordsLearned = Math.min(currentWord, item.vocabCount);
            const isCompleted = currentWord >= item.vocabCount;

            return (
              <div
                key={item.id}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-md group ${
                  isSelected
                    ? "border-primary-500 bg-primary-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-primary-300"
                }`}
                onClick={() => handleLevelClick(item)}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                        isSelected
                          ? "bg-primary-600 text-white"
                          : "bg-primary-100 text-primary-600 group-hover:bg-primary-200"
                      }`}
                    >
                      {item.id}
                    </div>
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <FaCheck className="text-white text-xs" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      {item.level}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <FaBook className="w-3 h-3" />
                      <span>{item.vocabCount} từ vựng</span>
                    </div>

                    {/* Mini progress bar */}
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isCompleted ? "bg-green-500" : "bg-primary-500"
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {wordsLearned}/{item.vocabCount} (
                      {Math.min(progress, 100)}%)
                    </div>
                  </div>

                  <FaChevronRight
                    className={`text-gray-400 transition-all duration-300 ${
                      isSelected
                        ? "text-primary-600 rotate-90"
                        : "group-hover:text-primary-500"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Overall Stats */}
        <div className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-red-orange-50 rounded-xl border border-primary-100">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <FaTrophy className="text-warning-500" />
            Thống kê tổng
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tổng từ học:</span>
              <span className="font-semibold text-primary-700">
                {currentWord}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cấp hoàn thành:</span>
              <span className="font-semibold text-green-600">
                {
                  menuHsk.filter((level) => currentWord >= level.vocabCount)
                    .length
                }
                /6
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 w-full">
        <div className="w-full max-w-none mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-red-orange-600 bg-clip-text text-transparent mb-3">
              Tiến Trình Học Tiếng Trung
            </h1>
            <p className="text-gray-600 text-lg">
              Theo dõi quá trình học từ vựng HSK của bạn
            </p>
          </div>

          {selectedLevel && (
            <div className="space-y-8">
              {/* Main Progress Card */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-primary-100">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Left: Circular Progress */}
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div
                          className="w-56 h-56 rounded-full flex items-center justify-center shadow-lg"
                          style={getCircularProgressStyle(selectedProgress)}
                        >
                          <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center shadow-inner">
                            <div className="text-center">
                              <div className="text-5xl font-bold text-gray-800 mb-2">
                                {selectedProgress}%
                              </div>
                              <div className="text-gray-600 text-sm font-medium">
                                {selectedWordsLearned}/
                                {selectedLevel.vocabCount}
                              </div>
                              <div className="text-gray-500 text-xs">
                                từ vựng
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Floating elements */}
                        <div className="absolute -top-2 -right-2 bg-warning-400 rounded-full p-2 shadow-lg animate-bounce">
                          <FaStar className="text-warning-800 text-sm" />
                        </div>

                        {selectedProgress === 100 && (
                          <div className="absolute -bottom-2 -left-2 bg-green-500 text-white px-3 py-1 rounded-full text-xs shadow-lg animate-pulse">
                            Hoàn thành! 🎉
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Level Info */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {selectedLevel.level}
                      </h2>
                      <p className="text-gray-600">
                        {getLevelInfo(selectedLevel.id).desc}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-medium text-gray-700">
                          Tiến độ hiện tại
                        </span>
                        <span className="text-lg font-bold text-primary-600">
                          {selectedWordsLearned}/{selectedLevel.vocabCount}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                        <div
                          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-1000 ease-out relative"
                          style={{
                            width: `${Math.max(
                              selectedProgress,
                              selectedProgress > 0 ? 2 : 0
                            )}%`,
                          }}
                        >
                          <div className="absolute inset-0 bg-white opacity-30 animate-pulse"></div>
                        </div>
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-primary-50 rounded-lg">
                        <FaBullseye className="text-primary-500 mx-auto mb-1 text-lg" />
                        <div className="text-sm text-gray-600">Mục tiêu</div>
                        <div className="font-bold text-primary-700">
                          {selectedLevel.vocabCount}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <FaCheck className="text-green-500 mx-auto mb-1 text-lg" />
                        <div className="text-sm text-gray-600">Đã học</div>
                        <div className="font-bold text-green-700">
                          {selectedWordsLearned}
                        </div>
                      </div>
                      <div className="text-center p-3 bg-red-orange-50 rounded-lg">
                        <FaClock className="text-red-orange-500 mx-auto mb-1 text-lg" />
                        <div className="text-sm text-gray-600">Còn lại</div>
                        <div className="font-bold text-red-orange-700">
                          {selectedLevel.vocabCount - selectedWordsLearned}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Level Details Card */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-primary-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
                  <FaGraduationCap className="text-primary-600" />
                  Chi tiết {selectedLevel.level}
                </h3>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Độ khó:
                        </span>
                        <span className="ml-2 text-gray-600">
                          {getLevelInfo(selectedLevel.id).difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Thời gian học:
                        </span>
                        <span className="ml-2 text-gray-600">
                          {getLevelInfo(selectedLevel.id).time}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Tổng từ vựng:
                        </span>
                        <span className="ml-2 text-gray-600">
                          {selectedLevel.vocabCount} từ
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-primary-50 to-red-orange-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <FaFire className="text-red-orange-500" />
                      Khả năng đạt được
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      {getLevelInfo(selectedLevel.id).desc}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center mt-8">
                  <button
                    className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                    onClick={() =>
                      setCurrentWord((prev) =>
                        Math.min(prev + 10, selectedLevel.vocabCount)
                      )
                    }
                  >
                    <FaFire className="text-lg" />
                    Cập nhật tiến độ (+10 từ)
                  </button>

                  <button className="border-2 border-primary-500 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                    Bắt đầu học
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* If no level selected */}
          {!selectedLevel && (
            <div className="bg-white rounded-2xl p-12 shadow-lg text-center border border-primary-100">
              <div className="text-primary-300 mb-6">
                <FaGraduationCap className="w-20 h-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-3">
                Chọn một cấp độ HSK
              </h3>
              <p className="text-gray-500 text-lg max-w-md mx-auto">
                Vui lòng chọn một cấp độ HSK từ menu bên trái để xem tiến trình
                học tập chi tiết
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Progress;
