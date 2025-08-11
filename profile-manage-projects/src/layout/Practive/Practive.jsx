import React from "react";
import Reason from "../../components/reason";
import menuHsk from "../../data/menu/menuWord";
const Practive = () => {
  return (
    <>
      <div className="text-text flex flex-col w-full bg-background min-h-screen">
        <h1 className="font-bold text-center text-4xl m-8">
          Chọn cấp độ HSK của bạn
        </h1>
        {/* grid hsk levels  */}
        <div className="mb-4 grid md:grid-cols-2 lg:grid-cols-3 items-center justify-between rounded-xl sm:grid-cols-1 gap-8 p-4">
          {menuHsk.map((hsk) => (
            <div
              className="
             hover:-translate-y-2 flex m-auto flex-col justify-evenly w-[460px] h-[300px] shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <div className=" text-left bg-primary-200 p-4 rounded-t-xl text-primary-700">
                <h1 className="text-2xl font-bold">{hsk.level}</h1>
                <p className="text-xl text-primary-500">
                  {hsk.name} - {hsk.vocabCount} từ vựng
                </p>
              </div>

              <div className="p-4 text-text text-xl flex flex-col gap-4 min-h-[80px] ">
                <p className="text-text">
                  {hsk.description || "Không có mô tả"}
                </p>
                <div className="w-full rounded-xl bg-gray-500">{}</div>
                <button className="w-full rounded-2xl min-h-[55px] hover:bg-gradient-to-l hover:from-primary-400 hover:to-primary-600 duration-500 transition-all hover:scale-105 text-background text-xl bg-primary-500">
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
