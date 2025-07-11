import { Menu } from "lucide-react";
import { useState } from "react";
import Sidebar from "./sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile sidebar */}
      
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full overflow-y-auto">
        <div className="p-4 md:hidden flex items-center border-b">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold ml-4">LazyLabs Admin</span>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
