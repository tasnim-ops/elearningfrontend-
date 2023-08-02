import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  withCredentials: false
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('CC_Token');
    console.log('Authorization Header:', config.headers.authorization); // Log the Authorization header
    if (token) {
      config.headers.authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
 