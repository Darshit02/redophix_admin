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
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: Gauge, path: "/admin/dashboard" },
    { name: "Portfolio", icon: Image, path: "/admin/portfolio" },
    { name: "Inquiries", icon: Mail, path: "/admin/inquiries" },
    { name: "Pending Work", icon: ClipboardList, path: "/admin/pending-work" },
    { name: "Call Bookings", icon: Phone, path: "/admin/call-bookings" },
    { name: "Services", icon: Package, path: "/admin/services" },
    { name: "Settings", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen border-r p-4 flex flex-col overflow-hidden 
        bg-white/60 dark:bg-zinc-900/60 backdrop-blur-lg dark:border-zinc-900"
    >
      <div className="flex items-end justify-end mb-8">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className=" p-2 rounded hover:bg-black/5 dark:hover:bg-slate-800/20 text-gray-800 dark:text-gray-300 "
        >
          {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      <nav className="flex flex-col space-y-2">
        {menuItems.map(({ name, icon: Icon, path }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={name}
              to={path}
              title={collapsed ? name : ""}
              className={`flex items-center p-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-white/20 dark:bg-slate-800/20 backdrop-blur-md shadow-sm text-white dark:text-white font-medium border border-white/20 dark:border-slate-800/20"
                    : "hover:bg-black/5 dark:hover:bg-slate-800/20 text-gray-800 dark:text-gray-300"
                }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive
                    ? "text-white dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="ml-3 text-sm"
                  >
                    {name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6">
        <button
          title={collapsed ? "Logout" : ""}
          className="flex items-center p-3 rounded-xl transition hover:bg-black/5 dark:hover:bg-slate-800/20 text-gray-800 dark:text-gray-300 w-full "
        >
          <LogOut className="h-5 w-5" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-3 text-sm"
              >
                Logout
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </motion.div>
  );
}
