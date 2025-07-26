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
  dashboard: <Gauge className="w-5 h-5" />,
  portfolio: <Image className="w-5 h-5" />,
  inquiries: <FileText className="w-5 h-5" />,
  settings: <Settings className="w-5 h-5" />,
  teams: <UsersRound className="w-5 h-5" />,
  "pending-work": <ClipboardList className="w-5 h-5" />,
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

  // Create the breadcrumb paths
  const paths = segments.map((_, i) => "/" + ["admin", ...segments.slice(0, i + 1)].join("/"));

  if (segments.length === 0) return null;

  return (
    <nav className="flex items-center text-sm text-muted-foreground mb-4 overflow-x-auto">
      {paths.map((path, index) => {
        const segment = segments[index];
        const label = formatLabel(segment);
        const icon = ICON_MAP[segment.toLowerCase()];
        const isLast = index === paths.length - 1;

        return (
          <div className="flex items-center whitespace-nowrap" key={path}>
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-border" />
            )}

            {isLast ? (
              <span className="flex items-center font-medium text-foreground">
                {icon && <span className="mr-1">{icon}</span>}
                {label}
              </span>
            ) : (
              <Link
                to={path}
                className="flex items-center hover:text-foreground transition-colors"
              >
                {icon && <span className="mr-1">{icon}</span>}
                {label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
