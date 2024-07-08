<template>
  <div v-if="authStore.user.info.agreeToTerms" class="p-3">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      <RecipeCard class="col-span-1" v-for="recipe in recipes" :key="recipe.id" :recipe="recipe" />
    </div>
  </div>
  <div v-else class="container mx-auto p-4">
    <button
      @click="logout"
      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    >
      Logout
    </button>
    <UserInformationRequest />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/userAuth.js'
import RecipeCard from '@/components/recipes/recipeCard.vue'
import UserInformationRequest from '@/components/forms/UserInformationRequest.vue'

const recipes = ref([])
const authStore = useAuthStore()

const fetchRecipes = async () => {
  try {
    const response = await fetch(`http://82.180.173.122:1337/api/weeklyrecipes`)
    const data = await response.json()
    console.log(data)
    recipes.value = data.data
  } catch (error) {
    console.error('Error fetching recipes:', error)
  }
}

onMounted(async () => {
  fetchRecipes()
})
</script>
