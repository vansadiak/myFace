import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Import Tailwind CSS
import reportWebVitals from "./reportWebVitals";
import App from "./components/App/App";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
