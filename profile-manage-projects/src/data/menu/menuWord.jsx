import menuWordHsk1 from "../hsk1";
import menuWordHsk2 from "../hsk2";
import menuWordHsk3 from "../hsk3";
import menuWordHsk4 from "../hsk4";
import menuWordHsk5 from "../hsk5";
import menuWordHsk6 from "../hsk6";

const menuHsk = [
  {
    id: 1,
    level: "HSK 1",
    name: "汉语一级",
    vocabCount: 500,
    path: "/flashcard/1",
    link: menuWordHsk1,
    description:
      "Dành cho người mới bắt đầu học tiếng Trung. Bạn sẽ học các từ vựng và ngữ pháp cơ bản nhất.",
  },
  {
    id: 2,
    level: "HSK 2",
    name: "汉语二级",
    vocabCount: 772,
    path: "/flashcard/2",
    link: menuWordHsk2,
    description:
      "Nâng cao từ HSK 1, giúp bạn giao tiếp trong các tình huống đơn giản hàng ngày.",
  },
  {
    id: 3,
    level: "HSK 3",
    name: "汉语三级",
    vocabCount: 300,
    path: "/flashcard/3",
    link: menuWordHsk3,
    description:
      "Đạt trình độ giao tiếp cơ bản trong công việc, học tập và cuộc sống hàng ngày",
  },
  {
    id: 4,
    level: "HSK 4",
    name: "汉语四级",
    vocabCount: 1200,
    path: "/flashcard/4",
    link: menuWordHsk4,
    description:
      "Giao tiếp trôi chảy trong nhiều tình huống và có thể đọc hiểu báo chí đơn giản.",
  },
  {
    id: 5,
    level: "HSK 5",
    name: "汉语五级",
    vocabCount: 2500,
    path: "/flashcard/5",
    link: menuWordHsk5,
    description:
      "Đọc hiểu báo chí, xem phim và tham gia các cuộc thảo luận chuyên môn.",
  },
  {
    id: 6,
    level: "HSK 6",
    name: "汉语六级",
    vocabCount: 5000,
    path: "/flashcard/6",
    link: menuWordHsk6,
    description:
      "Trình độ gần với người bản xứ, có thể đọc hiểu và viết các văn bản phức tạp.",
  },
];

export const totalWordHsk = () => {
  return menuHsk.map((item) => item.link.length);
};

export const totalWords = menuHsk.reduce(
  (total, item) => total + item.link.length,
  0
);

export default menuHsk;
