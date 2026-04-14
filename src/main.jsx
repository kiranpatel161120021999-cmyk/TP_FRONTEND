import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import App from "./App";

// ─── Global API Base URL ───────────────────────────────────────────────────────
// Set VITE_API_BASE_URL in .env (local) or in Vercel dashboard (production).
// Every axios call in the app will automatically use this base URL.
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL || "";

// ─── Google Auth Configuration ────────────────────────────────────────────────
// IMPORTANT: Add your Vercel URL to "Authorized JavaScript origins" in Google Console
// Console: https://console.cloud.google.com/apis/credentials
const GOOGLE_CLIENT_ID = "745427042826-5458kcp93m7s7ad90v8rkl2gtuj5sslk.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
