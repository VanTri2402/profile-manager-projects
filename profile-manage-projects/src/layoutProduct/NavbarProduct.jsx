import React from "react";
import { FaShoppingCart, FaPlus, FaSun, FaMoon, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { setTheme } from "../redux/themeSlice";

const NavbarProduct = ({ onAddProduct }) => {
  const themes = useSelector((state) => state.theme.themes);
  const themeMode = useSelector((state) => state.theme.mode);
  const theme = themes[themeMode];
  const dispatch = useDispatch();

  // Hàm đổi theme giống HomeApp
  const handleToggleMode = () => {
    let nextMode;
    if (themeMode === "light") nextMode = "dark";
    else if (themeMode === "dark") nextMode = "midnight";
    else nextMode = "light";
    dispatch(setTheme(nextMode));
  };

  // Chọn icon theo theme
  const themeIcon =
    themeMode === "light" ? (
      <FaSun className="text-yellow-400" />
    ) : themeMode === "dark" ? (
      <FaMoon className="text-blue-700" />
    ) : (
      <FaStar className="text-indigo-300" />
    );

  return (
    <nav
      className={`${theme.card} z-[999] ${theme.text} p-8 flex justify-between items-center border-b ${theme.border}`}
      style={{ position: "relative" }}
    >
      <div className="flex items-center">
        <span className="font-bold text-xl">PRODUCT STORE</span>
        <FaShoppingCart className="ml-2 text-blue-400" />
      </div>
      <div className="flex space-x-4">
        <button
          className={`hover:bg-blue-500/20 rounded border-2 p-4 ${theme.border}`}
          onClick={onAddProduct}
          aria-label="Thêm sản phẩm"
          type="button"
          style={{ position: "relative", zIndex: 1001 }}
        >
          <FaPlus className={theme.text} />
        </button>
        <button
          type="button"
          className={`hover:bg-yellow-400/20 rounded border-2 p-4 ${theme.border}`}
          onClick={handleToggleMode}
          aria-label="Đổi theme"
          style={{ position: "relative", zIndex: 1001 }}
        >
          {themeIcon}
        </button>
      </div>
    </nav>
  );
};

export default NavbarProduct;
