import axios from 'axios';

// Vercel se URL uthayega, agar nahi mila to development ke liye localhost use karega
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// YEH SABSE ZAROORI HISSA HAI (THE INTERCEPTOR)
// Yeh function har API request bhejne se *theek pehle* chalega.
api.interceptors.request.use(
  (config) => {
    // 1. localStorage se token ko nikalo
    const token = localStorage.getItem('token');
    
    // 2. Agar token maujood hai
    if (token) {
      // 3. To request ke headers mein 'Authorization' naam ka ek header jodo
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 4. Ab is nayi request (token ke saath) ko aage bhej do
    return config;
  },
  (error) => {
    // Agar koi error aaye to use handle karo
    return Promise.reject(error);
  }
);

export default api;
