<template>
  <component
    :is="isLink ? NuxtLink : 'button'"
    :to="isLink ? props.to : null"
    :class="[$style.button, $style[`button-${props.variant}`]]"
    :type="isLink ? null : props.type"
    :disabled="!isLink && props.disabled"
    @click="!isLink && handleClick"
    :data-size="props.size"
  >
    <slot />
  </component>
</template>

<script setup>
import { NuxtLink } from '#components';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md', // sm, md, lg など
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: null,
  },
});

defineEmits(['click']);

const isLink = computed(() => !!props.to);

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event);
  }
};
</script>

<style lang="scss" module>
.button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 40px;
  color: vars.$white;
  border-radius: 32px;

  @include typo.button;

  &[data-size='lg'] {
    max-width: 440px;

    @include cq.sm {
      max-width: 330px;
    }
  }
}

.button-secondary {
  background-color: vars.$secondary;

  @include o.can-hover {
    transition: background-color 0.3s ease-in-out;

    &:hover {
      background-color: vars.$secondary-light;
    }
  }
}
</style>
