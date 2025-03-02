// API configuration
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

// Other configuration constants can be added here
export const API_ENDPOINTS = {
  debug: `${API_BASE_URL}/debug`,
  analyze: `${API_BASE_URL}/analyze-complexity`,
  convert: `${API_BASE_URL}/convert`,
  allInOne: `${API_BASE_URL}/all-in-one`,
};
