import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Folder,
  Settings,
  FileText,
  Phone,
  ClipboardList,
  Image,
  ChevronRight,
  Gauge,
} from "lucide-react";
import type { JSX } from "react";

// Icon map for path segments
const ICON_MAP: Record<string, JSX.Element> = {
  dashboard: <Gauge className="w-6 h-6 mr-2" />,
  portfolio: <Image className="w-6 h-6 mr-2" />,
  inquiries: <FileText className="w-6 h-6 mr-2" />,
  settings: <Settings className="w-6 h-6 mr-2" />,
  "call-bookings": <Phone className="w-6 h-6 mr-2" />,
  "pending-work": <ClipboardList className="w-6 h-6 mr-2" />,
};

function formatLabel(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function Breadcrumb() {
  const location = useLocation();

  // Split the path and remove empty, 'home', and 'admin' segments
  const segments = location.pathname
    .split("/")
    .filter((seg) => seg && seg.toLowerCase() !== "admin" && seg.toLowerCase() !== "home");

  const paths = segments.map((_, i) => "/" + ["admin", ...segments.slice(0, i + 1)].join("/"));

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center text-xl text-gray-400 dark:text-gray-300 mb-4">
      {paths.map((path, index) => {
        const segment = segments[index];
        const label = formatLabel(segment);
        const icon = ICON_MAP[segment.toLowerCase()] || null;
        const isLast = index === paths.length - 1;

        return (
          <div className="flex items-center" key={path}>
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2" />}
            {isLast ? (
              <span className="flex items-center text-white font-medium">
                {icon}
                {label}
              </span>
            ) : (
              <Link to={path} className="flex items-center hover:text-white transition">
                {icon}
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
