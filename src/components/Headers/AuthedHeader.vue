<template>
  <header class="py-3 h-screen flex flex-col" role="banner">
    <h1 class="text-3xl text-center">
      <router-link to="/" aria-label="Recipe Finder Home">Recipe Finder</router-link>
    </h1>
    <div class="mt-5 flex flex-col justify-between grow">
      <nav aria-label="Main Navigation">
        <ul class="flex flex-col gap-2 px-3">
          <li>
            <router-link class="btn btn-outline w-[100%]" to="/" aria-current="page"
              >New Recipes</router-link
            >
          </li>
          <li>
            <router-link class="btn btn-outline w-[100%]" to="/" disabled aria-disabled="true"
              >Recipe Search</router-link
            >
          </li>
          <li>
            <router-link class="btn btn-outline w-[100%]" to="/" disabled aria-disabled="true"
              >Saved Recipes</router-link
            >
          </li>
          <li>
            <router-link class="btn btn-outline w-[100%]" to="/" disabled aria-disabled="true"
              >Meal Plans</router-link
            >
          </li>
        </ul>
      </nav>
      <button @click="logout" class="btn btn-outline w-fit mx-auto" aria-label="Logout">
        Logout
      </button>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/userAuth.js'

const authStore = useAuthStore()
const logout = () => {
  authStore.logout()
}
</script>
