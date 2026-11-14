import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import FetchApi from "../src/utils/fetch.js";
import App from "./App.jsx";
import queryclient from "./config/queryclient.js";

// --- Wake services in parallel so cold starts overlap ---

// 1. Wake RAG directly (biggest offender — Python boot takes 30-60s).
// no-cors: request still reaches Render and triggers the wake,
// browser just can't read the response. No console error.
if (!import.meta.env.DEV) {
  fetch("https://airline-support-rag.onrender.com/health", {
    method: "GET",
    mode: "no-cors",
    cache: "no-store",
  }).catch(() => {});
}

// 2. Wake backend (fast, but doing it in parallel costs nothing).
const wakeBackend = () => FetchApi("/health/gethealth", "GET").catch(() => {});
wakeBackend();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryclient}>
        <App />
      </QueryClientProvider>
    </Router>
  </StrictMode>,
);
