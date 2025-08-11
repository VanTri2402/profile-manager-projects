import { Routes, Route, useLocation } from "react-router-dom";
import FlashcardDefault from "../../src/layout/Flashcard/FlashcardDefault";
import Flashcard from "../../src/layout/Flashcard/Flashcard";
import Progress from "../../src/layout/Progress/Progress";
import Practive from "../../src/layout/Practive/Practive";
import Vocabulary from "../../src/layout/Vocabulary/Vocabulary";
import BodyHome from "../../src/layout/home/BodyHome";
import Navbar from "../../src/layout/home/Navbar";
import Footer from "../../src/layout/home/Footer";
import Login from "../../src/components/Login/Login";
import Register from "../../src/components/Register/Register";
import { menuItems } from "../../src/data/menu/menuItems";

const AppChinese = () => {
  const location = useLocation();

  // Danh sách các trang đặc biệt không hiển thị navbar và footer
  const specialPages = ["/chinese/login", "/chinese/register"];

  // Kiểm tra xem trang hiện tại có phải là trang đặc biệt không
  const isSpecialPage = specialPages.some(
    (page) =>
      location.pathname === page || location.pathname.startsWith(page + "/")
  );

  return (
    <div className="bg-background flex flex-col min-h-screen">
      {/* Chỉ hiển thị Navbar nếu không phải trang đặc biệt */}
      {!isSpecialPage && <Navbar menuItems={menuItems} />}

      <main
        className={`flex-grow flex items-start ${
          isSpecialPage ? "min-h-screen" : ""
        }`}
      >
        <Routes>
          <Route index element={<BodyHome />} />
          <Route path="vocabulary" element={<Vocabulary />} />
          <Route path="flashcard" element={<FlashcardDefault />} />
          <Route path="flashcard/:id" element={<Flashcard />} />
          <Route path="progress" element={<Progress />} />
          <Route path="practive" element={<Practive />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
      </main>

      {/* Chỉ hiển thị Footer nếu không phải trang đặc biệt */}
      {!isSpecialPage && <Footer />}
    </div>
  );
};

export default AppChinese;
