import React, { useState, useRef, useEffect } from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { AiOutlineMonitor } from "react-icons/ai";
import { HiMenu, HiX } from "react-icons/hi";
import {
  FiUser,
  FiLogOut,
  FiUserPlus,
  FiLogIn,
  FiSettings,
} from "react-icons/fi";
import { menuItems } from "../../data/menu/menuItems";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../api/authApi";

const Navbar = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);

  const isLoggedIn = user && user.accessToken && user.user;

  console.log("Current location:", location.pathname); // Debug log

  // Close avatar menu when clicking outside
  useEffect(() => {
    console.log("user", user); // Debug log
    const handleClickOutside = (event) => {
      if (
        avatarMenuRef.current &&
        !avatarMenuRef.current.contains(event.target)
      ) {
        setIsAvatarMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Check authentication state on mount and route changes
  useEffect(() => {
    // If no user or invalid token, redirect to login for protected routes
    if (
      !isLoggedIn &&
      location.pathname.startsWith("/chinese") &&
      location.pathname !== "/chinese/login" &&
      location.pathname !== "/chinese/register"
    ) {
      navigate("/chinese/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  // Xác định base path hiện tại
  const getBasePath = () => {
    if (location.pathname.startsWith("/chinese")) return "/chinese";
    if (location.pathname.startsWith("/managerUser")) return "/managerUser";
    return "";
  };

  const navigateItemInMenu = (id) => {
    const basePath = getBasePath();
    console.log("Base path:", basePath, "Item ID:", id); // Debug log

    if (id === "home") {
      // Nếu đang trong chinese app, về home của chinese app
      if (basePath === "/chinese") {
        navigate("/chinese");
      } else {
        navigate("/");
      }
    } else {
      // Navigate trong context hiện tại
      if (basePath) {
        navigate(`${basePath}/${id}`);
      } else {
        // Fallback về chinese nếu không có base path
        navigate(`/chinese/${id}`);
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Get user initials from email with better error handling
  const getUserInitials = () => {
    if (user?.user?.gmail && isLoggedIn) {
      const email = user.user.gmail;
      const namePart = email.split("@")[0];
      // Get first 2 characters and uppercase them
      return namePart.substring(0, 2).toUpperCase();
    }
    return null;
  };

  // Handle logout with better error handling
  const handleLogout = () => {
    if (user?.user?._id) {
      logout(dispatch, user.user._id, navigate, user?.accessToken);
      // Navigate to login page
      navigate("/chinese/login");
      // Show success message
      toast.success("Đăng xuất thành công!");
    }
  };

  // Toggle avatar menu
  const toggleAvatarMenu = () => {
    setIsAvatarMenuOpen(!isAvatarMenuOpen);
  };

  // Handle menu item click and close menu
  const handleMenuItemClick = (action) => {
    action();
    setIsAvatarMenuOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-primary-500 to-primary-800 py-4 px-[16px] sm:px-4 md:p-8 lg:px-10 overflow-visible z-[100]">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center overflow-visible">
        {/* Header row - Logo và Mobile menu button */}
        <div className="flex w-full md:w-auto justify-between items-center">
          <div className="flex flex-row items-center">
            <PiBookOpenTextLight className="text-secondary text-[40px] sm:text-[45px] md:text-[50px] font-bold" />
            <div className="flex ml-3 md:ml-4 flex-col gap-1 md:gap-2 text-[16px] sm:text-[18px] md:text-[22px] font-bold text-white">
              <div className="leading-tight">Chinese App Learning</div>
              <span className="text-[14px] sm:text-[16px] md:text-[18px] leading-tight">
                中文学习App
              </span>
            </div>
          </div>

          <button
            className="md:hidden text-white text-2xl p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX /> : <HiMenu />}
          </button>
        </div>

        {/* Desktop search section */}
        <div className="min-w-[300px] lg:min-w-[500px] p-4 hidden md:flex items-center gap-4">
          <div className="relative flex items-center duration-300 gap-3 hover:scale-105 cursor-pointer">
            <label
              htmlFor="navbar-search"
              className="text-white text-sm lg:text-base"
            >
              Search
            </label>
            <AiOutlineMonitor className="absolute text-primary-500 text-xl lg:text-2xl left-[50px] lg:left-[65px] hover:rotate-3" />
            <input
              type="text"
              id="navbar-search"
              className="focus:w-[250px] lg:focus:w-[400px] focus:duration-200 px-6 lg:px-8 hover:w-[250px] lg:hover:w-[400px] duration-300 bg-white w-[150px] lg:w-[200px] border border-gray-200 rounded-3xl py-1 text-sm lg:text-base text-gray-800 placeholder-gray-500 focus:ring focus:ring-primary-300 outline-none"
              placeholder="Search words"
            />
          </div>
        </div>

        {/* Desktop menu items */}
        <div className="text-[16px] lg:text-[18px] hidden font-semibold md:flex flex-row items-center gap-2 lg:gap-4 text-white transition-all duration-200">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => navigateItemInMenu(item.id)}
              className="min-w-[90px] lg:min-w-[108px] inline-block hover:text-hover px-2 py-1 rounded text-center whitespace-nowrap bg-transparent border-none cursor-pointer"
            >
              {hoveredItem === item.id ? item.chinese : item.english}
            </button>
          ))}
        </div>

        {/* Desktop avatar with click-based dropdown */}
        <div className="relative hidden md:block" ref={avatarMenuRef}>
          <div
            className="ml-4 bg-primary-500 cursor-pointer shadow-lg w-auto h-auto p-4 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 z-[110] border-2 border-white/20 hover:border-white/40"
            onClick={toggleAvatarMenu}
          >
            {getUserInitials() !== null ? (
              <div className="text-white text-2xl m-auto font-semibold text-center">
                {getUserInitials()}
              </div>
            ) : (
              <div className="text-white text-center">
                <FiUser className="text-2xl mx-auto mb-1" />
                <div className="text-xs whitespace-nowrap">Chưa đăng nhập</div>
              </div>
            )}
          </div>

          {isAvatarMenuOpen && (
            <div className="absolute top-[75px] right-0 bg-white shadow-xl text-gray-800 rounded-xl font-sans w-[280px] z-[120] border border-gray-200 overflow-hidden">
              {isLoggedIn ? (
                // Logged in user menu
                <>
                  {/* User Info Header */}
                  <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-lg">
                        {getUserInitials()}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {user?.user?.gmail || "Guest User"}
                        </div>
                        <div className="text-xs text-white/80">
                          {user?.user?.admin ? "Admin" : "Member"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <div
                      onClick={() =>
                        handleMenuItemClick(() => {
                          const basePath = getBasePath();
                          navigate(`${basePath || "/chinese"}/profile`);
                        })
                      }
                      className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <FiUser className="text-gray-500" />
                      <span className="text-sm">Profile</span>
                    </div>

                    <div
                      onClick={() =>
                        handleMenuItemClick(() => {
                          const basePath = getBasePath();
                          navigate(`${basePath || "/chinese"}/settings`);
                        })
                      }
                      className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <FiSettings className="text-gray-500" />
                      <span className="text-sm">Settings</span>
                    </div>

                    <hr className="my-2 border-gray-200" />

                    <div
                      onClick={() => handleMenuItemClick(handleLogout)}
                      className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-red-50 transition-colors text-red-600"
                    >
                      <FiLogOut className="text-red-500" />
                      <span className="text-sm font-medium">Logout</span>
                    </div>
                  </div>
                </>
              ) : (
                // Guest user menu - Enhanced design
                <>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-4 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FiUser className="text-gray-400 text-2xl" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-1">
                      Chào mừng bạn!
                    </h3>
                    <p className="text-sm text-gray-600">
                      Bạn chưa đăng nhập tài khoản
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Vui lòng đăng nhập hoặc đăng ký để tiếp tục
                    </p>
                  </div>

                  <div className="p-3 space-y-2">
                    <button
                      onClick={() =>
                        handleMenuItemClick(() => {
                          const basePath = getBasePath();
                          navigate(`${basePath || "/chinese"}/login`);
                        })
                      }
                      className="w-full flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium"
                    >
                      <FiLogIn className="text-lg" />
                      <span>Đăng nhập</span>
                    </button>

                    <button
                      onClick={() =>
                        handleMenuItemClick(() => {
                          const basePath = getBasePath();
                          navigate(`${basePath || "/chinese"}/register`);
                        })
                      }
                      className="w-full flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium"
                    >
                      <FiUserPlus className="text-lg" />
                      <span>Đăng ký</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden fixed inset-0 z-[100] bg-black bg-opacity-50 overflow-visible"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div
              className="absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-primary-600 to-primary-700 shadow-lg overflow-visible"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-primary-500">
                <h3 className="text-white font-semibold text-lg">Menu</h3>
                <button
                  className="text-white text-2xl p-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <HiX />
                </button>
              </div>

              {/* User Info in Mobile Menu */}
              {isLoggedIn ? (
                <div className="bg-primary-500/50 p-4 border-b border-primary-500">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center font-bold text-white">
                      {getUserInitials()}
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">
                        {user?.user?.gmail || "Guest User"}
                      </div>
                      <div className="text-primary-200 text-xs">
                        {user?.user?.admin ? "Admin" : "Member"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-primary-500/50 p-4 border-b border-primary-500 text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <FiUser className="text-white text-2xl" />
                  </div>
                  <div className="text-white font-semibold text-lg mb-1">
                    Chào mừng bạn!
                  </div>
                  <div className="text-primary-200 text-sm">
                    Bạn chưa đăng nhập tài khoản
                  </div>
                  <div className="text-primary-200 text-xs mt-1">
                    Vui lòng đăng nhập hoặc đăng ký để tiếp tục
                  </div>
                </div>
              )}

              <div className="p-4 border-b border-primary-500">
                <div className="relative">
                  <AiOutlineMonitor className="absolute text-primary-300 text-xl left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:ring focus:ring-primary-300 outline-none"
                    placeholder="Search words"
                  />
                </div>
              </div>

              <div className="flex flex-col p-4 gap-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => navigateItemInMenu(item.id)}
                    className="block text-white hover:text-hover hover:bg-primary-500 px-4 py-3 rounded-lg transition-all duration-200 border border-transparent hover:border-primary-400 text-left bg-transparent cursor-pointer w-full"
                  >
                    <div className="font-semibold">{item.english}</div>
                    <div className="text-sm text-primary-200">
                      {item.chinese}
                    </div>
                  </button>
                ))}

                {/* Mobile Auth Buttons */}
                <hr className="my-2 border-primary-500" />

                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => {
                        const basePath = getBasePath();
                        navigate(`${basePath || "/chinese"}/profile`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-white hover:text-hover hover:bg-primary-500 px-4 py-3 rounded-lg transition-all duration-200 bg-transparent cursor-pointer w-full"
                    >
                      <FiUser />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center space-x-3 text-red-300 hover:text-red-200 hover:bg-red-500/20 px-4 py-3 rounded-lg transition-all duration-200 bg-transparent cursor-pointer w-full"
                    >
                      <FiLogOut />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        const basePath = getBasePath();
                        navigate(`${basePath || "/chinese"}/login`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium w-full"
                    >
                      <FiLogIn />
                      <span>Đăng nhập</span>
                    </button>

                    <button
                      onClick={() => {
                        const basePath = getBasePath();
                        navigate(`${basePath || "/chinese"}/register`);
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg transition-all duration-200 font-medium w-full"
                    >
                      <FiUserPlus />
                      <span>Đăng ký</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="md:hidden mt-4 px-4">
        <div className="relative">
          <AiOutlineMonitor className="absolute text-primary-300 text-xl left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-800 placeholder-gray-500 focus:ring focus:ring-primary-300 outline-none"
            placeholder="Search words"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
