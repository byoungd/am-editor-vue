<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'Am-Editor Vue Example',
  meta: [{ name: 'description', content: 'Vue Example of am-editor' }],
})
</script>

<template>
  <router-view />
</template>
