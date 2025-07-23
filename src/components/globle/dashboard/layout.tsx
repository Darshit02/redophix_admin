import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";
import UserAvatar from "../avatar";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex h-screen overflow-hidden bg-white text-gray-900 dark:bg-black/90 dark:text-white">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-gray-100 dark:bg-gray-900`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col ">
        <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
          <button
            className="md:hidden mr-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          <div className="flex items-center justify-between w-full">
            <div className="text-2xl font-extrabold">Redophix</div>
            <div className="border p-2 rounded-xl">
              <UserAvatar name={user.username} email={user.email} imageUrl="" />
            </div>
          </div>
        </div>
        {/* Page content */}
        <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-black/10">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
