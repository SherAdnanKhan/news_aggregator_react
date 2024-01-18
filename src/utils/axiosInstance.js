import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', 
  timeout: 5000,
});

// Interceptor to add the token to requests
axiosInstance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    // Handle the request error here
    return Promise.reject(error);
});

export default axiosInstance;
