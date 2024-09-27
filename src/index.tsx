import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import Tailwind CSS
import reportWebVitals from "./reportWebVitals";
import App from "./components/App/App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
