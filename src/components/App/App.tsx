import React, { useEffect, lazy, Suspense, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSun, FaMoon, FaFileAlt } from "react-icons/fa";
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
  component: React.ComponentType<any>;
  label: string;
}

const routes: RouteConfig[] = [
  { path: "/", component: Home, label: "Home" },
  { path: "/experience", component: Projects, label: "Experience" },
  { path: "/contact", component: Contact, label: "Contact" },
];

const AppContent: React.FC = () => {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const themeClasses = getThemeClasses(isDarkMode);
  const location = useLocation();
  const navigate = useNavigate();
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 30;
    let isNavigating = false;

    const handleScroll = (e: WheelEvent) => {
      if (isNavigating) return;

      const currentPath = location.pathname;

      // Only handle scroll for home and contact pages
      if (
        currentPath !== "/" &&
        currentPath !== "/contact" &&
        currentPath !== "/experience"
      )
        return;

      const element = e.target as Element;
      const scrollableParent =
        element.closest(".overflow-y-auto") || document.documentElement;

      const isAtTop = scrollableParent.scrollTop === 0;
      const isAtBottom =
        Math.abs(
          scrollableParent.scrollHeight -
            scrollableParent.scrollTop -
            scrollableParent.clientHeight
        ) < 1;

      if (Math.abs(e.deltaY) > SCROLL_THRESHOLD) {
        // Home page - only allow scrolling down to Experience
        if (currentPath === "/" && e.deltaY > 0 && isAtBottom) {
          e.preventDefault();
          isNavigating = true;
          setTimeout(() => {
            navigate("/experience");
            isNavigating = false;
          }, 200);
        }
        // Contact page - only allow scrolling up to Experience
        else if (currentPath === "/contact" && e.deltaY < 0 && isAtTop) {
          e.preventDefault();
          isNavigating = true;
          setTimeout(() => {
            navigate("/experience");
            isNavigating = false;
          }, 200);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });
    return () => window.removeEventListener("wheel", handleScroll);
  }, [navigate, location.pathname]);

  return (
    <div>
      <style>{`
        html, body {
          background-color: ${isDarkMode ? "#111827" : "#F9FAFB"};
        }
      `}</style>
      <div className={`${themeClasses.background} ${themeClasses.text}`}>
        <nav
          className={`fixed top-0 left-0 right-0 p-2 md:p-4 z-50 transition-all duration-300 
            flex flex-wrap justify-between items-center gap-2 md:gap-4 
            ${themeClasses.background} ${
            isDarkMode ? "shadow-gray-900/20" : "backdrop-blur-sm"
          }`}
        >
          <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 flex-1 min-w-0">
            {routes.map((route) => (
              <motion.button
                key={route.path}
                onClick={() => navigate(route.path)}
                className={`px-2 md:px-4 py-1.5 md:py-2 font-medium text-sm md:text-base 
                  border-b-2 relative overflow-hidden
                  ${
                    location.pathname === route.path
                      ? `${themeClasses.primary} ${themeClasses.primaryBorder}`
                      : `${isDarkMode ? "text-gray-300" : "text-gray-600"} 
                         ${themeClasses.primaryHover}
                         border-transparent`
                  }`}
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 17,
                }}
              >
                {route.label}
              </motion.button>
            ))}
          </div>

          {/* Right side buttons - CV and Theme Toggle */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* CV Download Button */}
            <motion.a
              href={cvDownloadLink}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2.5 md:p-3 rounded-full 
                ${isDarkMode ? "bg-gray-800" : "bg-gray-200"} 
                ${themeClasses.primary} 
                ${themeClasses.primaryHover}
                shadow-lg backdrop-blur-sm
                border ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
              whileHover={{
                scale: 1.1,
                rotate: [0, -5, 5, -5, 0],
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              aria-label="Download CV/Resume"
            >
              <FaFileAlt className="h-4 w-4 md:h-5 md:w-5" />
            </motion.a>

            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleDarkMode}
              className={`p-2.5 md:p-3 rounded-full 
                ${isDarkMode ? "bg-gray-800" : "bg-gray-200"} 
                ${themeClasses.primary} 
                ${themeClasses.primaryHover}
                shadow-lg backdrop-blur-sm
                border ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
              whileHover={{
                scale: 1.1,
                rotate: 180,
              }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              <AnimatePresence mode="wait">
                {isDarkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ opacity: 0, rotate: -180, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 180, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaSun className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ opacity: 0, rotate: -180, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 180, scale: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaMoon className="h-4 w-4 md:h-5 md:w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
        <AnimatePresence mode="wait">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route) => (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <motion.div
                      key={location.pathname}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {route.path === "/" ? (
                        <Home hasTyped={hasTyped} setHasTyped={setHasTyped} />
                      ) : (
                        <route.component />
                      )}
                    </motion.div>
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </AnimatePresence>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
};

export default App;
