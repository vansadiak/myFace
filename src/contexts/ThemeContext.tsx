import React, { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import {
  PaletteId,
  FontPairingId,
  applyPalette,
  applyFontPairing,
} from "../utils/theme-utils";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  paletteId: PaletteId;
  setPaletteId: (id: PaletteId) => void;
  fontPairingId: FontPairingId;
  setFontPairingId: (id: FontPairingId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const DEFAULT_PALETTE: PaletteId = "dandiya";
const DEFAULT_FONT: FontPairingId = "unbounded-plex";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    if (stored !== null) return stored === "true";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  const [paletteId, setPaletteIdState] = useState<PaletteId>(() => {
    return (localStorage.getItem("paletteId") as PaletteId) || DEFAULT_PALETTE;
  });

  const [fontPairingId, setFontPairingIdState] = useState<FontPairingId>(() => {
    return (localStorage.getItem("fontPairingId") as FontPairingId) || DEFAULT_FONT;
  });

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", String(next));
      return next;
    });
  }, []);

  const setPaletteId = useCallback((id: PaletteId) => {
    setPaletteIdState(id);
    localStorage.setItem("paletteId", id);
  }, []);

  const setFontPairingId = useCallback((id: FontPairingId) => {
    setFontPairingIdState(id);
    localStorage.setItem("fontPairingId", id);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Apply palette CSS vars whenever palette or dark mode changes
  useEffect(() => {
    applyPalette(paletteId, isDarkMode);
  }, [paletteId, isDarkMode]);

  // Apply font CSS vars whenever font pairing changes
  useEffect(() => {
    applyFontPairing(fontPairingId);
  }, [fontPairingId]);

  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        paletteId,
        setPaletteId,
        fontPairingId,
        setFontPairingId,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
