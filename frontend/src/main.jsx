import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import FetchApi from "../src/utils/fetch.js";
import App from "./App.jsx";
import queryclient from "./config/queryclient.js";

// waking up the services for render-basis
const wakeBackend = () => FetchApi("/health/gethealth", "GET").catch(() => {});
wakeBackend(); // fire-and-forget, no await

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryclient}>
        <App />
      </QueryClientProvider>
    </Router>
  </StrictMode>,
);
