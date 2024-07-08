<script setup>
import { RouterView } from 'vue-router'
import AuthedHeader from './components/Headers/AuthedHeader.vue'
import { useAuthStore } from '@/stores/userAuth.js'

const authStore = useAuthStore()
</script>

<template>
  <div class="bg-green-50">
    <div class="flex justify-between h-screen">
      <AuthedHeader
        v-if="authStore.isUserAuthed == true"
        class="shrink min-w-[20dvw] shadow-lg rounded-3xl border"
      />
      <RouterView class="overflow-auto grow" />
    </div>
  </div>
</template>
