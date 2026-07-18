import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";


import "./styles/basic/reset.css";
import "./styles/basic/theme.css";
import "./styles/basic/typography.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
 // <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
 // </React.StrictMode>
);