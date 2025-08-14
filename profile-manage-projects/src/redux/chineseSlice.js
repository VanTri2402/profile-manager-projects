import { createSlice } from "@reduxjs/toolkit";

const chineseSlice = createSlice({
  name: "chinese",
  initialState: {
    words: {
      currentHSK: 1,
      currentWordId: 0,
      previewWords: [],
      isFetching: false,
      error: null,
    },
    progress: {
      streak: 0,
      longestStreak: 0,
      progress: 0,
      lastCheckIn: null,
      dailyWordCount: 5,
      isFetching: false,
      error: null,
    },
    checkIn: {
      isFetching: false,
      error: null,
      lastAction: null,
      addedWords: [],
    },
    settings: {
      isFetching: false,
      error: null,
    },
  },
  reducers: {
    // Check-in reducers
    checkInStart: (state) => {
      state.checkIn.isFetching = true;
      state.checkIn.error = null;
    },
    checkInSuccess: (state, action) => {
      state.checkIn.isFetching = false;
      state.checkIn.lastAction = action.payload.action;
      state.checkIn.addedWords = action.payload.addedWords;
      state.progress.streak = action.payload.streak;
      state.progress.longestStreak = action.payload.longestStreak;
      state.words.currentHSK = action.payload.currentHSK;
      state.words.currentWordId = action.payload.currentWordId;
      state.progress.progress = action.payload.progress;
      state.progress.lastCheckIn = action.payload.lastCheckIn;
      state.progress.dailyWordCount = action.payload.dailyWordCount;
    },
    checkInFailed: (state, action) => {
      state.checkIn.isFetching = false;
      state.checkIn.error = action.payload;
    },

    // Get words reducers
    getWordsStart: (state) => {
      state.words.isFetching = true;
      state.words.error = null;
    },
    getWordsSuccess: (state, action) => {
      state.words.isFetching = false;
      state.words.currentHSK = action.payload.currentHSK;
      state.words.currentWordId = action.payload.currentWordId;
      state.words.previewWords = action.payload.previewWords;
    },
    getWordsFailed: (state, action) => {
      state.words.isFetching = false;
      state.words.error = action.payload;
    },

    // Get progress reducers
    getProgressStart: (state) => {
      state.progress.isFetching = true;
      state.progress.error = null;
    },
    getProgressSuccess: (state, action) => {
      state.progress.isFetching = false;
      state.progress.streak = action.payload.streak;
      state.progress.longestStreak = action.payload.longestStreak;
      state.words.currentHSK = action.payload.currentHSK;
      state.words.currentWordId = action.payload.currentWordId;
      state.progress.progress = action.payload.progress;
      state.progress.lastCheckIn = action.payload.lastCheckIn;
      state.progress.dailyWordCount = action.payload.dailyWordCount;
    },
    getProgressFailed: (state, action) => {
      state.progress.isFetching = false;
      state.progress.error = action.payload;
    },

    // Update settings reducers
    updateSettingsStart: (state) => {
      state.settings.isFetching = true;
      state.settings.error = null;
    },
    updateSettingsSuccess: (state, action) => {
      state.settings.isFetching = false;
      state.progress.dailyWordCount = action.payload.dailyWordCount;
    },
    updateSettingsFailed: (state, action) => {
      state.settings.isFetching = false;
      state.settings.error = action.payload;
    },

    // Reset progress reducers
    resetProgressStart: (state) => {
      state.words.isFetching = true;
      state.words.error = null;
    },
    resetProgressSuccess: (state, action) => {
      state.words.isFetching = false;
      state.words.currentHSK = action.payload.currentHSK;
      state.words.currentWordId = action.payload.currentWordId;
      state.progress.progress = action.payload.progress;
      state.progress.streak = action.payload.streak;
      state.progress.longestStreak = action.payload.longestStreak;
    },
    resetProgressFailed: (state, action) => {
      state.words.isFetching = false;
      state.words.error = action.payload;
    },
  },
});

export const {
  checkInStart,
  checkInSuccess,
  checkInFailed,
  getWordsStart,
  getWordsSuccess,
  getWordsFailed,
  getProgressStart,
  getProgressSuccess,
  getProgressFailed,
  updateSettingsStart,
  updateSettingsSuccess,
  updateSettingsFailed,
  resetProgressStart,
  resetProgressSuccess,
  resetProgressFailed,
} = chineseSlice.actions;

export default chineseSlice.reducer;
