<template>
  <div class="flex flex-col justify-center text-center align-middle h-screen gap-5">
    <div class="mb-5 flex flex-col gap-5">
      <h2 class="text-4xl">Welcome To Recipe Manager</h2>
      <p class="text-xl">Please login or register below</p>
    </div>
    <LoginForm />
  </div>
</template>

<script setup>
import LoginForm from '@/components/forms/LoginForm.vue'
</script>
