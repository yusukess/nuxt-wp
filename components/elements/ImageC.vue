<template>
  <div :class="$style.image">
    <BasicImage
      :src="image"
      width="373"
      height="232"
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
  },
});
</script>

<style lang="scss" module>
.image {
  flex: 1;
  max-width: 373px;

  @include cq.md {
    max-width: 100%;
  }
}
</style>
