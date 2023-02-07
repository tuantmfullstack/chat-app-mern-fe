import axios from 'axios';

const instance = axios.create({
  // baseURL: 'https://chat-app-mern-jd3z.onrender.com/api/v1/',
  baseURL: 'http://localhost:3000/api/v1/',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use((config) => {
  if (config.data.data) {
    config.data = config.data.data;
  }
  return config;
});

export default instance;
