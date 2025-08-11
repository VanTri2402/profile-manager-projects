// Biến toàn cục để lưu ngày hoạt động và currentWord
let activityDates = [new Date("2025-06-02")]; // Bắt đầu từ 2/6/2025
let persistentCurrentWord = 0;

// Hàm tính streak dựa trên ngày hoạt động
const calculateStreak = () => {
  let streak = 1;
  for (let i = activityDates.length - 1; i > 0; i--) {
    const current = activityDates[i];
    const previous = activityDates[i - 1];
    const timeDiff = current - previous;
    const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
    if (daysDiff > 1) {
      return streak; // Dừng nếu bỏ lỡ 1 ngày
    }
    streak++;
  }
  return streak;
};

// Hàm lấy streak
export const getStreak = () => {
  return calculateStreak();
};

// Hàm lấy currentWord, chỉ tăng khi có ngày mới
export const getCurrentWord = () => {
  const currentDate = new Date();
  const today = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const lastActivity = activityDates[activityDates.length - 1];
  if (lastActivity.toDateString() !== today.toDateString()) {
    const currentStreak = calculateStreak();
    const newWords = currentStreak * 5;
    persistentCurrentWord += newWords;
    activityDates.push(today);
  }
  return persistentCurrentWord;
};

// Trong file progress.js
export const skipDay = () => {
  const lastDate = activityDates[activityDates.length - 1];
  const nextDay = new Date(lastDate);
  nextDay.setDate(lastDate.getDate() + 1); // Thêm 1 ngày thay vì 2
  activityDates.push(nextDay);
};
