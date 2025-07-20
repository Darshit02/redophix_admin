import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - single instance for both mobile and desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar 
          isOpen={sidebarOpen} 
          onClose={() => setSidebarOpen(false)} 
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-hidden">
        {/* Mobile header */}
        <div className="p-4 md:hidden flex items-center border-b bg-white dark:bg-zinc-900">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 dark:text-gray-300 p-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold ml-4 text-gray-900 dark:text-white">
            LazyLabs Admin
          </span>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}