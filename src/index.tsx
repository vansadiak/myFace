import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import Tailwind CSS
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App message="Hello, TypeScript with React and Tailwind CSS!" />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
