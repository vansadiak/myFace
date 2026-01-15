import React, { useEffect, lazy, Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useDarkMode from "../../hooks/useDarkMode";

// Lazy load components
const Home = lazy(() => import("../Home/Home"));
const Contact = lazy(() => import("../ContactMe/Contact"));

interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  label: string;
}

const routes: RouteConfig[] = [
  { path: "/", component: Home, label: "Home" },
  { path: "/contact", component: Contact, label: "Contact" },
];

const AppContent: React.FC = () => {
  const [isDarkMode] = useDarkMode();
  const location = useLocation();
  const navigate = useNavigate();
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const currentIndex = routes.findIndex(
        (route) => route.path === location.pathname
      );

      if (e.deltaY > 0 && currentIndex < routes.length - 1) {
        // Scrolling down
        setTimeout(() => {
          navigate(routes[currentIndex + 1].path);
        }, 200);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        // Scrolling up
        setTimeout(() => {
          navigate(routes[currentIndex - 1].path);
        }, 200);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [navigate, location.pathname]);

  return (
    <div>
      <style>{`
        html, body {
          background-color: ${
            isDarkMode ? "rgb(17 24 39)" : "rgb(243 244 246)"
          };
        }
      `}</style>
      <div
        className={
          isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
        }
      >
        <nav className="fixed top-0 left-0 right-0 p-4 z-10 bg-opacity-90 backdrop-blur-sm">
          {routes.map((route, index) => (
            <button
              key={route.path}
              onClick={() => navigate(route.path)}
              className={`mr-4 px-4 py-2 transition-all duration-300 font-medium text-base ${
                location.pathname === route.path
                  ? isDarkMode
                    ? "text-[#4ECDC4] border-b-2 border-[#4ECDC4]"
                    : "text-[#FF6B6B] border-b-2 border-[#FF6B6B]"
                  : isDarkMode
                  ? "text-gray-300 hover:text-[#4ECDC4]"
                  : "text-gray-600 hover:text-[#FF6B6B]"
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
