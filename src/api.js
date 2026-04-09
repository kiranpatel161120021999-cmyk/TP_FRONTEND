// Central API base URL — driven by environment variable
// For local dev:       VITE_API_BASE_URL=
// For production:      set VITE_API_BASE_URL in Vercel dashboard / .env.production
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export default API_BASE;
