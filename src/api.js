import axios from 'axios';

// Base URL is read from Vite env var. If not provided, fall back to localhost for dev.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
