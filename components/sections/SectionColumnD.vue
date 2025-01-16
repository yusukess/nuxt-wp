<template>
  <section :class="$style.wrapper">
    <slot name="image" />
    <ColumnText>
      <template #title v-if="$slots.title"><slot name="title" /></template>
      <template #subtitle v-if="$slots.subtitle"><slot name="subtitle" /></template>
      <template #content v-if="$slots.content"><slot name="content" /></template>
    </ColumnText>
  </section>
</template>

<script setup></script>

<style lang="scss" module>
.wrapper {
  display: flex;
  gap: 16px;
  width: 100%;

  @include cq.sm {
    flex-direction: column;
    align-items: center;
  }
}
</style>
