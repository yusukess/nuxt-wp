<template>
  <component
    :is="props.tag"
    :class="[$attrs.class, $attrs.staticClass, $style.wrapper]"
    v-bind="$attrs"
    :style="{ 'aspect-ratio': `${1 / props.ratio} / 1` }"
  >
    <span :class="$style.ratio" aria-hidden="true" :style="{ 'padding-top': `${props.ratio * 100}%` }" />
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'div',
  },
  ratio: {
    type: Number,
    default: 9 / 16,
  },
});

const emit = defineEmits();
</script>

<style lang="scss" module>
@mixin not-support-aspect-ratio {
  @supports not (aspect-ratio: 1 / 1) {
    @content;
  }
}

.wrapper {
  width: 100%;
  overflow: hidden;

  @include not-support-aspect-ratio {
    position: relative;
    -webkit-aspect-ratio: initial !important;
  }
}

.ratio {
  display: none;

  @include not-support-aspect-ratio {
    display: block;
  }
}

.ratio ~ * {
  @include not-support-aspect-ratio {
    position: absolute !important;
    inset: 0;
  }
}
</style>
