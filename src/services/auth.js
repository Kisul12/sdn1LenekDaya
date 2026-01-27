import api from './api'

const TOKEN_KEY = 'auth_token'
const USER_KEY = 'auth_user'

export default {
    async login(username, password) {
        try {
            const response = await api.post('/auth/login', { username, password })
            if (response.data.token) {
                localStorage.setItem(TOKEN_KEY, response.data.token)
                localStorage.setItem(USER_KEY, JSON.stringify(response.data.user || { username }))
                return response.data
            }
        } catch (error) {
            throw error
        }
    },

    logout() {
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
    },

    getToken() {
        return localStorage.getItem(TOKEN_KEY)
    },

    getUser() {
        const user = localStorage.getItem(USER_KEY)
        return user ? JSON.parse(user) : null
    },

    isAuthenticated() {
        return !!this.getToken()
    }
}
