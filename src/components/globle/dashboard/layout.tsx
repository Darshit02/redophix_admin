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
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out 
                    md:relative md:translate-x-0 
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex items-center px-4 py-3 border-b bg-card shadow-sm border-border">
          <button
            className="md:hidden mr-3 text-muted-foreground"
            onClick={() => setSidebarOpen(true)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="flex items-center justify-between w-full">
            <div className="text-xl font-bold tracking-tight">Redophix</div>
            <div className="bg-muted p-2 rounded-xl">
              <UserAvatar
                name={user?.username || "User"}
                email={user?.email || "user@example.com"}
                imageUrl=""
              />
            </div>
          </div>
        </div>

        {/* Page body */}
        <main className="flex-1 overflow-y-auto bg-muted/10">
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
