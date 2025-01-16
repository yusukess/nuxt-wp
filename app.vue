<template>
  <NuxtLayout>
    <transition name="fade" mode="out-in">
      <NuxtPage />
    </transition>
  </NuxtLayout>
</template>

<script setup>
const route = useRoute();
</script>
