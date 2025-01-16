<template>
  <div :class="$style.image">
    <BasicImage
      :src="image"
      width="580"
      height="360"
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
  max-width: 580px;

  @include cq.md {
    max-width: 100%;
  }
}
</style>
