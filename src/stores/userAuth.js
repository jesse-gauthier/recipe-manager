import { defineStore } from 'pinia'
import router from '@/router/index.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isUserAuthed: !!localStorage.getItem('authToken'),
    user: {
      info: JSON.parse(localStorage.getItem('userInfo')) || {},
      token: localStorage.getItem('authToken') || ''
    }
  }),
  actions: {
    async login(user) {
      try {
        const response = await fetch('http://82.180.173.122:1337/api/auth/local', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            identifier: user.username,
            password: user.password
          })
        })

        if (!response.ok) {
          throw new Error('Failed to login user')
        }

        const userData = await response.json()
        localStorage.setItem('authToken', userData.jwt)
        localStorage.setItem('userInfo', JSON.stringify(userData.user))
        this.setUser(userData)
        router.push({ name: 'HomePage' })
      } catch (error) {
        console.error('Error logging in user:', error)
      }
    },
    logout() {
      this.isUserAuthed = false
      this.user = {}
      localStorage.removeItem('authToken')
      localStorage.removeItem('userInfo')
      router.push({ name: 'Login' })
    },
    checkAuth() {
      this.isUserAuthed = !!localStorage.getItem('authToken')
      if (this.isUserAuthed) {
        this.user.token = localStorage.getItem('authToken')
        this.user.info = JSON.parse(localStorage.getItem('userInfo'))
      }
    },
    setUser(userData) {
      this.user.token = userData.jwt
      this.user.info = userData.user
      this.isUserAuthed = true
    },
    async register(user) {
      try {
        const response = await fetch('http://82.180.173.122:1337/api/auth/local/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: user.username,
            email: user.email,
            password: user.password
          })
        })

        if (!response.ok) {
          throw new Error('Failed to register user')
        }

        const userData = await response.json()
        localStorage.setItem('authToken', userData.jwt)
        localStorage.setItem('userInfo', JSON.stringify(userData.user))
        this.setUser(userData)
        this.isUserAuthed = true
        router.push({ name: 'HomePage' })
      } catch (error) {
        console.error('Error registering user:', error)
      }
    }
  }
})

export default useAuthStore
