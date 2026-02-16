import React, { lazy, Suspense, useState, useRef, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider, useTheme } from "../../contexts/ThemeContext";
import { getThemeClasses } from "../../utils/theme-utils";
import {
  palettes,
  fontPairings,
  PaletteId,
  FontPairingId,
} from "../../utils/theme-utils";
import { cvDownloadLink } from "../../types/me";

// Lazy load components
const Home = lazy(() => import("../Home/Home"));
const Contact = lazy(() => import("../ContactMe/Contact"));
const Projects = lazy(() => import("../Projects/Projects"));

interface RouteConfig {
  path: string;
  component: React.ComponentType;
  label: string;
}

const routes: RouteConfig[] = [
  { path: "/", component: Home, label: "HOME" },
  { path: "/experience", component: Projects, label: "EXPERIENCE" },
  { path: "/contact", component: Contact, label: "CONTACT" },
];

// Loading fallback
const Loading: React.FC = () => {
  const { isDarkMode } = useTheme();
  const theme = getThemeClasses(isDarkMode);
  return (
    <div className={`h-full flex items-center justify-center ${theme.background} ${theme.text}`}>
      <span className="animate-pulse">Loading...</span>
    </div>
  );
};

// Theme Picker Popover
const ThemePicker: React.FC = () => {
  const { paletteId, setPaletteId, fontPairingId, setFontPairingId } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handler);
    }
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handler);
    }
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 text-sm font-medium border-2 border-theme-border hover-invert flex items-center gap-1.5"
        aria-label="Theme picker"
      >
        <span
          className="inline-block w-3 h-3 border border-theme-border"
          style={{ backgroundColor: "var(--accent1)" }}
        />
        THEME
      </button>

      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 z-50 border-2 border-theme-border bg-theme-bg text-theme-text p-4 min-w-[320px]"
          style={{ boxShadow: "4px 4px 0px var(--border)" }}
        >
          {/* Palette Section */}
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-wide mb-2 opacity-70">
              Color Palette
            </p>
            <div className="grid grid-cols-4 gap-2">
              {palettes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPaletteId(p.id as PaletteId)}
                  className={`flex flex-col items-center gap-1 p-2 border-2 transition-colors ${
                    paletteId === p.id
                      ? "border-accent"
                      : "border-theme-border hover:border-accent"
                  }`}
                  title={p.name}
                >
                  <div className="flex gap-0.5">
                    <span
                      className="block w-4 h-4 border border-theme-border"
                      style={{ backgroundColor: p.swatches[0] }}
                    />
                    <span
                      className="block w-4 h-4 border border-theme-border"
                      style={{ backgroundColor: p.swatches[1] }}
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wide leading-tight text-center">
                    {p.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Font Section */}
          <div>
            <p className="text-xs font-bold uppercase tracking-wide mb-2 opacity-70">
              Font Pairing
            </p>
            <div className="grid grid-cols-3 gap-2">
              {fontPairings.map((fp) => (
                <button
                  key={fp.id}
                  onClick={() => setFontPairingId(fp.id as FontPairingId)}
                  className={`p-2 border-2 text-left transition-colors ${
                    fontPairingId === fp.id
                      ? "border-accent"
                      : "border-theme-border hover:border-accent"
                  }`}
                  title={fp.name}
                >
                  <span
                    className="block text-xs font-bold truncate"
                    style={{ fontFamily: `${fp.heading}, monospace` }}
                  >
                    Aa
                  </span>
                  <span className="text-[10px] opacity-70 truncate block">
                    {fp.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const AppContent: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const theme = getThemeClasses(isDarkMode);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`${theme.background} ${theme.text} h-screen flex flex-col overflow-hidden`}>
      {/* Dynamic background color */}
      <style>{`
        html, body, #root {
          background-color: var(--bg);
        }
      `}</style>

      {/* Navigation */}
      <nav
        className={`shrink-0 p-4 ${theme.background} border-b-2 ${theme.border}`}
      >
        <div className="max-w-5xl mx-auto flex flex-wrap justify-between items-center gap-2">
          {/* Route Links */}
          <div className="flex flex-wrap gap-2">
            {routes.map((route) => {
              const isActive = location.pathname === route.path;
              return (
                <button
                  key={route.path}
                  onClick={() => navigate(route.path)}
                  className={`px-3 py-1.5 text-sm font-medium border-2 hover-invert
                    ${isActive
                      ? "border-accent text-accent"
                      : `${theme.border}`
                    }`}
                >
                  {route.label}
                </button>
              );
            })}
          </div>

          {/* Right side - CV, Theme Picker & Dark Mode Toggle */}
          <div className="flex gap-2">
            {/* CV Download */}
            <a
              href={cvDownloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-3 py-1.5 text-sm font-medium border-2 ${theme.border} hover-invert`}
            >
              CV
            </a>

            {/* Theme Picker - dev only, hidden in production builds */}
            {process.env.NODE_ENV === "development" && <ThemePicker />}

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`px-3 py-1.5 text-sm font-medium border-2 ${theme.border} hover-invert`}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? "LIGHT" : "DARK"}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Suspense fallback={<Loading />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={<route.component />}
              />
            ))}
          </Routes>
        </Suspense>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <ThemeProvider>
    <Router>
      <AppContent />
    </Router>
  </ThemeProvider>
);

export default App;
