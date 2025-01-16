<template>
  <div :class="$style.image">
    <BasicImage
      :src="image"
      width="1200"
      height="420"
      loading="lazy"
      hide-placeholder
      :alt="alt + 'のイメージ画像' || '画像'"
    />
  </div>
</template>

<script setup>
defineProps({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    default: '',
    required: true,
  },
});
</script>

<style lang="scss" module>
.image {
  flex: 1;
}
</style>
