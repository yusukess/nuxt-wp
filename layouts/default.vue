<template>
  <div :class="$style.layout" :data-mode="mode">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup>
const route = useRoute();

const mode = computed(() => {
  if (route.path === '/') {
    return 'home';
  }
  return 'single';
});
</script>

<style lang="scss" module>
.layout {
  position: relative;
  z-index: 1;
  container-type: inline-size;
}
</style>
