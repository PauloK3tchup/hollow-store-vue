import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || 'https://hollowstore-backend.onrender.com/api/'

const http = axios.create({
  baseURL,
  timeout: 10000, // 10s
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error),
)

http.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  },
)

export default http
