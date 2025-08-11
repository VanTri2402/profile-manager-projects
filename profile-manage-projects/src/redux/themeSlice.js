import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: localStorage.getItem("themeMode") || "midnight",
  themes: {
    light: {
      name: "Sage Light",
      description: "Cảm hứng từ bầu trời và ánh sáng ban ngày.",
      gradient: "from-[#ffffff] via-[#fffbe6] to-[#eafff7]",
      card: "bg-white/80 backdrop-blur-sm border-sage-border-light shadow-xl shadow-blue-100/50",
      button:
        "from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700",
      buttonHover: "from-primary-600 to-primary-700",
      text: "text-sage-900",
      textSecondary: "text-sage-text-muted",
      border: "border-sage-border-light",
      accent: "bg-gradient-to-r from-primary-600 to-accent",
    },
    dark: {
      name: "Dark Modern",
      description: "Gradient từ tím xanh sang tím hiện đại.",
      gradient: "from-gray-900 via-slate-900 to-black",
      card: "bg-darkModern-card border-darkModern-border shadow-2xl shadow-purple-500/10",
      button:
        "from-darkModern-button-from to-darkModern-button-to hover:from-darkModern-buttonHover-from hover:to-darkModern-buttonHover-to",
      buttonHover:
        "from-darkModern-buttonHover-from to-darkModern-buttonHover-to",
      text: "text-darkModern-text",
      textSecondary: "text-darkModern-textSecondary",
      border: "border-darkModern-border",
      accent: "text-darkModern-accent",
    },
    midnight: {
      name: "Midnight Modern",
      description: "Theme gốc với tông màu tím xanh.",
      gradient: "from-slate-900 via-blue-900 to-indigo-900",
      card: "bg-midnightModern-card border-midnightModern-border shadow-2xl shadow-blue-500/10",
      button:
        "from-midnightModern-button-from to-midnightModern-button-to hover:from-midnightModern-buttonHover-from hover:to-midnightModern-buttonHover-to",
      buttonHover:
        "from-midnightModern-buttonHover-from to-midnightModern-buttonHover-to",
      text: "text-midnightModern-text",
      textSecondary: "text-midnightModern-textSecondary",
      border: "border-midnightModern-border",
      accent: "text-midnightModern-accent",
    },
    // ocean: {
    //   name: "Ocean Breeze",
    //   description: "Tông xanh biển mát mẻ, hiện đại.",
    //   gradient: "from-cyan-900 via-blue-900 to-indigo-900",
    //   sidebar: "bg-cyan-900/90 backdrop-blur-sm",
    //   card: "bg-cyan-800/50 backdrop-blur-sm",
    //   button: "from-cyan-500 to-blue-600",
    //   buttonHover: "from-cyan-600 to-blue-700",
    //   text: "text-white",
    //   textSecondary: "text-cyan-200",
    //   border: "border-cyan-700",
    //   accent: "text-cyan-400",
    // },
    // forest: {
    //   name: "Forest Night",
    //   description: "Tông xanh lá và teal, cảm giác thiên nhiên.",
    //   gradient: "from-emerald-900 via-green-900 to-teal-900",
    //   sidebar: "bg-emerald-900/90 backdrop-blur-sm",
    //   card: "bg-emerald-800/50 backdrop-blur-sm",
    //   button: "from-emerald-500 to-teal-600",
    //   buttonHover: "from-emerald-600 to-teal-700",
    //   text: "text-white",
    //   textSecondary: "text-emerald-200",
    //   border: "border-emerald-700",
    //   accent: "text-emerald-400",
    // },
    // sunset: {
    //   name: "Sunset Glow",
    //   description: "Tông cam, đỏ, hồng như hoàng hôn rực rỡ.",
    //   gradient: "from-orange-900 via-red-900 to-pink-900",
    //   sidebar: "bg-orange-900/90 backdrop-blur-sm",
    //   card: "bg-orange-800/50 backdrop-blur-sm",
    //   button: "from-orange-500 to-pink-600",
    //   buttonHover: "from-orange-600 to-pink-700",
    //   text: "text-white",
    //   textSecondary: "text-orange-200",
    //   border: "border-orange-700",
    //   accent: "text-orange-400",
    // },
  },
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("themeMode", action.payload);
    },
    addCustomTheme: (state, action) => {
      const { name, theme } = action.payload;
      state.themes[name] = theme;
    },
    removeTheme: (state, action) => {
      delete state.themes[action.payload];
      if (state.mode === action.payload) {
        state.mode = "midnight";
        localStorage.setItem("themeMode", "midnight");
      }
    },
  },
});

export const { setTheme, addCustomTheme, removeTheme } = themeSlice.actions;
export default themeSlice.reducer;
