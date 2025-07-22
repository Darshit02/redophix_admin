import { Link, useLocation } from "react-router-dom";
import {
  Settings,
  FileText,
  Phone,
  ClipboardList,
  Image,
  ChevronRight,
  Gauge,
  UsersRound,
} from "lucide-react";
import type { JSX } from "react";

// Icon map for path segments
const ICON_MAP: Record<string, JSX.Element> = {
  dashboard: <Gauge className="md:w-8 md:h-8 mr-2" />,
  portfolio: <Image className="md:w-8 md:h-8 mr-2" />,
  inquiries: <FileText className="md:w-8 md:h-8 mr-2" />,
  settings: <Settings className="md:w-8 md:h-8 mr-2" />,
  teams: <UsersRound className="md:w-8 md:h-8 mr-2" />,
  "pending-work": <ClipboardList className="md:w-8 md:h-8 mr-2" />,
};

function formatLabel(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
export default function Breadcrumb() {
  const location = useLocation();

  // Remove empty, 'admin', and 'home' segments
  const segments = location.pathname
    .split("/")
    .filter((seg) => seg && seg.toLowerCase() !== "admin" && seg.toLowerCase() !== "home");

  // Build breadcrumb paths including 'admin' prefix
  const paths = segments.map((_, i) => "/" + ["admin", ...segments.slice(0, i + 1)].join("/"));

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
      {paths.map((path, index) => {
        const segment = segments[index];
        const label = formatLabel(segment);
        const icon = ICON_MAP[segment.toLowerCase()] || null;
        const isLast = index === paths.length - 1;

        return (
          <div className="flex items-center" key={path}>
            {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400 dark:text-gray-500" />}

            {isLast ? (
              <span className="flex items-center font-semibold text-gray-900 dark:text-white">
                {icon && <span className="mr-2">{icon}</span>}
                {label}
              </span>
            ) : (
              <Link
                to={path}
                className="flex items-center hover:text-black dark:hover:text-white transition-colors"
              >
                {icon && <span className="mr-2">{icon}</span>}
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
