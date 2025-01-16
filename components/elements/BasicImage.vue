<template>
  <div :class="[$style.w, className]" :data-loaded="loaded || error" :data-pure-loaded="firstLoad ? false : null">
    <img
      ref="imgRef"
      v-bind="$attrs"
      :src="imageSrc"
      :class="$style.i"
      :onload="handlePureLoad"
      @load="emitLoad"
      @error="emitError"
    />
    <span :class="$style.t" aria-hidden="true" :style="altStyle">{{ alt }}</span>
  </div>
</template>

<script setup>
import { useIntersectionObserverOnce } from '~/composables/useIntersectionObserver';

const props = defineProps({
  placeholderText: {
    type: String,
    default: null,
  },
  hidePlaceholder: {
    type: Boolean,
    default: false,
  },
  firstLoad: {
    type: Boolean,
    default: false,
  },
  backgroundColor: {
    type: String,
    default: '#ccc',
  },
  color: {
    type: String,
    default: '#141517',
  },
  className: {
    type: String,
    default: '',
  },
});

const attrs = useAttrs();
const loaded = ref(false);
const error = ref(false);
const { intersected, observe } = useIntersectionObserverOnce();
const imgRef = ref(null);
const emit = defineEmits();

const imageSrc = computed(() => {
  if (props.firstLoad) {
    return attrs.src;
  }
  if (!intersected.value) {
    return null;
  }

  return attrs.src;
});

const handlePureLoad = computed(() => {
  if (props.firstLoad) {
    return `this.parentElement.setAttribute('data-pure-loaded', true)`;
  }
  return null;
});

const alt = computed(() => {
  if (props.hidePlaceholder) {
    return ' ';
  }
  return props.placeholderText || attrs.alt;
});

const altStyle = computed(() => {
  return {
    'background-color': props.backgroundColor,
    color: props.color,
  };
});

onMounted(() => {
  if (imgRef.value) {
    observe(imgRef.value);
  }
});

const emitLoad = () => {
  loaded.value = true;
  emit('load'); // 親コンポーネントにloadイベントを通知
};

const emitError = () => {
  error.value = true;
  emit('error'); // 親コンポーネントにerrorイベントを通知
};
</script>

<style lang="scss" module>
.w {
  position: relative;

  @include mq.responsive;
}

.t {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 10px;
  font-size: 10px;
  transition: 0.2s ease-out opacity;

  .w[data-pure-loaded='true'] &,
  .w[data-loaded='true'] & {
    opacity: 0;
  }
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
