import { createRouter, createWebHistory } from 'vue-router'
import UserLoginView from '../views/UserLoginView.vue'
import UserAuthedView from '../views/UserAuthedView.vue'
import { useAuthStore } from '../stores/userAuth.js'
import { createPinia } from 'pinia'
import RecipePageView from '@/views/RecipePageView.vue'

// Initialize Pinia
const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: UserAuthedView
    },
    {
      path: '/login',
      name: 'Login',
      component: UserLoginView
    },
    {
      path: '/recipe/:recipeId',
      name: 'Recipe',
      component: RecipePageView,
      props: true
    }
  ]
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore(pinia)
  authStore.checkAuth() // Check authentication status

  if (authStore.isUserAuthed) {
    if (authStore.user) {
      console.log(authStore.user)
    }

    // User is authenticated, allow access to any page
    if (to.name === 'Login') {
      // Redirect to the login page
      next({ name: 'HomePage' })
    }
    next()
  } else {
    // User is not authenticated
    if (to.name === 'Login') {
      // If the target route is login, allow access
      next()
    } else {
      // Redirect to the login page
      next({ name: 'Login' })
    }
  }
})

export default router
