import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProgress, getWords } from "../../api/chineseApi";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/chineseUserSlice";
import Reason from "../../components/Reason";
import menuHsk from "../../data/menu/menuWord";

const Practive = () => {
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
        console.error("Error fetching practice data:", error);
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
            Vui lòng đăng nhập để truy cập bài tập
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
          <p className={theme.textSecondary}>Đang tải dữ liệu bài tập...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`flex flex-col w-full bg-gradient-to-br ${theme.gradient} min-h-screen`}>
        <h1 className={`font-bold text-center text-4xl m-8 ${theme.text}`}>
          Chọn cấp độ HSK của bạn
        </h1>
        {/* grid hsk levels  */}
        <div className="mb-4 grid md:grid-cols-2 lg:grid-cols-3 items-center justify-between rounded-xl sm:grid-cols-1 gap-8 p-4">
          {menuHsk.map((hsk) => (
            <div
              key={hsk.id}
              className={`
                hover:-translate-y-2 flex m-auto flex-col justify-evenly w-[460px] h-[300px] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer
                ${theme.card} border ${theme.border}
              `}
            >
              <div className={`text-left p-4 rounded-t-xl ${theme.text} bg-gradient-to-r ${theme.button}`}>
                <h1 className="text-2xl font-bold text-white">{hsk.level}</h1>
                <p className="text-xl text-white/90">
                  {hsk.name} - {hsk.vocabCount} từ vựng
                </p>
              </div>

              <div className={`p-4 text-xl flex flex-col gap-4 min-h-[80px] ${theme.text}`}>
                <p className={theme.text}>
                  {hsk.description || "Không có mô tả"}
                </p>
                <div className={`w-full rounded-xl ${theme.border} bg-gray-500`}>{}</div>
                <button className={`w-full rounded-2xl min-h-[55px] hover:bg-gradient-to-l hover:from-primary-400 hover:to-primary-600 duration-500 transition-all hover:scale-105 text-white text-xl bg-gradient-to-r ${theme.button}`}>
                  Xem Bài Tập
                </button>
              </div>
            </div>
          ))}
        </div>
        <Reason />
      </div>
    </>
  );
};

export default Practive;