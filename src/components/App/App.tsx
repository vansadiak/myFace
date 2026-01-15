import React, { useEffect, lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useDarkMode from "../../hooks/useDarkMode";
import { getThemeClasses } from "../../utils/theme-utils";

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
  const [isDarkMode] = useDarkMode();
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
            flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 
            ${themeClasses.background} ${
            isDarkMode ? "shadow-gray-900/20" : "backdrop-blur-sm"
          }`}
        >
          {routes.map((route) => (
            <button
              key={route.path}
              onClick={() => navigate(route.path)}
              className={`px-2 md:px-4 py-1.5 md:py-2 transition-all duration-300 font-medium text-sm md:text-base 
                border-b-2 
                ${
                  location.pathname === route.path
                    ? `${themeClasses.primary} ${themeClasses.primaryBorder}`
                    : `${isDarkMode ? "text-gray-300" : "text-gray-600"} 
                       ${themeClasses.primaryHover}
                       border-transparent`
                }`}
            >
              {route.label}
            </button>
          ))}
        </nav>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.path === "/" ? (
                    <Home hasTyped={hasTyped} setHasTyped={setHasTyped} />
                  ) : (
                    <route.component />
                  )
                }
              />
            ))}
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
