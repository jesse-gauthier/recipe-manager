<template>
  <div v-if="recipe" class="p-6 rounded-xl shadow-lg">
    <BreadCrumbs v-if="recipe" :pageLink="recipe.attributes.title" />
    <div class="flex justify-between">
      <h1 class="mb-5 text-2xl md:text-5xl font-bold">
        {{ recipe.attributes.title }}
      </h1>
      <SaveHeart class="self-center" />
    </div>
    <div class="flex gap-3">
      <img class="rounded-xl" :src="recipe.attributes.image" alt="" />
      <p class="mb-4 self-center p-3" v-html="recipe.attributes.summary"></p>
    </div>
    <div class="grid grid-cols-4 gap-10 py-5">
      <div class="col-span-2 outline px-5 py-2 min-w-[35dvw] bg-[#1f293705] rounded">
        <h3 class="text-2xl font-semibold mb-2">Ingredients</h3>
        <ul class="list-disc list-inside mb-4">
          <li v-for="(ingredient, index) in recipe.attributes.ingredients" :key="index">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <div class="col-span-2 outline px-3 py-2 min-w-[35dvw] bg-[#1f293705] rounded">
        <h3 class="text-2xl font-semibold mb-2">Instructions:</h3>
        <p class="prose" v-html="recipe.attributes.instructions"></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BreadCrumbs from '@/components/utilities/BreadCrumbs.vue'
import SaveHeart from '@/components/utilities/icons/SaveHeart.vue'

const route = useRoute()
const recipeId = route.params.recipeId
const recipe = ref(null)

const fetchRecipe = async () => {
  try {
    const response = await fetch(`http://82.180.173.122:1337/api/weeklyrecipes/${recipeId}`)
    const data = await response.json()
    recipe.value = data.data
    console.log(data)
  } catch (error) {
    console.error('Error fetching recipe:', error)
  }
}

onMounted(() => {
  fetchRecipe()
})
</script>

<style scoped></style>
