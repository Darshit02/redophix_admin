import { cn } from "@/lib/utils";
import { useThemeMode } from "@/hooks/use-theme";
import { SystemMode } from "../theme-placeholder/system-mode";
import { DarkMode } from "../theme-placeholder/dark-mode";
import { LightMode } from "../theme-placeholder/light-mode";

const DarkModetoggle = () => {
  const { setTheme, theme } = useThemeMode();

  const ModeCard = ({
    mode,
    children,
  }: {
    mode: "system" | "dark" | "light";
    children: React.ReactNode;
  }) => (
    <div
      role="button"
      aria-pressed={theme === mode}
      tabIndex={0}
      onClick={() => setTheme(mode)}
      onKeyDown={(e) => e.key === "Enter" && setTheme(mode)}
     className={cn(
    "rounded-2xl overflow-hidden border-2 transition-colors",
    "cursor-pointer ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "w-fit", // Ensures grid item takes full width
    theme === mode ? "border-primary" : "border-border"
  )}
    >
      {children}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      <ModeCard mode="system">
        <SystemMode />
      </ModeCard>
      <ModeCard mode="dark">
        <DarkMode />
      </ModeCard>
      <ModeCard mode="light">
        <LightMode />
      </ModeCard>
    </div>
  );
};

export default DarkModetoggle;
