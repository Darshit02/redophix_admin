import { Menu, X } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-black/90 text-white">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - single instance for both mobile and desktop */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 bg-gray-900 ease-in-out md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center p-4 border-b border-gray-700 dark:border-gray-900">
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
          <span className="text-lg font-bold ml-4 text-gray-900 dark:text-white">
            Redophix
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
