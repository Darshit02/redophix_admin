// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Image,
//   Mail,
//   ClipboardList,
//   Phone,
//   Package,
//   Settings,
//   LogOut,
//   Menu,
//   X,
// } from "lucide-react";

// import { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";

// export default function Sidebar() {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);

//   const menuItems = [
//     { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
//     { name: "Portfolio", icon: Image, path: "/admin/portfolio" },
//     { name: "Inquiries", icon: Mail, path: "/admin/inquiries" },
//     { name: "Pending Work", icon: ClipboardList, path: "/admin/pending-work" },
//     { name: "Call Bookings", icon: Phone, path: "/admin/call-bookings" },
//     { name: "Services", icon: Package, path: "/admin/services" },
//     { name: "Settings", icon: Settings, path: "/admin/settings" },
//   ];

//   return (
//     <motion.div
//       animate={{ width: collapsed ? 80 : 260 }}
//       transition={{ type: "spring", stiffness: 300, damping: 30 }}
//       className="h-screen border-r p-4 flex flex-col overflow-hidden
//         bg-white dark:bg-zinc-900 dark:border-zinc-800"
//     >
//       <div className="flex items-center justify-between mb-8">

//         <button
//           onClick={() => setCollapsed(!collapsed)}
//           className="text-gray-500 dark:text-gray-400 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
//         >
//           {collapsed ? (
//             <Menu className="w-5 h-5" />
//           ) : (
//             <X className="w-5 h-5" />
//           )}
//         </button>
//       </div>

//       <nav className="flex flex-col space-y-2">
//         {menuItems.map(({ name, icon: Icon, path }) => (
//           <Link
//             key={name}
//             to={path}
//             title={collapsed ? name : ""}
//             className={`flex items-center p-3 rounded-xl transition
//               hover:bg-indigo-50 dark:hover:bg-indigo-900 text-gray-700 dark:text-gray-300
//               ${
//                 location.pathname === path
//                   ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 font-medium"
//                   : ""
//               }
//             `}
//           >
//             <Icon
//               className={`w-5 h-5 ${
//                 location.pathname === path
//                   ? "text-indigo-600 dark:text-indigo-300"
//                   : "text-gray-500 dark:text-gray-400"
//               }`}
//             />
//             <AnimatePresence>
//               {!collapsed && (
//                 <motion.span
//                   initial={{ opacity: 0, x: -10 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   exit={{ opacity: 0, x: -10 }}
//                   className="ml-3 text-sm"
//                 >
//                   {name}
//                 </motion.span>
//               )}
//             </AnimatePresence>
//           </Link>
//         ))}
//       </nav>

//       <div className="mt-auto pt-6">
//         <button
//           title={collapsed ? "Logout" : ""}
//           className="flex items-center p-3 rounded-xl transition hover:bg-red-50 dark:hover:bg-red-950 text-gray-600 dark:text-gray-300 w-full"
//         >
//           <LogOut className="w-5 h-5 text-red-500 dark:text-red-400" />
//           <AnimatePresence>
//             {!collapsed && (
//               <motion.span
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -10 }}
//                 className="ml-3 text-sm"
//               >
//                 Logout
//               </motion.span>
//             )}
//           </AnimatePresence>
//         </button>
//       </div>
//     </motion.div>
//   );
// }

import { Link, useLocation } from "react-router-dom";
import {
  Gauge,
  Image,
  Mail,
  ClipboardList,
  Phone,
  Package,
  Settings,
  LogOut,
  X,
  Menu,
  UsersRound,
} from "lucide-react";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: Gauge, path: "/admin/dashboard" },
    { name: "Portfolio", icon: Image, path: "/admin/portfolio" },
    { name: "Inquiries", icon: Mail, path: "/admin/inquiries" },
    { name: "Pending Work", icon: ClipboardList, path: "/admin/pending-work" },
    { name: "Teams", icon: UsersRound, path: "/admin/teams" },
    { name: "Services", icon: Package, path: "/admin/services" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  const handleMenuClick = () => {
    if (isMobile && onClose) onClose();
  };

  const handleToggleCollapse = () => {
    if (isMobile && onClose) {
      onClose();
    } else {
      setCollapsed(!collapsed);
    }
  };

  return (
    <motion.div
      animate={{ width: isMobile ? 260 : collapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen border-r flex flex-col overflow-hidden bg-white dark:bg-zinc-900/80 border-gray-200 dark:border-zinc-800/80"
    >
      <div className="p-4 flex flex-col h-full">
        {/* Header with collapse/close toggle */}
        <div className="flex items-center justify-end mb-8">
          <button
            onClick={handleToggleCollapse}
            className="hover:bg-gray-100 dark:hover:bg-slate-800/20 text-gray-800 dark:text-gray-300 p-3 rounded-lg transition-colors"
            aria-label={
              isMobile
                ? "Close sidebar"
                : collapsed
                ? "Expand sidebar"
                : "Collapse sidebar"
            }
          >
            {collapsed ? (
              <Menu className="w-5 h-5" />
            ) : (
              <X className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col space-y-2 flex-1">
          {menuItems.map(({ name, icon: Icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={name}
                to={path}
                title={collapsed && !isMobile ? name : ""}
                onClick={handleMenuClick}
                className={`flex items-center p-3 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-gray-200 dark:bg-slate-800 text-gray-900 dark:text-white font-semibold "
                      : "hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-700 dark:text-gray-300"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                />
                <AnimatePresence mode="wait">
                  {(!collapsed || isMobile) && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="ml-3 text-sm whitespace-nowrap overflow-hidden"
                    >
                      {name}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="pt-6 mt-auto">
          <button
            title={collapsed && !isMobile ? "Logout" : ""}
            className="flex items-center p-3 rounded-xl transition-all duration-200 
              bg-gradient-to-br from-gray-100 to-white dark:from-slate-800/20 dark:to-slate-900/10 
              backdrop-blur-md w-full hover:bg-gray-200 dark:hover:bg-slate-800 cursor-pointer
              text-gray-700 dark:text-gray-300 "
          >
            <LogOut className="w-5 h-5  flex-shrink-0 " />
            <AnimatePresence mode="wait">
              {(!collapsed || isMobile) && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="ml-3 text-sm whitespace-nowrap overflow-hidden "
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
