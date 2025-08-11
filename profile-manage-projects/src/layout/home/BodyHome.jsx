import React, { useState, useEffect } from "react";
import {
  FaLanguage,
  FaPlay,
  FaFire,
  FaStar,
  FaCalendarAlt,
  FaBook,
  FaTrophy,
  FaChartLine,
  FaUser,
  FaClock,
} from "react-icons/fa";
import { BsArrowRight, BsLightningFill } from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import {
  getStreak,
  getCurrentWord,
  skipDay,
} from "../../data/progress/progress";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BodyHome = ({ currentWord: propCurrentWord, streak: propStreak }) => {
  const [isCheckedToday, setIsCheckedToday] = useState(false);
  const [localCurrentWord, setLocalCurrentWord] = useState(
    propCurrentWord || getCurrentWord()
  );
  const [localStreak, setLocalStreak] = useState(propStreak || getStreak());
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);

  // Better authentication check
  const isLoggedIn = user && user.accessToken && user.user;

  const navigateLink = (path) => {
    navigate(path);
  };

  const getUserInitials = () => {
    if (user?.user?.gmail && isLoggedIn) {
      const email = user.user.gmail;
      const namePart = email.split("@")[0];
      return namePart.substring(0, 2).toUpperCase();
    }
    return "GT";
  };

  const getDisplayName = () => {
    if (user?.user?.gmail && isLoggedIn) {
      const email = user.user.gmail;
      const namePart = email.split("@")[0];
      return namePart.charAt(0).toUpperCase() + namePart.slice(1);
    }
    return "Guest";
  };

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoggedIn) {
      navigate("/chinese/login");
      return;
    }

    const today = new Date().toDateString();
    const lastCheck = localStorage.getItem("lastCheckDate");
    if (lastCheck !== today) {
      setIsCheckedToday(false);
      setLocalCurrentWord(0);
      localStorage.removeItem("lastCheckDate");
    } else {
      setIsCheckedToday(localStorage.getItem("isCheckedToday") === "true");
    }
  }, [isLoggedIn, navigate]);

  const handleCheckStreak = () => {
    if (!isCheckedToday) {
      const today = new Date();
      skipDay();
      const newStreak = getStreak();
      setLocalStreak(newStreak);
      const newWords = newStreak * 5;
      setLocalCurrentWord((prev) => prev + newWords);
      setIsCheckedToday(true);
      localStorage.setItem("lastCheckDate", today.toDateString());
      localStorage.setItem("isCheckedToday", "true");
    }
  };

  // Show loading or redirect if not logged in
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Đang chuyển hướng đến trang đăng nhập...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      className="relative w-full min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 z-[10]"
      role="main"
      aria-labelledby="hero-home-title"
    >
      {/* Background decorative characters */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 text-6xl text-primary-200 font-bold opacity-30 rotate-12 animate-fade-in">
          中
        </div>
        <div className="absolute top-40 right-20 text-4xl text-primary-300 opacity-40 -rotate-12 animate-fade-in delay-200">
          文
        </div>
        <div className="absolute bottom-40 left-20 text-5xl text-primary-200 opacity-25 rotate-45 animate-fade-in delay-400">
          学
        </div>
        <div className="absolute bottom-20 right-40 text-3xl text-primary-300 opacity-35 -rotate-6 animate-fade-in delay-600">
          习
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 relative z-[10]">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
              <HiSparkles className="w-4 h-4" aria-hidden="true" />
              #1 Ứng dụng học tiếng Trung miễn phí
            </div>

            <h1
              id="hero-home-title"
              className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-gray-800"
            >
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Học Tiếng Trung
              </span>
              <br />
              <span>Hiệu Quả Mỗi Ngày</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 italic flex items-center justify-center lg:justify-start gap-2">
              和 {getDisplayName()} 一起学习中文
              <FaLanguage
                className="text-primary-500 text-2xl"
                aria-hidden="true"
              />
            </p>

            <p className="text-base sm:text-lg text-gray-700 max-w-xl leading-relaxed">
              Khám phá phương pháp học tiếng Trung thông minh với flashcards, từ
              vựng hàng ngày và hệ thống theo dõi tiến độ cá nhân. Bắt đầu hành
              trình ngôn ngữ của bạn ngay hôm nay!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center lg:justify-start">
              <button
                className="group bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:shadow-lg focus:ring-2 focus:ring-primary-300"
                aria-label="Bắt đầu học tiếng Trung ngay"
              >
                <BsArrowRight className="group-hover:translate-x-1 transition-transform" />
                Bắt Đầu Học Ngay
              </button>
              <button
                className="group border-2 border-primary-200 hover:border-primary-300 text-primary-600 px-6 py-3 rounded-xl font-semibold text-lg flex items-center gap-2 transition-all duration-300 hover:bg-primary-50"
                aria-label="Xem video demo"
              >
                <FaPlay className="w-4 h-4" aria-hidden="true" />
                Xem Demo
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaFire className="text-red-orange-500" />
                <span className="font-medium">{`1,234 người đang học`}</span>
              </div>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span className="font-medium">{`4.9/5 đánh giá`}</span>
              </div>
            </div>
          </div>

          {/* Right Card Section */}
          <div className="flex-1 relative max-w-md z-[10]">
            {/* Main Profile Card */}
            <div className="hover:scale-105 hover:shadow-2xl duration-500 bg-white rounded-2xl p-6 shadow-lg mb-6 border border-primary-100 animate-fade-in-up">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {getUserInitials()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    {getDisplayName()}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <BsLightningFill className="text-red-orange-500" />
                    <span>{`${localStreak} ngày Streak`}</span>
                  </p>
                </div>
                <div className="ml-auto">
                  <button
                    className={`text-primary-600 rounded-2xl hover:bg-gradient-to-t hover:from-primary-500 hover:to-primary-600 duration-300 bg-primary-50 shadow-sm p-2 hover:scale-105 hover:shadow-xl hover:text-white transition-all ${
                      isCheckedToday ? "bg-primary-500 text-white" : ""
                    }`}
                    onClick={handleCheckStreak}
                    aria-label="Kiểm tra streak"
                  >
                    {isCheckedToday ? "Đã Check" : "Check Streak"}
                  </button>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Tiến độ HSK 2</span>
                  <span>65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary-500 to-primary-700 h-2 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="text-center p-3 bg-primary-50 rounded-lg">
                  <FaBook className="text-primary-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-800">
                    {localCurrentWord}
                  </div>
                  <div className="text-xs text-gray-600">Từ vựng</div>
                </div>
                <div className="text-center p-3 bg-accent-green-50 rounded-lg">
                  <FaTrophy className="text-accent-green-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-800">12</div>
                  <div className="text-xs text-gray-600">Thành tích</div>
                </div>
                <div className="text-center p-3 bg-red-orange-50 rounded-lg">
                  <FaClock className="text-red-orange-500 mx-auto mb-1" />
                  <div className="text-lg font-bold text-gray-800">24h</div>
                  <div className="text-xs text-gray-600">Thời gian</div>
                </div>
              </div>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gradient-to-br from-primary-100 to-primary-200 p-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer hover:from-primary-200 hover:to-primary-300">
                <FaBook className="text-2xl mb-2 text-primary-600" />
                <h4
                  onClick={() => navigateLink("/flashcard")}
                  className="font-semibold text-gray-800 hover:text-primary-700"
                >
                  Flashcards
                </h4>
                <p className="text-xs text-gray-600">Ôn tập từ vựng</p>
              </div>
              <div className="bg-gradient-to-br from-sage-400 to-sage-500 p-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
                <FaChartLine className="text-2xl mb-2 text-accent-green-600" />
                <h4 className="font-semibold text-gray-800 hover:text-accent-green-700">
                  Bài tập
                </h4>
                <p className="text-xs text-gray-600">Luyện tập ngay</p>
              </div>
              <div className="bg-gradient-to-br from-red-orange-100 to-red-orange-200 p-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer">
                <FaUser className="text-2xl mb-2 text-red-orange-600" />
                <h4 className="font-semibold text-gray-800 hover:text-red-orange-700">
                  Thống kê
                </h4>
                <p className="text-xs text-gray-600">Xem tiến độ</p>
              </div>
              <div
                onClick={() => navigateLink("/vocabulary")}
                className="bg-gradient-to-br from-red-orange-200 to-red-orange-300 p-4 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <FaTrophy className="text-2xl mb-2 text-warning-600" />
                <h4 className="font-semibold text-gray-800 hover:text-warning-700">
                  Library
                </h4>
                <p className="text-xs text-gray-600">
                  Học Từ vựng qua thư Thư viện
                </p>
              </div>
            </div>

            {/* Daily Goal Card */}
            <div className="bg-gradient-to-r from-primary-100 to-red-orange-100 p-4 rounded-xl border-2 border-dashed border-primary-300">
              <div className="flex items-center gap-3 mb-2">
                <FaCalendarAlt className="text-primary-600" />
                <span className="font-semibold text-gray-800">
                  Mục tiêu hôm nay
                </span>
              </div>
              <p className="text-sm text-gray-700 mb-2">
                Học 15 từ vựng mới về chủ đề "Gia đình"
              </p>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">8/15 từ hoàn thành</div>
                <button className="text-xs bg-primary-500 text-white px-3 py-1 rounded-full hover:bg-primary-600 transition-colors">
                  Tiếp tục
                </button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-warning-400 rounded-full p-3 shadow-lg animate-bounce z-[20]">
              <FaTrophy className="text-warning-800 text-xl" />
            </div>

            <div className="absolute -bottom-4 -left-4 bg-accent-green-500 text-white px-3 py-2 rounded-full text-xs shadow-lg animate-pulse z-[20]">
              +5 XP 🎉
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[5]"
        aria-hidden="true"
      >
        <svg
          className="w-full h-16 text-primary-100"
          fill="currentColor"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M1200 120L0 16.48V120z"></path>
        </svg>
      </div>
    </section>
  );
};

export default BodyHome;
