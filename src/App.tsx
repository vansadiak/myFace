import React from "react";
import useDarkMode from "./hooks/useDarkMode";

interface AppProps {
  message: string;
}

const App: React.FC<AppProps> = ({ message }) => {
  const [isDarkMode] = useDarkMode();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="p-8 bg-blue-500 dark:bg-blue-700 text-white">
        <h1 className="text-4xl font-bold">{message}</h1>
      </header>
      <main></main>
    </div>
  );
};

export default App;
