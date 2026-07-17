import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

import "react-toastify/dist/ReactToastify.css";
import "./styles/theme.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
 // <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
        <AuthProvider>
          <App />
          <ToastContainer
            position="top-left"
            autoClose={3000}
            rtl
          />
        </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
 // </React.StrictMode>
);