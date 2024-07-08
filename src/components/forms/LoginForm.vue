<template>
  <div class="flex flex-col justify-center gap-4 items-center">
    <div class="flex justify-center gap-4 items-center">
      <button type="button" class="btn btn-primary" @click="makeLoginVisable">Login</button>
      <button type="button" class="btn btn-primary" @click="makeRegisterVisable">Register</button>
    </div>
    <div v-if="isLoginVisable">
      <form @submit.prevent="loginUser" class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <div class="mb-4">
          <label for="loginUserName" class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            v-model="loginForm.userName"
            type="text"
            placeholder="email"
            name="userName"
            id="loginUserName"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="loginPassword" class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="Password"
            name="password"
            id="loginPassword"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
    </div>
    <div v-if="isRegisterVisable">
      <form
        @submit.prevent="registerUser"
        class="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg"
      >
        <div class="mb-4">
          <label for="registerUserName" class="block text-gray-700 text-sm font-bold mb-2"
            >User Name</label
          >
          <input
            v-model="registerForm.userName"
            type="text"
            placeholder="User Name"
            name="userName"
            id="registerUserName"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="registerPassword" class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            v-model="registerForm.password"
            type="password"
            placeholder="Password"
            name="password"
            id="registerPassword"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/userAuth.js'

const authStore = useAuthStore()

const isLoginVisable = ref(false)
const isRegisterVisable = ref(false)

const loginForm = ref({
  userName: '',
  password: ''
})

const registerForm = ref({
  userName: '',
  password: ''
})

const makeLoginVisable = () => {
  if (isRegisterVisable.value === true) {
    isRegisterVisable.value = false
  }

  isLoginVisable.value = !isLoginVisable.value
}

const makeRegisterVisable = () => {
  if (isLoginVisable.value === true) {
    isLoginVisable.value = false
  }
  isRegisterVisable.value = !isRegisterVisable.value
}

const loginUser = async () => {
  try {
    await authStore.login({
      username: loginForm.value.userName,
      password: loginForm.value.password
    })
    // Optionally, you can clear the form after successful login
    loginForm.value.userName = ''
    loginForm.value.password = ''
  } catch (error) {
    console.error('Error logging in user:', error)
    // Optionally, handle error appropriately, e.g., show a notification to the user
  }
}

const registerUser = async () => {
  try {
    await authStore.register({
      username: registerForm.value.userName,
      email: registerForm.value.userName, // Assuming email is the same as username for simplicity
      password: registerForm.value.password
    })
    // Optionally, you can clear the form after successful registration
    registerForm.value.userName = ''
    registerForm.value.password = ''
  } catch (error) {
    console.error('Error registering user:', error)
    // Optionally, handle error appropriately, e.g., show a notification to the user
  }
}
</script>
