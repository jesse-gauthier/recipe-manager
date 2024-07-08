<template>
  <div class="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-bold mb-4">Welcome to Recipe Saver</h2>
    <p class="mb-6">We need a bit more information to complete your registration</p>
    <form @submit.prevent="updateUserInfo">
      <div class="mb-4">
        <label for="firstName" class="block text-sm font-medium text-gray-700">First Name:</label>
        <input
          v-model="user.firstName"
          type="text"
          id="firstName"
          placeholder="First Name"
          class="input input-bordered w-full mt-1"
          aria-required="true"
        />
      </div>
      <div class="mb-4">
        <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name:</label>
        <input
          v-model="user.lastName"
          type="text"
          id="lastName"
          placeholder="Last Name"
          class="input input-bordered w-full mt-1"
          aria-required="true"
        />
      </div>
      <div class="mb-4">
        <label for="recruiter" class="inline-flex items-center">
          <input
            v-model="user.isRecruiter"
            type="checkbox"
            id="recruiter"
            name="recruiter"
            class="checkbox checkbox-primary"
          />
          <span class="ml-2">Are you a recruiter?</span>
        </label>
      </div>
      <div class="mb-4">
        <label for="terms" class="inline-flex items-center">
          <input
            v-model="user.agreeToTerms"
            type="checkbox"
            id="terms"
            name="terms"
            class="checkbox checkbox-primary"
            aria-required="true"
            required
          />
          <span class="ml-2">Do you agree to the terms of use?</span>
        </label>
      </div>
      <div>
        <button type="submit" class="btn btn-primary w-full">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/userAuth.js'

export default {
  setup() {
    const authStore = useAuthStore()

    const user = ref({
      firstName: '',
      lastName: '',
      isRecruiter: false,
      agreeToTerms: false
    })

    const updateUserInfo = async () => {
      try {
        console.log(authStore.user.token)
        const response = await fetch(
          `http://82.180.173.122:1337/api/users/${authStore.user.info.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authStore.user.token}`
            },
            body: JSON.stringify({
              firstName: user.value.firstName,
              lastName: user.value.lastName,
              isRecruiter: user.value.isRecruiter,
              agreeToTerms: user.value.agreeToTerms
            })
          }
        )

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`)
        }

        const data = await response.json()
        console.log('User information updated:', data)
        authStore.user.info.agreeToTerms = true
      } catch (error) {
        console.error('Error updating user information:', error)
      }
    }

    return {
      user,
      updateUserInfo
    }
  }
}
</script>
