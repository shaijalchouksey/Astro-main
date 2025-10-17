import axios from 'axios';

// Step 1: Backend ka Address Set Karna
// Yeh line check karti hai ki kya app Vercel/Netlify par live hai.
// Agar live hai, to woh wahan diye gaye VITE_API_BASE_URL (environment variable) ko use karega.
// Agar app local computer par chal raha hai, to woh 'http://localhost:5000' ko use karega.
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Axios ka ek naya instance banayein jismein humara base URL set hai.
// Ab humein har request mein poora URL likhne ki zaroorat nahi.
const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Step 2: Automatic Token Bhejne ka Jaadu (Interceptor)
// Yeh function aapki app se bheji gayi har API request se *theek pehle* chalta hai.
api.interceptors.request.use(
  (config) => {
    // 1. localStorage se token ko sahi naam ('authToken') se dhoondho.
    const token = localStorage.getItem('authToken');
    
    // 2. Agar token mila...
    if (token) {
      // 3. ...to request ke headers mein 'Authorization' naam ka ek naya header jod do.
      // Backend isi header ko check karke user ki pehchaan karta hai.
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 4. Ab is nayi, updated request (token ke saath) ko aage bhej do.
    return config;
  },
  (error) => {
    // Agar request bhejne se pehle hi koi error aa jaaye, to use yahan handle karo.
    return Promise.reject(error);
  }
);

export default api;

