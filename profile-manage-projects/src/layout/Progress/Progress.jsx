import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProgress, getWords } from "../../api/chineseApi";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/chineseUserSlice";

const Progress = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.chineseUser.login?.currentUser);
  const theme = useSelector((state) => state.theme.themes[state.theme.mode]);
  
  // Get progress state from Redux
  const { streak, progress, lastCheckIn, dailyWordCount } = useSelector(
    (state) => state.chinese.progress
  );
  const { currentHSK, currentWordId, previewWords } = useSelector(
    (state) => state.chinese.words
  );

  const [isLoading, setIsLoading] = useState(true);

  // Axios JWT instance
  const axiosJWT = createAxios(user, dispatch, loginSuccess);

  // Check authentication
  const isLoggedIn = user && user.accessToken;

  useEffect(() => {
    if (!isLoggedIn) {
      // Redirect to login if not authenticated
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        await getProgress(dispatch, axiosJWT, user.accessToken);
        await getWords(dispatch, axiosJWT, user.accessToken);
      } catch (error) {
        console.error("Error fetching progress data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, dispatch, user?.accessToken]);

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme.border} mx-auto mb-4`}></div>
          <p className={theme.textSecondary}>
            Vui lòng đăng nhập để xem tiến độ học tập
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme.border} mx-auto mb-4`}></div>
          <p className={theme.textSecondary}>Đang tải dữ liệu tiến độ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradient}`}>
      <div className="container mx-auto px-4 py-8">
        <h1 className={`text-4xl font-bold text-center ${theme.text} mb-8`}>
          Tiến Độ Học Tập
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Streak Card */}
          <div className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${theme.text}`}>Streak</h3>
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">🔥</span>
              </div>
            </div>
            <div className={`text-3xl font-bold ${theme.text}`}>{streak || 0}</div>
            <p className={`${theme.textSecondary} text-sm`}>ngày liên tiếp</p>
          </div>

          {/* Progress Card */}
          <div className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${theme.text}`}>Tiến Độ</h3>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">📊</span>
              </div>
            </div>
            <div className={`text-3xl font-bold ${theme.text}`}>{progress || 0}%</div>
            <p className={`${theme.textSecondary} text-sm`}>hoàn thành</p>
          </div>

          {/* HSK Level Card */}
          <div className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${theme.text}`}>HSK Level</h3>
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">📚</span>
              </div>
            </div>
            <div className={`text-3xl font-bold ${theme.text}`}>{currentHSK || 1}</div>
            <p className={`${theme.textSecondary} text-sm`}>cấp độ hiện tại</p>
          </div>

          {/* Daily Words Card */}
          <div className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border}`}>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-xl font-semibold ${theme.text}`}>Từ Vựng/ngày</h3>
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">📝</span>
              </div>
            </div>
            <div className={`text-3xl font-bold ${theme.text}`}>{dailyWordCount || 5}</div>
            <p className={`${theme.textSecondary} text-sm`}>từ mới</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border} mb-8`}>
          <h3 className={`text-xl font-semibold ${theme.text} mb-4`}>Tiến Độ HSK {currentHSK || 1}</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div
              className={`bg-gradient-to-r ${theme.button} h-4 rounded-full transition-all duration-1000`}
              style={{ width: `${progress || 0}%` }}
            ></div>
          </div>
          <p className={`${theme.textSecondary} text-sm`}>{progress || 0}% hoàn thành</p>
        </div>

        {/* Recent Activity */}
        <div className={`${theme.card} rounded-xl shadow-lg p-6 border ${theme.border}`}>
          <h3 className={`text-xl font-semibold ${theme.text} mb-4`}>Hoạt Động Gần Đây</h3>
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-4 rounded-lg ${theme.card}`}>
              <div className={`flex items-center space-x-3 ${theme.text}`}>
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                <span>Check-in thành công</span>
              </div>
              <span className={`${theme.textSecondary} text-sm`}>{lastCheckIn ? new Date(lastCheckIn).toLocaleDateString('vi-VN') : 'Chưa có'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;