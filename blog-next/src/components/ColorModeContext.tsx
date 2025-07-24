import React, { createContext, useMemo, useState, useContext, useEffect } from "react";
import { PaletteMode, ThemeOptions, ThemeProvider, createTheme } from "@mui/material";

interface ColorModeContextProps {
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>("light");
  const [mounted, setMounted] = useState(false);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('colorMode') as PaletteMode | null;
    if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    }
    setMounted(true);
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('colorMode', mode);
    }
  }, [mode, mounted]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = useMemo(() => {
    const base: ThemeOptions = {
      palette: {
        mode,
        primary: {
          main: "#ffa86a",
        },
      },
      typography: {
        fontFamily: [
          "Fira Code",
          "Monaco",
          "Consolas",
          "Ubuntu Mono",
          "monospace",
        ].join(","),
      },
    };
    return createTheme(base);
  }, [mode]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return null;
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
