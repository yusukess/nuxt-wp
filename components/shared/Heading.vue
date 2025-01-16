<template>
  <component :is="tag" :class="[$style.heading, $style[`heading${size}`], className]" v-bind:data-align="align">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  tag: {
    type: String,
    default: 'h1',
  },
  size: {
    type: String,
    default: '1',
  },
  className: {
    type: String,
    default: '',
  },
  align: {
    type: String,
    default: null,
  },
});
</script>

<style lang="scss" module>
.heading {
  &[data-align='center'] {
    text-align: center;

    @include cq.sm {
      text-align: left;
    }
  }
}

.heading1 {
  margin-bottom: 0;
  color: vars.$white;

  @include typo.heading1;
}

.heading2 {
  width: 100%;
  padding-bottom: 8px;
  color: vars.$secondary;
  text-align: center;

  @include typo.heading2;

  border-bottom: 1px solid vars.$secondary;

  @include cq.sm {
    padding-bottom: 0;
  }
}

.heading3 {
  @include typo.heading3;
}

.heading4 {
  @include typo.heading4;
}

.heading5 {
  @include typo.heading5;
}

.heading6 {
  @include typo.heading6;
}
</style>
