<template>
  <div :class="[$style.wrapper, className]">
    <div :class="$style.heading">
      <Heading tag="h3" size="3" :align="align" v-if="$slots.title">
        <slot name="title" />
      </Heading>
      <Heading tag="h4" size="4" :align="align" v-if="$slots.subtitle">
        <slot name="subtitle" />
      </Heading>
    </div>
    <div :class="$style.content">
      <slot name="content" />
    </div>
  </div>
</template>
<script setup>
defineProps({
  align: {
    type: String,
    default: null,
  },
  className: {
    type: String,
  },
});
</script>
<style lang="scss" module>
.wrapper {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.heading {
  /* ! */
}
</style>
