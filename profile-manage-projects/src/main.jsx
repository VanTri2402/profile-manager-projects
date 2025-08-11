import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import HomeApp from "./HomeApp.jsx";
import AppChinese from "../web/AppChinese/AppChinese.jsx";
import AppMangerUser from "../web/AppManageUser/AppManageUser.jsx";
import AppIPALearning from "../web/AppIPAEnglish.jsx";
import { Routes, Route } from "react-router-dom";
import { Component, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./redux/store.js";
import store from "./redux/store.js";
import Baitaphtml from "./baitaphtml.jsx";
import AppProduct from "../web/AppProduct/AppProduct.jsx";
// Modern Mouse Trail Component with Random Colors
const MouseTrail = () => {
  const [positions, setPositions] = useState([]);
  const colors = [
    "bg-green-400", // Neon green
    "bg-blue-500", // Neon blue
    "bg-gradient-to-r from-red-500 to-yellow-400", // Red-yellow neon gradient
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newPos = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
        color: colors[Math.floor(Math.random() * colors.length)], // Random color
      };
      setPositions((prev) => [...prev, newPos].slice(-8)); // Keep last 8 orbs
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {positions.map((pos, index) => (
        <div
          key={pos.id}
          className={`absolute h-4 w-4 rounded-full ${pos.color} opacity-70 blur-md`}
          style={{
            left: pos.x - 8, // Center the orb
            top: pos.y - 8,
            animation: `pulseAndFade 1s ease-out forwards`,
            animationDelay: `${index * 0.1}s`, // Staggered animation
            transform: `scale(${1 - index * 0.1})`, // Scale down older orbs
          }}
        />
      ))}
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h3 className="text-xl font-bold text-red-600">
            Lỗi hiển thị ứng dụng
          </h3>
          <p className="text-gray-600">Vui lòng thử lại hoặc liên hệ hỗ trợ.</p>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <MouseTrail /> {/* Modern trail with random colors */}
              <Routes>
                <Route path="/*" element={<HomeApp />} />
                <Route path="/chinese/*" element={<AppChinese />} />
                <Route path="/managerUser/*" element={<AppMangerUser />} />
                <Route path="/ipa-learning/*" element={<AppIPALearning />} />
                <Route path="/product/*" element={<AppProduct />} />
                <Route path="/baitap" element={<Baitaphtml />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </Provider>
        <ToastContainer position="top-right" autoClose={5000} />
    </ErrorBoundary>
  </StrictMode>
);
