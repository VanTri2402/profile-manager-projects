import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { BrainCircuit, BookCopy, ChevronRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import menuHsk from "../../data/menu/menuWord";

const PracticePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login?.currentUser);
  const isLoggedIn = user && user.accessToken;

  // Giả lập state loading
  const isLoading = false; 

  if (!isLoggedIn) {
     // Logic redirect về trang login...
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white font-sans z-10">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Luyện tập & Bài tập
          </h1>
          <p className="mt-2 text-lg text-slate-600">
            Củng cố kiến thức của bạn qua các bài tập trắc nghiệm đa dạng.
          </p>
        </motion.section>

        <Separator className="my-8 bg-slate-200" />
        
        <motion.section
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {menuHsk.map((item) => (
              <motion.div
                key={item.id}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              >
                <Card className="h-full flex flex-col bg-slate-50 hover:shadow-lg hover:border-blue-400 border-slate-200 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-2">
                        <div className="w-12 h-12 bg-blue-100 text-blue-500 flex items-center justify-center rounded-lg">
                            <BrainCircuit className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{item.level}</CardTitle>
                            <CardDescription>{item.name}</CardDescription>
                        </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow text-slate-600 text-sm">
                    {item.description || `Bộ từ vựng gồm ${item.vocabCount} từ, bao gồm các chủ đề giao tiếp cơ bản.`}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => navigate(`/chinese/practice/${item.id}`)}>
                      Bắt đầu luyện tập <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
        </motion.section>
      </div>
    </main>
  );
};

export default PracticePage;