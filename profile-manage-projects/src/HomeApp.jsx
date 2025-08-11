import React, { useState } from "react";
import AppChinese from "../web/AppChinese/AppChinese";
import AppManageUser from "../web/AppManageUser/AppManageUser";
import AppIPALearning from "../web/AppIPAEnglish.jsx";
import AppProduct from "../web/AppProduct/AppProduct.jsx";
import { Routes, useNavigate } from "react-router-dom";
import ErrorBoundary from "./data/ErrorBoundary";
import {
  FaSun,
  FaMoon,
  FaStar,
  FaLanguage,
  FaUsers,
  FaShoppingCart,
  FaHeadphones,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import { setTheme } from "./redux/themeSlice"; // Thêm dòng này

const HomeApp = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state) => state.theme.mode);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [locationPage, setLocationPage] = useState(null);
  const navigate = useNavigate();

  // Toggle giữa 3 chế độ
  // ...existing code...

  const handleToggleMode = () => {
    let nextMode;
    if (themeMode === "light") nextMode = "dark";
    else if (themeMode === "dark") nextMode = "midnight";
    else nextMode = "light";
    dispatch(setTheme(nextMode));
  };
  // ...existing code...

  // Gradient nền động
  const gradientBg = {
    light: "bg-gradient-to-br from-[#ffffff] via-[#fffbe6] to-[#eafff7]",
    dark: "bg-gradient-dark-modern",
    midnight: "bg-gradient-midnight-modern",
  }[themeMode];

  // Gradient cho button độnge
  const getGradientClass = (color) =>
    themeMode === "dark"
      ? "from-darkModern-button-from to-darkModern-button-to hover:from-darkModern-buttonHover-from hover:to-darkModern-buttonHover-to"
      : themeMode === "midnight"
      ? "from-midnightModern-button-from to-midnightModern-button-to hover:from-midnightModern-buttonHover-from hover:to-midnightModern-buttonHover-to"
      : color || "from-gray-300 to-gray-500";

  const projectList = [
    {
      id: 1,
      name: "App Learning Chinese",
      component: <AppChinese />,
      titleChild: "Ứng dụng học tiếng Trung",
      description:
        "Ứng dụng học tiếng Trung tương tác với tính năng nhận diện giọng nói, flashcard thông minh và bài tập thực hành hàng ngày",
      TechnologyLanguage: [
        "React.js",
        "Redux",
        "MongoDB",
        "Node.js",
        "Express.js",
        "TailwindCSS",
        "JWT auth",
      ],
      link: "/chinese",
      color: "from-accent to-primary-400",
      icon: <FaLanguage />,
      category: "Education",
      stats: { users: "2.5K+", rating: "4.8" },
    },
    {
      id: 2,
      name: "App Manager Users",
      component: <AppManageUser />,
      titleChild: "Ứng dụng quản lý người dùng",
      description:
        "Hệ thống quản lý người dùng toàn diện với dashboard analytics, phân quyền chi tiết và báo cáo thời gian thực",
      TechnologyLanguage: [
        "React.js",
        "Redux Toolkit",
        "Node.js",
        "JWT Auth",
        "Express.js",
        "REST API",
        "TailwindCSS",
        "MongoDB",
      ],
      link: "/managerUser",
      color: "from-primary-400 to-primary-600",
      icon: <FaUsers />,
      category: "Management",
      stats: { users: "1.8K+", rating: "4.9" },
    },
    {
      id: 3,
      name: "IPA Learning Center",
      component: <AppIPALearning />,
      titleChild: "Ứng dụng luyện nghe và đọc IPA tiếng Anh",
      description:
        "Học phát âm tiếng Anh chuẩn với bảng phiên âm quốc tế IPA, bao gồm luyện nghe, nhận diện âm và bài tập tương tác",
      TechnologyLanguage: [
        "React.js",
        "Web Speech API",
        "TailwindCSS",
        "Interactive Audio",
        "Responsive Design",
      ],
      link: "/ipa-learning",
      color: "from-blue-400 to-purple-600",
      icon: <FaHeadphones />,
      category: "Education",
      stats: { users: "1.2K+", rating: "4.7" },
    },
    {
      id: 4,
      name: "Product CRUD",
      component: <AppProduct />,
      titleChild: "Ứng dụng shopping cart",
      description:
        "Hệ thống quản lý sản phẩm toàn diện với tính năng CRUD, shopping cart thông minh và thanh toán tích hợp",
      TechnologyLanguage: [
        "React.js",
        "Redux toolkit",
        "Node.js",
        "MongoDB",
        "REST API",
        "TailwindCSS",
      ],
      link: "/product",
      color: "from-green-500 to-emerald-500",
      icon: <FaShoppingCart />,
      category: "E-commerce",
      stats: {
        users: "950+",
        rating: "4.6",
        downloads: "4.2K+",
        reviews: "180+",
      },
    },
  ];

  const selectedProject = projectList.find((p) => p.id === locationPage);

  const hanldeSwitchPage = (item) => {
    setLocationPage(item.id);
    navigate(item.link);
  };

  return (
    <div className={`min-h-screen ${gradientBg} relative overflow-hidden`}>
      {/* Toggle Theme Button */}
      <button
        onClick={handleToggleMode}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all border flex items-center justify-center ${
          themeMode === "dark"
            ? "bg-darkModern-card border-darkModern-border"
            : themeMode === "midnight"
            ? "bg-midnightModern-card border-midnightModern-border"
            : "bg-white/80 border-gray-300 hover:bg-white/100"
        }`}
        aria-label="Chuyển chế độ giao diện"
      >
        {themeMode === "light" ? (
          <FaSun className="text-yellow-400 text-2xl" />
        ) : themeMode === "dark" ? (
          <FaMoon className="text-blue-700 text-2xl" />
        ) : (
          <FaStar className="text-indigo-300 text-2xl" />
        )}
      </button>

      {/* Background Effects */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D1DDD1' fill-opacity='0.08'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div
        className={`absolute top-20 left-10 w-32 h-32 rounded-full blur-xl animate-pulse ${
          themeMode === "dark"
            ? "bg-gradient-to-br from-darkModern-accent/30 to-darkModern-textSecondary/30"
            : themeMode === "midnight"
            ? "bg-gradient-to-br from-midnightModern-accent/30 to-midnightModern-textSecondary/30"
            : "from-primary-200/30 to-accent/30"
        }`}
      ></div>
      <div
        className={`absolute bottom-20 right-10 w-48 h-48 rounded-full blur-2xl animate-pulse delay-1000 ${
          themeMode === "dark"
            ? "bg-gradient-to-br from-darkModern-textSecondary/20 to-darkModern-accent/20"
            : themeMode === "midnight"
            ? "bg-gradient-to-br from-midnightModern-textSecondary/20 to-midnightModern-accent/20"
            : "from-secondary/20 to-primary-300/20"
        }`}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-20 max-w-5xl">
          <div
            className={`inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
              themeMode === "dark"
                ? "bg-darkModern-card border-darkModern-border text-darkModern-textSecondary"
                : themeMode === "midnight"
                ? "bg-midnightModern-card border-midnightModern-border text-midnightModern-textSecondary"
                : "bg-white/80 backdrop-blur-sm border-sage-border-light text-sage-text-muted"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-pulse ${
                themeMode === "dark"
                  ? "bg-darkModern-accent"
                  : themeMode === "midnight"
                  ? "bg-midnightModern-accent"
                  : "bg-gradient-to-r from-accent to-primary-500"
              }`}
            ></span>
            <span
              className={`${
                themeMode === "dark"
                  ? "text-darkModern-accent"
                  : themeMode === "midnight"
                  ? "text-midnightModern-accent"
                  : "bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent"
              }`}
            >
              Dự án công nghệ hiện đại
            </span>
          </div>
          <h1
            className={`text-6xl lg:text-7xl font-bold mb-8 leading-tight ${
              themeMode === "dark"
                ? "text-darkModern-text"
                : themeMode === "midnight"
                ? "text-midnightModern-text"
                : "text-sage-900"
            }`}
          >
            Portfolio
            <span
              className={`block lg:inline ${
                themeMode === "dark"
                  ? "text-darkModern-accent"
                  : themeMode === "midnight"
                  ? "text-midnightModern-accent"
                  : "bg-gradient-to-r from-primary-600 via-primary-500 to-accent bg-clip-text text-transparent"
              }`}
            >
              {" "}
              Dự Án
            </span>
          </h1>
          <p
            className={`text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${
              themeMode === "dark"
                ? "text-darkModern-textSecondary"
                : themeMode === "midnight"
                ? "text-midnightModern-textSecondary"
                : "text-sage-text-muted"
            }`}
          >
            Khám phá các dự án công nghệ đa dạng từ ứng dụng di động đến hệ
            thống quản lý, được xây dựng với công nghệ hiện đại và trải nghiệm
            người dùng tối ưu
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className={`px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                themeMode === "dark"
                  ? `bg-gradient-to-r ${getGradientClass()} text-darkModern-text`
                  : themeMode === "midnight"
                  ? `bg-gradient-to-r ${getGradientClass()} text-midnightModern-text`
                  : "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700"
              }`}
              aria-label="Xem tất cả dự án"
            >
              Xem Tất Cả Dự Án
            </button>
            <button
              className={`px-8 py-4 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                themeMode === "dark"
                  ? "bg-darkModern-card border-darkModern-border text-darkModern-text hover:bg-darkModern-textSecondary/20"
                  : themeMode === "midnight"
                  ? "bg-midnightModern-card border-midnightModern-border text-midnightModern-text hover:bg-midnightModern-textSecondary/20"
                  : "bg-white/80 backdrop-blur-sm border-sage-border-default text-sage-text hover:bg-white hover:border-sage-border-dark"
              }`}
              aria-label="Liên hệ hợp tác"
            >
              Liên Hệ Hợp Tác
            </button>
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-10 w-full max-w-8xl">
          {projectList.map((item) => (
            <div
              key={item.id}
              className={`group relative rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border ${
                themeMode === "dark"
                  ? "bg-darkModern-card border-darkModern-border"
                  : themeMode === "midnight"
                  ? "bg-midnightModern-card border-midnightModern-border"
                  : "bg-white/90 backdrop-blur-sm border-sage-border-light hover:border-sage-border-dark"
              } ${
                hoveredCard === item.id
                  ? "transform scale-105 -translate-y-2"
                  : ""
              }`}
              onMouseEnter={() => setHoveredCard(item.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${getGradientClass(
                  item.color
                )} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}
              ></div>
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-5">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradientClass(
                      item.color
                    )} flex items-center justify-center text-3xl shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 text-xs font-semibold rounded-full px-4 py-2 mb-3 border ${
                        themeMode === "dark"
                          ? "bg-darkModern-card border-darkModern-border text-darkModern-textSecondary"
                          : themeMode === "midnight"
                          ? "bg-midnightModern-card border-midnightModern-border text-midnightModern-textSecondary"
                          : "bg-white text-sage-text-muted border-sage-border-light"
                      }`}
                    >
                      {item.category}
                    </div>
                    <h3
                      className={`text-2xl font-bold transition-colors mb-1 ${
                        themeMode === "dark"
                          ? "text-darkModern-text group-hover:text-darkModern-accent"
                          : themeMode === "midnight"
                          ? "text-midnightModern-text group-hover:text-midnightModern-accent"
                          : "text-sage-900 group-hover:text-primary-700"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`text-sm font-medium ${
                        themeMode === "dark"
                          ? "text-darkModern-textSecondary"
                          : themeMode === "midnight"
                          ? "text-midnightModern-textSecondary"
                          : "text-sage-text-muted"
                      }`}
                    >
                      {item.titleChild}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={`text-xs ${
                      themeMode === "dark"
                        ? "text-darkModern-textSecondary"
                        : themeMode === "midnight"
                        ? "text-midnightModern-textSecondary"
                        : "text-sage-text-muted"
                    } mb-1`}
                  >
                    Users
                  </div>
                  <div
                    className={`text-sm font-bold ${
                      themeMode === "dark"
                        ? "text-darkModern-text"
                        : themeMode === "midnight"
                        ? "text-midnightModern-text"
                        : "text-sage-900"
                    }`}
                  >
                    {item.stats.users}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-secondary text-xs">⭐</span>
                    <span
                      className={`text-xs font-semibold ${
                        themeMode === "dark"
                          ? "text-darkModern-text"
                          : themeMode === "midnight"
                          ? "text-midnightModern-text"
                          : "text-sage-900"
                      }`}
                    >
                      {item.stats.rating}
                    </span>
                  </div>
                </div>
              </div>
              <p
                className={`leading-relaxed mb-8 text-base ${
                  themeMode === "dark"
                    ? "text-darkModern-textSecondary"
                    : themeMode === "midnight"
                    ? "text-midnightModern-textSecondary"
                    : "text-sage-text-muted"
                }`}
              >
                {item.description}
              </p>
              <div className="mb-8">
                <h4
                  className={`text-sm font-bold uppercase tracking-wider mb-4 flex items-center gap-2 ${
                    themeMode === "dark"
                      ? "text-darkModern-text"
                      : themeMode === "midnight"
                      ? "text-midnightModern-text"
                      : "text-sage-text"
                  }`}
                >
                  <span
                    className={`w-4 h-0.5 rounded-full ${
                      themeMode === "dark"
                        ? "bg-darkModern-accent"
                        : themeMode === "midnight"
                        ? "bg-midnightModern-accent"
                        : "bg-gradient-to-r from-primary-500 to-accent"
                    }`}
                  ></span>
                  Công nghệ sử dụng
                </h4>
                <div className="flex flex-wrap gap-3">
                  {item.TechnologyLanguage.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-4 py-2 text-sm font-medium rounded-full transform hover:scale-105 transition-all duration-200 border shadow-sm ${
                        themeMode === "dark"
                          ? "bg-darkModern-card border-darkModern-border text-darkModern-textSecondary hover:bg-darkModern-textSecondary/20"
                          : themeMode === "midnight"
                          ? "bg-midnightModern-card border-midnightModern-border text-midnightModern-textSecondary hover:bg-midnightModern-textSecondary/20"
                          : "bg-gradient-to-r from-sage-100 to-sage-200 text-sage-text border-sage-border-light hover:from-sage-200 hover:to-sage-300 hover:border-sage-border-default"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                onClick={() => hanldeSwitchPage(item)}
                className={`w-full bg-gradient-to-r ${getGradientClass(
                  item.color
                )} py-4 px-8 rounded-2xl font-bold text-white hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden`}
                aria-label={`Xem chi tiết dự án ${item.name}`}
              >
                <span className="relative z-10">Xem Chi Tiết</span>
                <svg
                  className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>
          ))}
        </div>

        {/* Project Stats */}
        <div
          className={`mt-20 rounded-3xl p-8 shadow-xl border ${
            themeMode === "dark"
              ? "bg-darkModern-card border-darkModern-border"
              : themeMode === "midnight"
              ? "bg-midnightModern-card border-midnightModern-border"
              : "bg-white/80 backdrop-blur-sm border-sage-border-light"
          }`}
        >
          <h3
            className={`text-2xl font-bold text-center mb-8 ${
              themeMode === "dark"
                ? "text-darkModern-text"
                : themeMode === "midnight"
                ? "text-midnightModern-text"
                : "text-sage-900"
            }`}
          >
            Thống Kê Dự Án
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "3+", label: "Dự án hoàn thành" },
              { value: "12+", label: "Công nghệ sử dụng" },
              { value: "100%", label: "Responsive Design" },
              { value: "24/7", label: "Hỗ trợ kỹ thuật" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`text-4xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300 ${
                    themeMode === "dark"
                      ? "text-darkModern-accent"
                      : themeMode === "midnight"
                      ? "text-midnightModern-accent"
                      : "bg-gradient-to-r from-primary-600 to-accent bg-clip-text text-transparent"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-sm font-medium ${
                    themeMode === "dark"
                      ? "text-darkModern-textSecondary"
                      : themeMode === "midnight"
                      ? "text-midnightModern-textSecondary"
                      : "text-sage-text-muted"
                  }`}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Project Details */}
        {locationPage && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
            <div
              className={`rounded-3xl max-w-7xl max-h-[90vh] overflow-auto shadow-2xl w-full border ${
                themeMode === "dark"
                  ? "bg-darkModern-sidebar border-darkModern-border"
                  : themeMode === "midnight"
                  ? "bg-midnightModern-sidebar border-midnightModern-border"
                  : "bg-white border-sage-border-light"
              }`}
            >
              <div
                className={`sticky top-0 border-b p-8 flex justify-between items-center ${
                  themeMode === "dark"
                    ? "bg-darkModern-sidebar border-darkModern-border"
                    : themeMode === "midnight"
                    ? "bg-midnightModern-sidebar border-midnightModern-border"
                    : "bg-white/95 backdrop-blur-sm border-sage-border-light"
                }`}
              >
                {selectedProject ? (
                  <>
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getGradientClass(
                          selectedProject.color
                        )} flex items-center justify-center text-2xl shadow-xl`}
                      >
                        {selectedProject.icon}
                      </div>
                      <div>
                        <h2
                          className={`text-3xl font-bold ${
                            themeMode === "dark"
                              ? "text-darkModern-text"
                              : themeMode === "midnight"
                              ? "text-midnightModern-text"
                              : "text-sage-900"
                          }`}
                        >
                          {selectedProject.name}
                        </h2>
                        <p
                          className={`font-medium ${
                            themeMode === "dark"
                              ? "text-darkModern-textSecondary"
                              : themeMode === "midnight"
                              ? "text-midnightModern-textSecondary"
                              : "text-sage-text-muted"
                          }`}
                        >
                          {selectedProject.titleChild}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setLocationPage(null)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 ${
                        themeMode === "dark"
                          ? "bg-darkModern-card text-darkModern-textSecondary hover:bg-darkModern-textSecondary/20"
                          : themeMode === "midnight"
                          ? "bg-midnightModern-card text-midnightModern-textSecondary hover:bg-midnightModern-textSecondary/20"
                          : "bg-sage-100 text-sage-text-muted hover:bg-sage-200"
                      }`}
                      aria-label="Đóng modal"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </>
                ) : (
                  <div className="text-center p-8">
                    <h2
                      className={`text-xl font-bold ${
                        themeMode === "dark"
                          ? "text-darkModern-text"
                          : themeMode === "midnight"
                          ? "text-midnightModern-text"
                          : "text-sage-900"
                      }`}
                    >
                      Dự án không tồn tại
                    </h2>
                    <button
                      onClick={() => setLocationPage(null)}
                      className={`mt-4 px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                        themeMode === "dark"
                          ? "bg-gradient-to-r from-darkModern-button-from to-darkModern-button-to text-darkModern-text hover:from-darkModern-buttonHover-from hover:to-darkModern-buttonHover-to"
                          : themeMode === "midnight"
                          ? "bg-gradient-to-r from-midnightModern-button-from to-midnightModern-button-to text-midnightModern-text hover:from-midnightModern-buttonHover-from hover:to-midnightModern-buttonHover-to"
                          : "bg-primary-600 text-white hover:bg-primary-700"
                      }`}
                      aria-label="Quay lại danh sách dự án"
                    >
                      Quay Lại
                    </button>
                  </div>
                )}
              </div>
              {selectedProject && (
                <ErrorBoundary>
                  <div className="p-8">{selectedProject.component}</div>
                </ErrorBoundary>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeApp;
