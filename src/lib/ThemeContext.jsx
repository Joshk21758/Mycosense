import { createContext, useContext, useMemo, useState } from "react";
import { getTheme } from "../constants/theme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const colors = useMemo(() => {
    const theme = getTheme(isDarkMode);

    return {
      ...theme,
      card: theme.surface,
      heading: theme.text,
      body: theme.secondaryText,
      switchOff: theme.border,
      switchThumb: theme.surface,
    };
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ colors, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
