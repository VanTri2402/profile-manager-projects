import React from "react";
import { menuReason } from "../data/menu/menuReason";

const Reason = () => {
  const [isShow, setIsShow] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => setIsShow(mediaQuery.matches);

    handleResize(); // check lần đầu
    mediaQuery.addEventListener("change", handleResize); // update khi resize

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (!isShow) return null;

  return (
    <div className="p-6 flex flex-col w-full">
      <h1 className="text-text text-4xl mb-2 text-center font-bold">
        Tại sao chọn chúng tôi ?
      </h1>
      <div className=" mb-[50px] mt-[40px] flex justify-around tracking-wider flex-row gap-6 flex-wrap items-center">
        {menuReason.map((item) => (
          <div
            key={item.id}
            className="min-h-[350px] hover:shadow-xl duration-300 hover:-translate-y-3 cursor-pointer bg-background shadow-md w-[300px] flex flex-col gap-4 items-center rounded-lg"
          >
            <div className="px-6 py-4 flex items-center justify-center bg-primary-100 w-full rounded-t-2xl">
              <div className="bg-primary-300 w-[60px] h-[60px] rounded-full p-2">
                <div className=" flex items-center pt-1 justify-center text-[32px] m-auto text-center">
                  <item.icon />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center text-center p-4 gap-2">
              <div className="mb-2 text-primary-900 font-bold text-2xl">
                {item.title}
              </div>
              <div className="text-gray-500 text-xl">{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reason;
