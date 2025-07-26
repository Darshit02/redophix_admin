import { Link, useLocation } from "react-router-dom";
import {
  Gauge,
  Image,
  Mail,
  Package,
  Settings,
  LogOut,
  X,
  Menu,
  UsersRound,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // tailwind class merge helper
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SidebarProps {
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
    <TooltipProvider>
      <motion.div
        animate={{ width: isMobile ? 260 : collapsed ? 80 : 260 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-screen border-r flex flex-col overflow-hidden 
                   bg-sidebar text-sidebar-foreground border-sidebar-border"
      >
        <div className="p-4 flex flex-col h-full">
          {/* Navigation */}
          <nav className="flex flex-col gap-2 flex-1">
            {menuItems.map(({ name, icon: Icon, path }) => {
              const isActive = location.pathname === path;
              const linkClasses = cn(
                "flex items-center p-3 pl-4 rounded-xl transition-all duration-200 group",
                isActive
                  ? "bg-primary/10 text-primary font-medium border-r-2 border-primary"
                  : "hover:bg-muted/40 text-muted-foreground border-r-2 border-transparent"
              );

              const iconClasses = cn(
                "w-5 h-5 flex-shrink-0",
                isActive ? "text-primary" : "text-muted-foreground"
              );

              const label = (
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
              );

              return collapsed && !isMobile ? (
                <Tooltip key={name}>
                  <TooltipTrigger asChild>
                    <Link to={path} onClick={handleMenuClick} className={linkClasses}>
                      <Icon className={iconClasses} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">{name}</TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  key={name}
                  to={path}
                  onClick={handleMenuClick}
                  className={linkClasses}
                >
                  <Icon className={iconClasses} />
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Footer Actions */}
          <div className="space-y-2 pt-6 mt-auto">
            {/* Collapse / Expand Button */}
            <button
              onClick={handleToggleCollapse}
              title={collapsed && !isMobile ? "Expand" : "Collapse"}
              className="flex items-center p-3 pl-4 rounded-xl w-full transition-colors
                         hover:bg-muted/40 text-muted-foreground"
            >
              {collapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
              {(!collapsed || isMobile) && (
                <span className="ml-3 text-sm">Collapse</span>
              )}
            </button>

            {/* Logout Button */}
            <button
              title={collapsed && !isMobile ? "Logout" : ""}
              className="flex items-center p-3 pl-4 rounded-xl w-full transition-colors
                         hover:bg-muted/40 text-muted-foreground"
            >
              <LogOut className="w-5 h-5" />
              {(!collapsed || isMobile) && (
                <span className="ml-3 text-sm">Logout</span>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
