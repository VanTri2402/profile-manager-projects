import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProgress, getWords } from "../../api/chineseApi";
import { createAxios } from "../../createInstance";
import { loginSuccess } from "../../redux/chineseUserSlice";
import menuHsk from "../../data/menu/menuWord";
import ColorRandom from "../../data/Random/colorRandom";
import { useNavigate } from "react-router-dom";

const FlashcardDefault = () => {
  const navigate = useNavigate();
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
        console.error("Error fetching flashcard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isLoggedIn, dispatch, user?.accessToken]);

  // Đơn giản hóa hàm navigateFlashcard
  const navigateFlashcard = (id) => {
    navigate(`/flashcard/${id}`);
  };

  if (!isLoggedIn) {
    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
        <div className="text-center">
          <div className={`animate-spin rounded-full h-12 w-12 border-b-2 ${theme.border} mx-auto mb-4`}></div>
          <p className={theme.textSecondary}>
            Vui lòng đăng nhập để truy cập flashcard
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
          <p className={theme.textSecondary}>Đang tải dữ liệu flashcard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${theme.card} shadow-2xl m-auto w-full flex flex-col items-center justify-center p-8 border ${theme.border}`}>
      <h1 className={`text-[55px] -mt-4 font-bold ${theme.text}`}>
        Flashcard Default
      </h1>
      <p className={`${theme.textSecondary} text-xl mt-4`}>
        This is the default flashcard layout.
      </p>
      <div className="mt-8">
        <button className={`px-4 py-2 bg-gradient-to-r ${theme.button} hover:shadow-xl text-white rounded-lg hover:opacity-90 transition -mt-2 duration-500`}>
          Start Learning
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-2 text-center text-2xl lg:text-4xl font-sans sm:grid-cols-1 md:grid-cols-1 p-8">
        {menuHsk.map((item) => (
          <div
            className={`${ColorRandom()} lg:w-[30vw] lg:h-[15vh] cursor-pointer hover:shadow-2xl hduration-700 transition-colors hover:bg-opacity-90 shadow-lg p-4 m-2 rounded-lg w-[40vw] h-[8vh] border ${theme.border}`}
            key={item.id} // Sử dụng item.id thay vì index
            onClick={() => navigateFlashcard(item.id)} // Di chuyển onClick ra đây
          >
            <div className="lg:p-4 lg:font-semibold flex flex-col items-center justify-center h-full text-white">
              <h2 className="text-lg text-center">{item.level}</h2>
              <h3 className="text-xl">
                {item.name}{" "}
                <span className="text-[22px]">{item.vocabCount} word</span>
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashcardDefault;