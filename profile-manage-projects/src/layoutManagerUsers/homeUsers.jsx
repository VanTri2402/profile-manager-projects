import React, { useEffect, useMemo, useState } from "react";
import {
  FiUsers,
  FiSettings,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiEye,
  FiLogOut,
  FiChevronDown,
  FiX,
  FiMail,
  FiLock,
  FiEyeOff,
  FiAlertCircle,
  FiUser,
  FiRefreshCw,
  FiCheck,
} from "react-icons/fi";
import {
  MdDashboard,
  MdPalette,
  MdAdminPanelSettings,
  MdVerifiedUser,
  MdSupervisorAccount,
} from "react-icons/md";
import {
  HiOutlineUserGroup,
  HiOutlineCog,
  HiOutlineChartBar,
  HiOutlineUserAdd,
} from "react-icons/hi";
import {
  BsShieldCheck,
  BsPersonCheck,
  BsPersonX,
  BsPerson,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  logout,
  register,
  updateAdmin,
  updateUser,
} from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginSuccess } from "../redux/authSlice";
import { createAxios } from "../createInstance";
import { setTheme } from "../redux/themeSlice";
import { set } from "lodash";

const HomeUser = () => {
  const currentUser = useSelector((state) => state.auth.login.currentUser);
  const userList = useSelector((state) => {
    console.log("CurrentUser State:", state.auth.login.currentUser);
    return state.users?.users || state.users?.allUsers || state.users || [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [debugInfo, setDebugInfo] = useState("");

  // Theme state
  const currentTheme = useSelector((state) => state.theme.mode);

  // Modal form states
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCfPassword, setShowCfPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Update user states
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const axiosJWT = createAxios(currentUser, dispatch, loginSuccess);
  // Theme configurations
  const themes = useSelector((state) => state.theme.themes);
  const theme = themes[currentTheme];
  console.log(" Themes :", themes);
  console.log("Current Theme:", currentTheme);
  console.log("Theme Object:", theme);
  // Debug logging
  useEffect(() => {
    setDebugInfo(`
      CurrentUser: ${currentUser ? "✅" : "❌"}
      UserList: ${userList ? "✅" : "❌"}
      UserList Length: ${
        Array.isArray(userList) ? userList.length : "Not Array"
      }
      Type: ${typeof userList}
    `);
    console.log("Debug Info:", debugInfo);
  }, [currentUser, userList]);

  // Fetch users with error handling
  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      await getAllUsers(currentUser.accessToken, dispatch, axiosJWT);
      setTimeout(() => setIsLoading(false), 500);
      toast.success("Tải danh sách user thành công!");
    } catch (error) {
      console.error("❌ Fetch Users Error:", error);
      setIsLoading(false);
      toast.error("Không thể tải danh sách user. Kiểm tra kết nối API!");
    }
  };

  useEffect(() => {
    const checkAuth = setTimeout(() => {
      if (!currentUser?.accessToken) {
        console.log("❌ No access token, redirecting...");
        navigate("/managerUser/login");
        toast.error("Vui lòng đăng nhập lại!");
        return;
      }
      fetchUsers();
    }, 100);

    return () => clearTimeout(checkAuth);
  }, [currentUser?.accessToken, dispatch, navigate]);

  // Check if user is new (within 7 days)
  const isNewUser = (createdAt) => {
    if (!createdAt) return false;
    const userDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - userDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  // Get recent users
  const recentUsers = useMemo(() => {
    const safeUserList = Array.isArray(userList)
      ? userList
      : userList?.users || userList?.allUsers || [];
    return safeUserList.filter((user) => isNewUser(user?.createdAt));
  }, [userList]);

  // Handle delete user
  const handleDelete = async (id) => {
    if (!currentUser?.accessToken) {
      toast.error("Bạn cần đăng nhập để thực hiện hành động này!");
      return;
    }

    if (id === currentUser.user._id) {
      if (!window.confirm("Xóa tài khoản của chính bạn? Sẽ đăng xuất ngay!"))
        return;
      try {
        await deleteUser(currentUser.accessToken, dispatch, id, axiosJWT);
        await logout(dispatch, id, navigate, currentUser.accessToken, axiosJWT);
        toast.success("Xóa tài khoản thành công!");
      } catch (error) {
        console.error("❌ Delete User Error:", error);
        toast.error("Không thể xóa tài khoản!");
      }
      return;
    }

    if (!currentUser.user.admin) {
      toast.error("Bạn không có quyền xóa user khác!");
      return;
    }

    if (!window.confirm("Coi chừng! Xóa user này không thể hoàn tác đâu nha!"))
      return;

    try {
      await deleteUser(currentUser.accessToken, dispatch, id, axiosJWT);
      await fetchUsers();
      toast.success("Xóa user thành công!");
    } catch (error) {
      console.error("❌ Delete User Error:", error);
      toast.error("Không thể xóa user!");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await logout(
        dispatch,
        currentUser.user._id,
        navigate,
        currentUser.accessToken,
        axiosJWT
      );
      toast.success("Đăng xuất thành công! Hẹn gặp lại!");
      navigate("/managerUser/login");
    } catch (error) {
      console.error("❌ Logout Error:", error);
      navigate("/managerUser/login");
      toast.info("Đã đăng xuất khỏi ứng dụng!");
    }
  };

  // Handle theme change
  const handleThemeChange = (themeName) => {
    dispatch(setTheme(themeName));
    setShowThemeModal(false);
  };

  // Handle edit user
  const handleEditUser = (user) => {
    setEditingUser(user);
    setGmail(user.gmail);
    setPassword("");
    setConfirmPassword("");
    setIsAdmin(user.admin);
    setIsEditMode(true);
    setShowUserModal(true);
    setError("");
  };

  // Validate form
  const validateForm = () => {
    if (!gmail || !gmail.includes("@")) {
      setError("Email không hợp lệ!");
      return false;
    }
    if (!isEditMode && (!password || password.length < 6)) {
      setError("Mật khẩu phải có ít nhất 6 ký tự!");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return false;
    }
    return true;
  };

  // Handle update user
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const updatedUser = {
      _id: editingUser._id,
      gmail,
      admin: isAdmin,
      ...(password && { password }), // Only include password if provided
    };

    setIsUpdating(true);
    try {
      await updateUser(dispatch, updatedUser);
      toast.success("Cập nhật user thành công! Tốt lắm!");
      resetForm();
      setShowUserModal(false);
      await fetchUsers();
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error || "Cập nhật user thất bại!";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle create user
  const handleCreateUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newUser = { gmail, password };

    setIsCreating(true);
    try {
      const res = await register(newUser, dispatch, navigate);
      if (isAdmin) {
        await updateAdmin(dispatch, res.user, currentUser.accessToken);
      }
      toast.success("Tạo user mới thành công! Chào mừng thành viên mới!");
      resetForm();
      setShowUserModal(false);
      await fetchUsers();
    } catch (error) {
      const errorMessage = error?.response?.data?.error || "Tạo user thất bại!";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsCreating(false);
    }
  };
  // Reset form
  const resetForm = () => {
    setGmail("");
    setPassword("");
    setConfirmPassword("");
    setIsAdmin(false);
    setError("");
    setIsEditMode(false);
    setEditingUser(null);
    setShowPassword(false);
    setShowCfPassword(false);
    setShowUserModal(false);
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleCfPasswordVisibility = () => setShowCfPassword((prev) => !prev);

  // Filter users with useMemo for performance
  const filteredUsers = useMemo(() => {
    const safeUserList = Array.isArray(userList)
      ? userList
      : userList?.users || userList?.allUsers || [];
    return safeUserList.filter((user) => {
      const matchesSearch = user?.gmail
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole =
        selectedRole === "all" || user?.admin === (selectedRole === "Admin");
      return matchesSearch && matchesRole;
    });
  }, [userList, searchTerm, selectedRole]);

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedRole]);

  const getStatusColor = (status) => {
    const statusColors = {
      "Hoạt động": "text-green-400 bg-green-400/10 border-green-400/20",
      "Tạm khóa": "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
      "Không hoạt động": "text-gray-400 bg-gray-400/10 border-gray-400/20",
      "Không xác định": "text-red-400 bg-red-400/10 border-red-400/20",
    };
    return (
      statusColors[status] || "text-gray-400 bg-gray-400/10 border-gray-400/20"
    );
  };

  const getRoleColor = (admin) => {
    return admin
      ? "text-blue-400 bg-blue-400/10 border-blue-400/20"
      : "text-purple-400 bg-purple-400/10 border-purple-400/20";
  };

  const getUserStatus = (user, currentUser) => {
    if (!user || !currentUser) return "Không xác định";
    return user.gmail === currentUser.user.gmail ||
      user._id === currentUser.user._id
      ? "Hoạt động"
      : "Không hoạt động";
  };

  const getAvatarColor = (gmail) => {
    if (!gmail) return "bg-gray-500";
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-orange-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-cyan-500",
      "bg-emerald-500",
    ];
    return colors[gmail.charCodeAt(0) % colors.length];
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString("vi-VN");
    } catch {
      return dateString;
    }
  };

  if (isLoading || !currentUser) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}
      >
        <div className="flex flex-col items-center space-y-4">
          <div
            className={`w-12 h-12 border-4 ${theme.accent.replace(
              "text-",
              "border-"
            )} border-t-transparent rounded-full animate-spin`}
          />
          <p className={theme.textSecondary}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient}`}>
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 ${theme.sidebar} backdrop-blur-sm border-r ${theme.border}`}
      >
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div
              className={`w-10 h-10 bg-gradient-to-r ${theme.button} rounded-xl flex items-center justify-center shadow-lg`}
            >
              <HiOutlineUserGroup className="w-6 h-6 text-white" />
            </div>
            <h1 className={`text-xl font-bold ${theme.text}`}>UserManager</h1>
          </div>
          <nav className="space-y-2">
            <div
              className={`bg-gradient-to-r ${theme.button} rounded-xl p-3 flex items-center space-x-3 shadow-lg`}
            >
              <MdDashboard className="w-5 h-5 text-white" />
              <span className="font-medium text-white">Dashboard</span>
            </div>
            <div className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition-all duration-200">
              <HiOutlineChartBar className="w-5 h-5" />
              <span>Thống kê</span>
            </div>
            <div
              onClick={() => setShowThemeModal(true)}
              className="text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl p-3 flex items-center space-x-3 cursor-pointer transition-all duration-200"
            >
              <HiOutlineCog className="w-5 h-5" />
              <span>Cài đặt</span>
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>
              Dashboard
            </h2>
            <p className={theme.textSecondary}>
              Chào mừng trở lại, chiến binh!
            </p>
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center space-x-3 ${theme.sidebar} hover:bg-gray-800/90 rounded-xl p-4 transition-all duration-200 border ${theme.border} backdrop-blur-sm shadow-lg`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(
                  currentUser?.user?.gmail
                )}`}
              >
                <span className="text-sm font-medium text-white">
                  {currentUser?.user?.gmail?.charAt(0)?.toUpperCase() || "A"}
                </span>
              </div>
              <div className="text-left">
                <p className={`font-medium ${theme.text}`}>
                  {currentUser?.user?.gmail || "Admin"}
                </p>
                <p className={`text-xs ${theme.textSecondary}`}>
                  {currentUser?.user?.admin ? "Quản trị viên" : "Người dùng"}
                </p>
              </div>
              <FiChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  showUserMenu ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <div
                className={`absolute right-0 mt-2 w-64 ${theme.sidebar}/95 rounded-xl shadow-2xl border ${theme.border} z-50 backdrop-blur-sm animate-fadeIn`}
              >
                <div className={`p-4 border-b ${theme.border}`}>
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${getAvatarColor(
                        currentUser?.user?.gmail
                      )}`}
                    >
                      <span className="text-lg font-medium text-white">
                        {currentUser?.user?.gmail?.charAt(0)?.toUpperCase() ||
                          "A"}
                      </span>
                    </div>
                    <div>
                      <p className={`font-medium ${theme.text}`}>
                        {currentUser?.user?.gmail || "Admin"}
                      </p>
                      <p className="text-sm text-gray-400">
                        {currentUser?.user?.gmail || "admin@example.com"}
                      </p>
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium mt-1 border ${getRoleColor(
                          currentUser?.user?.admin
                        )}`}
                      >
                        {currentUser?.user?.admin ? (
                          <>
                            <MdAdminPanelSettings className="w-3 h-3 mr-1" />
                            Admin
                          </>
                        ) : (
                          <>
                            <BsPerson className="w-3 h-3 mr-1" />
                            User
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      setShowThemeModal(true);
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-200"
                  >
                    <FiSettings className="w-4 h-4" />
                    <span>Cài đặt tài khoản</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowUserMenu(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center space-x-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            className={`${theme.card} backdrop-blur-sm rounded-2xl p-6 border ${theme.border} shadow-xl hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${theme.text}`}>
                Tổng Users
              </h3>
              <div
                className={`w-12 h-12 bg-gradient-to-r ${theme.button} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <FiUsers className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className={`text-4xl font-bold ${theme.text}`}>
                {filteredUsers.length}
              </span>
            </div>
          </div>
          <div
            className={`${theme.card} backdrop-blur-sm rounded-2xl p-6 border ${theme.border} shadow-xl hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${theme.text}`}>
                Tổng Admin
              </h3>
              <div
                className={`w-12 h-12 bg-gradient-to-r ${theme.button} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <MdAdminPanelSettings className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className={`text-4xl font-bold ${theme.text}`}>
                {filteredUsers.filter((user) => user.admin).length}
              </span>
            </div>
          </div>
          <div
            className={`${theme.card} backdrop-blur-sm rounded-2xl p-6 border ${theme.border} shadow-xl hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${theme.text}`}>
                Tổng User
              </h3>
              <div
                className={`w-12 h-12 bg-gradient-to-r ${theme.button} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <BsPerson className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className={`text-4xl font-bold ${theme.text}`}>
                {filteredUsers.filter((user) => !user.admin).length}
              </span>
            </div>
          </div>
          <div
            className={`${theme.card} backdrop-blur-sm rounded-2xl p-6 border ${theme.border} shadow-xl hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${theme.text}`}>
                Users Mới
              </h3>
              <div
                className={`w-12 h-12 bg-gradient-to-r ${theme.button} rounded-xl flex items-center justify-center shadow-lg`}
              >
                <HiOutlineUserAdd className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-end space-x-2">
              <span className={`text-4xl font-bold ${theme.text}`}>
                {recentUsers.length}
              </span>
              <span className="text-xs text-gray-400 mb-1">(7 ngày)</span>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div
          className={`${theme.card} backdrop-blur-sm rounded-2xl border ${theme.border} shadow-xl`}
        >
          <div className={`p-6 border-b ${theme.border}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-2xl font-semibold ${theme.text}`}>
                Users Gần đây
              </h3>
              <div className="flex space-x-4">
                <button
                  onClick={fetchUsers}
                  className={`bg-gradient-to-r ${theme.button} hover:${theme.buttonHover} px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                >
                  <FiRefreshCw className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Làm mới</span>
                </button>
                <button
                  onClick={() => {
                    resetForm();
                    setShowUserModal(true);
                  }}
                  className={`bg-gradient-to-r ${theme.button} hover:${theme.buttonHover} px-6 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5`}
                >
                  <HiOutlineUserAdd className="w-5 h-5 text-white" />
                  <span className="text-white font-medium">Thêm User Mới</span>
                </button>
              </div>
            </div>
            <div className="flex space-x-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm kiếm theo email..."
                  className={`w-full ${theme.gradient} border ${theme.border} rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${theme.text} placeholder-gray-400 transition-all duration-200`}
                />
              </div>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className={`${theme.gradient} border ${theme.border} rounded-xl px-4 py-3 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 ${theme.textSecondary} transition-all duration-200`}
              >
                <option value="all">Tất cả vai trò</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-autog">
            <table className="w-full">
              <thead className={`${theme.gradient}`}>
                <tr className={`${theme.border} border-b-3`}>
                  <th
                    className={`text-left p-4 ${theme.textSecondary} font-semibold`}
                  >
                    User
                  </th>
                  <th
                    className={`text-left p-4 ${theme.textSecondary} font-semibold`}
                  >
                    Email
                  </th>
                  <th
                    className={`text-left p-4 ${theme.textSecondary} font-semibold`}
                  >
                    Vai trò
                  </th>
                  <th
                    className={`text-left p-4 ${theme.textSecondary} font-semibold`}
                  >
                    Trạng thái
                  </th>
                  <th
                    className={`text-left p-4 ${theme.textSecondary} font-semibold`}
                  >
                    Ngày tham gia
                  </th>
                  <th
                    className={`text-left p-4 ${theme.textSecondary} font-semibold`}
                  >
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-8 text-center">
                      <div className="flex flex-col items-center space-y-4">
                        <FiUsers className="w-16 h-16 text-gray-600" />
                        <div>
                          <p className="text-gray-400 text-lg">
                            {searchTerm || selectedRole !== "all"
                              ? "Không tìm thấy user nào phù hợp!"
                              : "Chưa có user nào cả!"}
                          </p>
                          <p className="text-gray-500 text-sm mt-2">
                            Thử thêm user mới hoặc làm mới danh sách nhé!
                          </p>
                          <button
                            onClick={fetchUsers}
                            className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white text-sm flex items-center space-x-2"
                          >
                            <FiRefreshCw className="w-4 h-4" />
                            <span>Làm mới</span>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  currentUsers.map((user, index) => (
                    <tr
                      key={user?._id || index}
                      className="hover:bg-gray-800/50 border-b border-gray-700/50 last:border-b-0 transition-all duration-200"
                    >
                      <td className="p-4 flex items-center space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-white shadow-lg ${getAvatarColor(
                            user?.gmail
                          )}`}
                        >
                          {user?.gmail?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className={`font-medium ${theme.text}`}>
                              {user?.gmail || "N/A"}
                            </p>
                            {isNewUser(user?.createdAt) && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-400/10 text-green-400 border border-green-400/20">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1 animate-pulse"></span>
                                Mới
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-400">
                            ID: {user?._id || "N/A"}
                          </p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">
                        {user?.gmail || "N/A"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${getRoleColor(
                            user?.admin
                          )}`}
                        >
                          {user?.admin ? (
                            <>
                              <BsShieldCheck className="w-3 h-3 mr-1" />
                              Admin
                            </>
                          ) : (
                            <>
                              <BsPerson className="w-3 h-3 mr-1" />
                              User
                            </>
                          )}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium border ${getStatusColor(
                            getUserStatus(user, currentUser)
                          )}`}
                        >
                          {getUserStatus(user, currentUser) === "Hoạt động" ? (
                            <BsPersonCheck className="w-3 h-3 mr-1" />
                          ) : (
                            <BsPersonX className="w-3 h-3 mr-1" />
                          )}
                          {getUserStatus(user, currentUser)}
                        </span>
                      </td>
                      <td className="p-4 text-gray-300">
                        {formatDate(user?.createdAt)}
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <button
                            className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 group"
                            title="Xem chi tiết"
                          >
                            <FiEye className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 group"
                            title="Chỉnh sửa"
                          >
                            <FiEdit className="w-4 h-4 text-gray-400 group-hover:text-yellow-400" />
                          </button>
                          <button
                            onClick={() => handleDelete(user?._id)}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-all duration-200 group"
                            title="Xóa user"
                            disabled={!user?._id}
                          >
                            <FiTrash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className={`p-6 flex justify-between items-center border-t ${theme.border}`}
            >
              <p className="text-sm text-gray-400">
                Hiển thị {Math.min(startIndex + 1, filteredUsers.length)} -{" "}
                {Math.min(startIndex + usersPerPage, filteredUsers.length)}{" "}
                trong số {filteredUsers.length} user
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-white"
                >
                  Trước
                </button>
                <span className="text-sm text-gray-400 px-4">
                  Trang {currentPage} / {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-white"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Theme Selection Modal */}
        {showThemeModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div
              className={`w-full max-w-lg ${theme.card} rounded-2xl shadow-2xl overflow-hidden border ${theme.border} animate-scaleIn`}
            >
              <div className={`p-8 pb-6 bg-gradient-to-r ${theme.button}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <MdPalette className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Chọn Theme Giao Diện
                      </h2>
                      <p className="text-white/80 text-sm">
                        Tùy chỉnh giao diện cho vibe của bạn!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowThemeModal(false)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-8 pt-6">
                <div className="space-y-4">
                  {Object.entries(themes).map(([key, themeOption]) => (
                    <div
                      key={key}
                      onClick={() => handleThemeChange(key)}
                      className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:scale-105 ${
                        currentTheme === key
                          ? `border-blue-500 bg-blue-500/10`
                          : `border-gray-700 hover:border-gray-600 bg-gray-800/50`
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-16 h-12 rounded-lg bg-gradient-to-br ${themeOption.gradient} border ${themeOption.border} flex items-center justify-center`}
                          >
                            <div
                              className={`w-6 h-6 bg-gradient-to-r ${themeOption.button} rounded-md flex items-center justify-center`}
                            >
                              <MdPalette className="w-3 h-3 text-white" />
                            </div>
                          </div>
                          <div>
                            <h3 className={`font-semibold ${theme.text}`}>
                              {themeOption.name}
                            </h3>
                            <p className="text-sm text-gray-400">
                              {themeOption.description}
                            </p>
                          </div>
                        </div>
                        {currentTheme === key && (
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
                            <FiCheck className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowThemeModal(false)}
                  className="w-full mt-6 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Create/Update User Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
            <div
              className={`w-full max-w-md ${theme.card} rounded-2xl shadow-2xl overflow-hidden border ${theme.border} animate-scaleIn`}
            >
              <div className={`p-8 pb-6 bg-gradient-to-r ${theme.button}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <FiUser className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {isEditMode ? "Cập nhật User" : "Tạo User Mới"}
                      </h2>
                      <p className="text-white/80 text-sm">
                        {isEditMode
                          ? "Chỉnh sửa thông tin user"
                          : "Điền thông tin để tạo tài khoản mới"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetForm}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <FiX className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-8 pt-6">
                <form
                  onSubmit={isEditMode ? handleUpdateUser : handleCreateUser}
                  className="space-y-6"
                >
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="gmail"
                      name="gmail"
                      value={gmail}
                      onChange={(e) => setGmail(e.target.value)}
                      className="peer w-full pl-10 pr-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                      placeholder="Email"
                      required
                    />
                    <label
                      htmlFor="gmail"
                      className="absolute left-10 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-3 peer-focus:left-3 peer-focus:text-indigo-400 peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-valid:-top-3 peer-valid:left-3 peer-valid:text-sm bg-gray-900 px-1"
                    >
                      Email
                    </label>
                  </div>

                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="peer w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                      placeholder="Password"
                      required={!isEditMode}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-10 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-3 peer-focus:left-3 peer-focus:text-indigo-400 peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-valid:-top-3 peer-valid:left-3 peer-valid:text-sm bg-gray-900 px-1"
                    >
                      Password {isEditMode && "(Để trống nếu không đổi)"}
                    </label>
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="relative">
                    <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showCfPassword ? "text" : "password"}
                      id="cfpassword"
                      name="cfpassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="peer w-full pl-10 pr-12 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-transparent focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                      placeholder="Confirm Password"
                      required={!isEditMode}
                    />
                    <label
                      htmlFor="cfpassword"
                      className="absolute left-10 top-3 text-gray-400 transition-all duration-300 peer-focus:-top-3 peer-focus:left-3 peer-focus:text-indigo-400 peer-focus:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-valid:-top-3 peer-valid:left-3 peer-valid:text-sm bg-gray-900 px-1"
                    >
                      Confirm Password
                    </label>
                    <button
                      type="button"
                      onClick={toggleCfPasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                    >
                      {showCfPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                    <input
                      type="checkbox"
                      name="admin"
                      id="admin"
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-600 rounded bg-gray-700"
                    />
                    <label
                      htmlFor="admin"
                      className="text-gray-300 text-sm flex items-center space-x-2"
                    >
                      <MdSupervisorAccount className="w-4 h-4" />
                      <span>Cấp quyền Admin</span>
                    </label>
                  </div>

                  {error && (
                    <div className="flex items-center p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <FiAlertCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isCreating || isUpdating}
                    className={`w-full bg-gradient-to-r ${
                      theme.button
                    } text-white font-semibold py-3 px-4 rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:ring-offset-gray-900 ${
                      isCreating || isUpdating
                        ? "opacity-50 cursor-not-allowed transform-none"
                        : ""
                    }`}
                  >
                    {isEditMode
                      ? isUpdating
                        ? "Đang cập nhật..."
                        : "Cập nhật User"
                      : isCreating
                      ? "Đang tạo..."
                      : "Tạo User"}
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Hủy
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Overlay for modals */}
        {(showUserMenu || showThemeModal) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setShowUserMenu(false);
              setShowThemeModal(false);
            }}
          />
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default HomeUser;
