<template>
  <div :class="$style.image">
    <BasicImage
      :src="image"
      width="270"
      height="168"
      loading="lazy"
      hide-placeholder
      :alt="alt + 'のイメージ画像' || '画像'"
      data-responsive="pc"
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
  max-width: 270px;

  @include cq.md {
    max-width: 100%;
  }
}
</style>
