import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ThemeProvider } from "../../contexts/ThemeContext";
import useDarkMode from "../../hooks/useDarkMode";
import { getThemeClasses } from "../../utils/theme-utils";
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
  const [isDarkMode] = useDarkMode();
  const theme = getThemeClasses(isDarkMode);
  return (
    <div className={`h-full flex items-center justify-center ${theme.background} ${theme.text}`}>
      <span className="animate-pulse">Loading...</span>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const theme = getThemeClasses(isDarkMode);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className={`${theme.background} ${theme.text} h-screen flex flex-col overflow-hidden`}>
      {/* Dynamic background color */}
      <style>{`
        html, body, #root {
          background-color: ${isDarkMode ? "#000000" : "#FFFFFF"};
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

          {/* Right side - CV & Theme Toggle */}
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

            {/* Theme Toggle */}
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
