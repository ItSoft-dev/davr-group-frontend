import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-lg border border-border/50 bg-card/50 hover:bg-card flex items-center justify-center transition-all duration-300 hover:border-primary/30"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      <Sun className={`h-4 w-4 absolute transition-all duration-300 ${
        theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100 text-amber-500"
      }`} />
      <Moon className={`h-4 w-4 absolute transition-all duration-300 ${
        theme === "dark" ? "opacity-100 rotate-0 scale-100 text-blue-400" : "opacity-0 -rotate-90 scale-0"
      }`} />
    </button>
  );
};

export default ThemeToggle;
