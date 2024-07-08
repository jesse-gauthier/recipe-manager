<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li>
        <router-link class="btn btn-outline btn-sm" to="/">Home</router-link>
      </li>
      <li>
        <router-link class="btn btn-outline btn-sm" to="/">{{ props.pageLink }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  pageLink: String
})
</script>
