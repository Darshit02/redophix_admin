import { useTheme } from "@/components/theme-provider"

export const useThemeMode = () => {
  const {
    theme,
    setTheme,
  } = useTheme()
  return {
    theme,
    setTheme,
  }
}
