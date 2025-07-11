import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
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
    { name: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
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
        bg-white dark:bg-zinc-900 dark:border-zinc-800"
    >
      <div className="flex items-center justify-between mb-8">

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 dark:text-gray-400 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
        >
          {collapsed ? (
            <Menu className="w-5 h-5" />
          ) : (
            <X className="w-5 h-5" />
          )}
        </button>
      </div>

      <nav className="flex flex-col space-y-2">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            title={collapsed ? name : ""}
            className={`flex items-center p-3 rounded-xl transition
              hover:bg-indigo-50 dark:hover:bg-indigo-900 text-gray-700 dark:text-gray-300
              ${
                location.pathname === path
                  ? "bg-indigo-100 dark:bg-indigo-800 text-indigo-600 dark:text-indigo-300 font-medium"
                  : ""
              }
            `}
          >
            <Icon
              className={`w-5 h-5 ${
                location.pathname === path
                  ? "text-indigo-600 dark:text-indigo-300"
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
        ))}
      </nav>

      <div className="mt-auto pt-6">
        <button
          title={collapsed ? "Logout" : ""}
          className="flex items-center p-3 rounded-xl transition hover:bg-red-50 dark:hover:bg-red-950 text-gray-600 dark:text-gray-300 w-full"
        >
          <LogOut className="w-5 h-5 text-red-500 dark:text-red-400" />
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
