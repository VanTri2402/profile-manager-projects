import React, { useState, useEffect } from "react";
// UX-IMPROVEMENT: Import motion từ framer-motion
import { motion } from "framer-motion";
import {
  BookOpen,
  Search,
  Menu,
  User,
  LogOut,
  UserPlus,
  LogIn,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../api/authApi";
import { menuItems } from "../../data/menu/menuItems";

// Shadcn/ui Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
// UX-IMPROVEMENT: Thêm Tooltip để tăng tính rõ ràng cho icon
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  // Thay vì state cho hovered text, chúng ta sẽ dùng state cho item đang được hover
  // để điều khiển animation của background pill
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ... (Toàn bộ logic hooks và functions của bạn giữ nguyên)
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login.currentUser);
  const isLoggedIn = user && user.accessToken && user.user;

  useEffect(() => {
    if (
      !isLoggedIn &&
      location.pathname.startsWith("/chinese") &&
      location.pathname !== "/chinese/login" &&
      location.pathname !== "/chinese/register"
    ) {
      navigate("/chinese/login");
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const getBasePath = () => {
    if (location.pathname.startsWith("/chinese")) return "/chinese";
    if (location.pathname.startsWith("/managerUser")) return "/managerUser";
    return "";
  };

  const navigateItemInMenu = (id) => {
    const basePath = getBasePath();
    if (id === "home") {
      navigate(basePath === "/chinese" ? "/chinese" : "/");
    } else {
      navigate(`${basePath || "/chinese"}/${id}`);
    }
    setIsMobileMenuOpen(false);
  };

  const getUserInitials = () => {
    if (user?.user?.gmail && isLoggedIn) {
      const email = user.user.gmail;
      const namePart = email.split("@")[0];
      return namePart.substring(0, 2).toUpperCase();
    }
    return "G";
  };

  const handleLogout = () => {
    if (user?.user?._id) {
      logout(dispatch, user.user._id, navigate, user?.accessToken);
      navigate("/chinese/login");
      toast.success("Đăng xuất thành công!");
    }
  };

  const handleAuthNavigation = (path) => {
    const basePath = getBasePath();
    navigate(`${basePath || "/chinese"}/${path}`);
    setIsMobileMenuOpen(false);
  };

  // Component cho menu người dùng, không thay đổi nhiều
  const UserMenuItems = ({ isMobile = false }) => (
    <>
      {isLoggedIn ? (
        <>
          {isMobile ? null : (
            <>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none text-slate-900">
                    {user?.user?.gmail || "Guest User"}
                  </p>
                  <p className="text-xs leading-none text-slate-600">
                    {user?.user?.admin ? "Admin" : "Member"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="border-slate-200" />
            </>
          )}
          <DropdownMenuItem
            className="cursor-pointer font-sans text-slate-600 focus:bg-slate-100 focus:text-slate-900"
            onSelect={() => handleAuthNavigation("profile")}
          >
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer font-sans text-slate-600 focus:bg-slate-100 focus:text-slate-900"
            onSelect={() => handleAuthNavigation("settings")}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="border-slate-200" />
          <DropdownMenuItem
            className="cursor-pointer font-sans text-red-500 focus:bg-red-50 focus:text-red-600"
            onSelect={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Đăng xuất</span>
          </DropdownMenuItem>
        </>
      ) : (
        <>
          <div className="p-4 text-center">
            <h3 className="font-medium text-slate-900">Chào mừng bạn!</h3>
            <p className="text-sm text-slate-600 mt-1">
              Vui lòng đăng nhập hoặc đăng ký để tiếp tục.
            </p>
          </div>
          <div className="p-2 pt-0 space-y-2">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 transition-colors"
              onClick={() => handleAuthNavigation("login")}
            >
              <LogIn className="mr-2 h-4 w-4" /> Đăng nhập
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleAuthNavigation("register")}
            >
              <UserPlus className="mr-2 h-4 w-4" /> Đăng ký
            </Button>
          </div>
        </>
      )}
    </>
  );

  return (
    // TooltipProvider bao bọc toàn bộ component để Tooltip hoạt động
    <TooltipProvider>
      <header className="relative top-0 z-50 w-full border-b border-slate-200 bg-slate-50/95 backdrop-blur h-[100px] text-xl flex items-center supports-[backdrop-filter]:bg-slate-50/60 font-sans">
        <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left Section: Logo & Desktop Nav */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 text-2xl">
              <BookOpen className="h-6 w-6 text-slate-900" />
              <div className="flex flex-col">
                <span className="font-bold leading-tight text-slate-900">
                  ChineseApp
                </span>
                <span className="text-sm leading-tight text-slate-600">
                  中文学习
                </span>
              </div>
            </a>

            {/* UX-IMPROVEMENT: Desktop Navigation với hiệu ứng Framer Motion */}
            <nav
              className="hidden md:flex items-center gap-1 relative"
              onMouseLeave={() => setHoveredItemId(null)} // Reset khi chuột rời khỏi cả khu vực nav
            >
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="font-semibold text-slate-600 text-lg hover:text-slate-900 transition-colors relative px-4 py-2" // Thêm relative và padding để background pill vừa vặn
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onClick={() => navigateItemInMenu(item.id)}
                >
                  {/* Background pill di chuyển mượt mà */}
                  {hoveredItemId === item.id && (
                    <motion.span
                      className="absolute inset-0 rounded-md bg-slate-200/80 -z-10"
                      layoutId="hoverBackground" // Cùng layoutId để Framer Motion biết đây là cùng một element đang di chuyển
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.15 } }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.1 },
                      }}
                    />
                  )}
                  {item.english}
                </Button>
              ))}
            </nav>
          </div>

          {/* Right Section: Search, User Menu & Mobile Menu */}
          <div className="flex items-center gap-2 text-2xl">
            {/* UX-IMPROVEMENT: Ô search mở rộng khi focus */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600 pointer-events-none" />
              <Input
                type="search"
                placeholder="Search words..."
                // Thêm transition và thay đổi width khi focus
                className="w-full rounded-2xl bg-white pl-9 sm:w-[200px] lg:w-[250px] border-slate-200 focus:w-[300px] transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
              />
            </div>

            {/* Desktop User Menu */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-13 w-13 rounded-full"
                  >
                    <Avatar className="h-12 w-12 border-2 border-slate-200 group-hover:border-blue-400 transition-colors">
                      <AvatarImage src={user?.user?.avatarUrl} alt="Avatar" />
                      <AvatarFallback className="bg-slate-200 text-slate-900 font-semibold">
                        {getUserInitials()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                {/* UX-IMPROVEMENT: Thêm animation cho DropdownMenuContent */}
                <DropdownMenuContent
                  className="w-56 bg-white shadow-lg rounded-xl border-slate-200 font-sans data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                  align="end"
                  forceMount
                >
                  <UserMenuItems />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Menu className="h-5 w-5 text-slate-900" />
                        <span className="sr-only">Toggle Menu</span>
                      </Button>
                    </SheetTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Mở Menu</p>
                  </TooltipContent>
                </Tooltip>

                {/* UX-IMPROVEMENT: Animation cho SheetContent */}
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[340px] bg-slate-50 border-l-slate-200"
                >
                  {/* ... (Nội dung SheetContent giữ nguyên) */}
                  <SheetHeader>
                    <SheetTitle>
                      <a href="/" className="flex items-center gap-2">
                        <BookOpen className="h-6 w-6 text-slate-900" />
                        <span className="font-bold text-lg text-slate-900">
                          Menu
                        </span>
                      </a>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-4 flex flex-col h-full">
                    {isLoggedIn && (
                      <>
                        <div className="flex items-center gap-3 p-2 rounded-lg bg-slate-100">
                          <Avatar className="h-10 w-10 border-2 border-white">
                            <AvatarImage src={user?.user?.avatarUrl} />
                            <AvatarFallback className="bg-slate-200 text-slate-900 font-semibold">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-slate-900">
                              {user?.user?.gmail}
                            </span>
                            <span className="text-xs text-slate-600">
                              {user?.user?.admin ? "Admin" : "Member"}
                            </span>
                          </div>
                        </div>
                        <Separator className="my-4 bg-slate-200" />
                      </>
                    )}
                    <nav className="flex flex-col gap-2">
                      {menuItems.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          className="font-semibold text-slate-600 justify-start p-4 h-auto text-base hover:bg-slate-200/60 hover:text-slate-900"
                          onClick={() => navigateItemInMenu(item.id)}
                        >
                          <div className="flex flex-col items-start">
                            <span>{item.english}</span>
                            <span className="text-sm font-normal text-slate-500">
                              {item.chinese}
                            </span>
                          </div>
                        </Button>
                      ))}
                    </nav>
                    <Separator className="my-4 bg-slate-200" />
                    <div className="flex flex-col gap-2">
                      <UserMenuItems isMobile={true} />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
};

export default Navbar;
