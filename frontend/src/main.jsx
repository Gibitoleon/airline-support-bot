import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import App from "./App.jsx";
import queryclient from "./config/queryclient.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <QueryClientProvider client={queryclient}>
        <App />
      </QueryClientProvider>
    </Router>
  </StrictMode>,
);
