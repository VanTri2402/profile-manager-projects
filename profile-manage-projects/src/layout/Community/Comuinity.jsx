import React, { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Lucide React Icons
import {
  Users,
  PlusCircle,
  Heart,
  MessageCircle,
  Trophy,
  Crown,
  Loader2,
  Send,
} from "lucide-react";

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// --- MOCK DATA (Dữ liệu giả để hiển thị) ---
const postsData = [
  {
    id: 1,
    author: { name: "An Nguyen", avatar: "/avatars/01.png" },
    time: "5 giờ trước",
    content:
      "Mọi người ơi, có ai có mẹo nào để nhớ chữ Hán nhanh hơn không ạ? Mình hay bị quên mặt chữ quá. 😥",
    likes: 23,
    comments: 7,
  },
  {
    id: 2,
    author: { name: "Bao Tran", avatar: "/avatars/02.png" },
    time: "1 ngày trước",
    content:
      "Mình vừa hoàn thành xong bộ từ vựng HSK 2! Cảm giác thật tuyệt vời. Cảm ơn app đã giúp mình rất nhiều.",
    likes: 45,
    comments: 12,
  },
  {
    id: 3,
    author: { name: "Chi Le", avatar: "/avatars/03.png" },
    time: "2 ngày trước",
    content:
      "大家好! 我是小芝. 我正在学习越南语. 很高兴认识你们. (Chào mọi người! Tôi là Tiểu Chi. Tôi đang học tiếng Việt. Rất vui được làm quen với các bạn.)",
    likes: 78,
    comments: 25,
  },
];

const leaderboardData = [
  {
    rank: 1,
    user: { name: "Thanh Pham", avatar: "/avatars/04.png" },
    xp: 1250,
  },
  { rank: 2, user: { name: "Minh Vu", avatar: "/avatars/05.png" }, xp: 1180 },
  {
    rank: 3,
    user: { name: "Hanh Nguyen", avatar: "/avatars/06.png" },
    xp: 1050,
  },
  { rank: 4, user: { name: "Dung Tran", avatar: "/avatars/07.png" }, xp: 980 },
  { rank: 5, user: { name: "Lan Anh", avatar: "/avatars/08.png" }, xp: 950 },
];

const trendingTopics = [
  "#nguphap",
  "#hsk3",
  "#giaotiep",
  "#meohay",
  "#luyennghe",
];
// --------------------------------------------------------------------

const CommunityPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.chineseUser.login?.currentUser);
  const isLoggedIn = user && user.accessToken;
  const isLoading = false; // Giả lập

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white font-sans z-10">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* === Header === */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                Cộng đồng ChineseApp
              </h1>
              <p className="mt-2 text-lg text-slate-600">
                Nơi giao lưu, học hỏi và cùng nhau tiến bộ.
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg">
                  <PlusCircle className="mr-2 h-5 w-5" /> Tạo bài viết mới
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chia sẻ điều gì đó với cộng đồng</DialogTitle>
                  <DialogDescription>
                    Đặt câu hỏi, chia sẻ kinh nghiệm hoặc một câu chuyện thú vị
                    của bạn.
                  </DialogDescription>
                </DialogHeader>
                <Textarea
                  placeholder="Bạn đang nghĩ gì?"
                  className="min-h-[120px] my-4"
                />
                <DialogFooter>
                  <Button>
                    <Send className="mr-2 h-4 w-4" /> Đăng bài
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </motion.section>

        <Separator className="my-8 bg-slate-200" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* === Main Feed (Left Column) === */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="lg:col-span-2 space-y-6"
          >
            {postsData.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Card className="hover:border-blue-300 transition-colors">
                  <CardHeader className="flex flex-row items-center gap-4">
                    <Avatar>
                      <AvatarImage src={post.author.avatar} />
                      <AvatarFallback>
                        {post.author.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-slate-900">
                        {post.author.name}
                      </p>
                      <p className="text-xs text-slate-500">{post.time}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-700 whitespace-pre-wrap">
                      {post.content}
                    </p>
                  </CardContent>
                  <CardFooter className="flex gap-6">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-slate-600 hover:text-red-500"
                    >
                      <Heart className="h-4 w-4" /> {post.likes} Thích
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-2 text-slate-600 hover:text-blue-500"
                    >
                      <MessageCircle className="h-4 w-4" /> {post.comments} Bình
                      luận
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* === Sidebar (Right Column) === */}
          <div className="lg:col-span-1 space-y-8 sticky top-24">
            {/* Leaderboard Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-amber-500" /> Bảng xếp hạng tuần
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {leaderboardData.map((entry) => (
                      <li key={entry.rank} className="flex items-center gap-4">
                        <span
                          className={`w-8 text-center text-lg font-bold ${
                            entry.rank <= 3
                              ? "text-amber-600"
                              : "text-slate-500"
                          }`}
                        >
                          {entry.rank === 1 ? (
                            <Crown className="h-6 w-6 text-amber-500 mx-auto" />
                          ) : (
                            `#${entry.rank}`
                          )}
                        </span>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={entry.user.avatar} />
                          <AvatarFallback>
                            {entry.user.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-sm text-slate-800">
                            {entry.user.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {entry.xp} XP
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Trending Topics Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Chủ đề nổi bật</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {trendingTopics.map((topic) => (
                    <Badge
                      key={topic}
                      variant="secondary"
                      className="cursor-pointer hover:bg-slate-300"
                    >
                      {topic}
                    </Badge>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CommunityPage;
