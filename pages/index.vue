<template>
  <div :class="$style.wrapper">
    <KeyVisual />
    <div :class="$style.inner">
      <NewsList />
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" module>
.wrapper {
  padding: 20px;
}
</style>
