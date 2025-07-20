import { cn } from "@/lib/utils";

import { useThemeMode } from "@/hooks/use-theme";
import { SystemMode } from "../theme-placeholder/system-mode";
import { DarkMode } from "../theme-placeholder/dark-mode";
import { LightMode } from "../theme-placeholder/light-mode";

const DarkModetoggle = () => {
  const { setTheme, theme } = useThemeMode();
  return (
    <div className="grid grid-col-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-4 flex lg:flex-row flex-col items-start cursor-pointer gap-5">
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "system" && "border-green-500"
          )}
          onClick={() => setTheme("system")}
        >
          <SystemMode />
        </div>
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "dark" && "border-green-500"
          )}
          onClick={() => setTheme("dark")}
        >
          <DarkMode />
        </div>
        <div
          className={cn(
            "rounded-2xl overflow-hidden cursor-pointer border-4 border-transparent",
            theme == "light" && "border-green-500"
          )}
          onClick={() => setTheme("light")}
        >
          <LightMode />
        </div>
      </div>
    </div>
  );
};

export default DarkModetoggle;
