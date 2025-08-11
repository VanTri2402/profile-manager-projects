// Trong file ColorRandom.js (giả định)
const ColorRandom = () => {
  const colors = [
    "bg-red-500",
    "bg-blue-300",
    "bg-success",
    "bg-primary-300",
    "bg-green-400",
    "bg-yellow-200",
    "bg-orange-400",
    "bg-purple-500",
    "bg-pink-500",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};
export default ColorRandom;
