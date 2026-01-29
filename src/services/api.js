import axios from 'axios'

const api = axios.create({
    baseURL: 'https://sd-profile-backend.vercel.app/api/'
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api