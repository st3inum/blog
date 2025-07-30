import React, { createContext, useMemo, useState, useContext, useEffect, useCallback } from "react";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import { createAppTheme } from "../theme";

interface ColorModeContextProps {
  toggleColorMode: () => void;
  mode: PaletteMode;
  setMode: (mode: PaletteMode) => void;
  setSystemTheme: () => void;
  isSystemTheme: boolean;
}

const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
  mode: 'light',
  setMode: () => {},
  setSystemTheme: () => {},
  isSystemTheme: false,
});

export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setModeState] = useState<PaletteMode>("light");
  const [isSystemTheme, setIsSystemTheme] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Function to detect system color scheme
  const detectSystemTheme = (): PaletteMode => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  };

  // Set mode and update localStorage
  const setMode = useCallback((newMode: PaletteMode) => {
    setModeState(newMode);
    setIsSystemTheme(false);
  }, []);

  // Set system theme
  const setSystemTheme = useCallback(() => {
    const systemTheme = detectSystemTheme();
    setModeState(systemTheme);
    setIsSystemTheme(true);
  }, []);

  // Load saved theme from localStorage on mount
  useEffect(() => {
    const savedMode = localStorage.getItem('colorMode') as PaletteMode | null;
    const systemPreference = localStorage.getItem('useSystemTheme');
    
    if (systemPreference === 'true') {
      setSystemTheme();
    } else if (savedMode && (savedMode === 'light' || savedMode === 'dark')) {
      setMode(savedMode);
    } else {
      // Default to system preference if no saved preference
      setSystemTheme();
    }
    
    setMounted(true);
  }, [setMode, setSystemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    if (!isSystemTheme || typeof window === 'undefined') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (isSystemTheme) {
        setModeState(e.matches ? 'dark' : 'light');
      }
    };
    
    // Add listener with modern API
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    
    return undefined;
  }, [isSystemTheme]);

  // Save theme preferences to localStorage when they change
  useEffect(() => {
    if (mounted) {
      localStorage.setItem('colorMode', mode);
      localStorage.setItem('useSystemTheme', isSystemTheme.toString());
      
      // Update data-theme attribute for CSS scoping
      document.documentElement.setAttribute('data-theme', mode);
      
      // Trigger syntax highlighter theme update
      if (typeof window !== 'undefined' && (window as any).handleThemeChange) {
        (window as any).handleThemeChange();
      }
    }
  }, [mode, isSystemTheme, mounted]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        if (isSystemTheme) {
          // If currently using system theme, switch to manual mode with opposite of current
          setMode(mode === "light" ? "dark" : "light");
        } else {
          // If already in manual mode, just toggle
          setMode(mode === "light" ? "dark" : "light");
        }
      },
      mode,
      setMode,
      setSystemTheme,
      isSystemTheme,
    }),
    [mode, isSystemTheme, setMode, setSystemTheme]
  );

  const theme = useMemo(() => {
    return createTheme(createAppTheme(mode));
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
