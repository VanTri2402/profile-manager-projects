import React from "react";
import menuHsk from "../../data/menu/menuWord";
import ColorRandom from "../../data/Random/colorRandom";
import { useNavigate } from "react-router-dom";

const FlashcardDefault = () => {
  const navigate = useNavigate();

  // Đơn giản hóa hàm navigateFlashcard
  const navigateFlashcard = (id) => {
    navigate(`/flashcard/${id}`);
  };

  return (
    <div className="bg-background shadow-2xl m-auto w-full flex flex-col items-center justify-center p-8">
      <h1 className="text-[55px] -mt-4 font-bold text-primary-800">
        Flashcard Default
      </h1>
      <p className="text-gray-600 text-xl mt-4">
        This is the default flashcard layout.
      </p>
      <div className="mt-8">
        <button className="px-4 py-2 bg-primary-600 hover:shadow-xl text-white rounded-lg hover:bg-primary-700 transition -mt-2 duration-500">
          Start Learning
        </button>
      </div>
      <div className="grid gap-5 lg:grid-cols-2 text-center text-2xl lg:text-4xl font-sans sm:grid-cols-1 md:grid-cols-1 p-8">
        {menuHsk.map((item) => (
          <div
            className={`${ColorRandom()} lg:w-[30vw] lg:h-[15vh] cursor-pointer hover:shadow-2xl hduration-700 transition-colors hover:bg-opacity-90 shadow-lg p-4 m-2 rounded-lg w-[40vw] h-[8vh]`}
            key={item.id} // Sử dụng item.id thay vì index
            onClick={() => navigateFlashcard(item.id)} // Di chuyển onClick ra đây
          >
            <div className="lg:p-4 lg:font-semibold flex flex-col items-center justify-center h-full text-text">
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
