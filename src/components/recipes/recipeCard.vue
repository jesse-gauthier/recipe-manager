<template>
  <router-link
    v-if="recipe.attributes.image"
    :to="{ name: 'Recipe', params: { recipeId: recipe.id } }"
  >
    <div class="relative group">
      <img
        class="rounded-xl object-cover shadow-lg transition duration-300 ease-in-out filter group-hover:brightness-75 group-focus:brightness-75"
        :src="recipe.attributes.image"
        :alt="recipe.attributes.title"
        tabindex="0"
      />
      <div
        class="absolute bottom-24 w-[100%] capitalize transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-focus:opacity-100"
      >
        <p class="text-center block text-2xl text-white">{{ recipe.attributes.title }}</p>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  recipe: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.group:hover .group-hover\:opacity-100,
.group:focus .group-focus\:opacity-100 {
  opacity: 1;
}
.group:hover .group-hover\:brightness-75,
.group:focus .group-focus\:brightness-75 {
  filter: brightness(75%);
}
</style>
