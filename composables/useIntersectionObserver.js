import { onMounted, onUnmounted, ref } from 'vue';

export const useIntersectionObserver = (callback, options) => {
  const intersectionObserver = ref(null);

  const observe = (target) => {
    if (intersectionObserver.value) {
      intersectionObserver.value.observe(target);
    }
  };

  onMounted(() => {
    intersectionObserver.value = new IntersectionObserver(callback, options);
  });

  onUnmounted(() => {
    if (intersectionObserver.value) {
      intersectionObserver.value.disconnect();
    }
  });

  return {
    intersectionObserver,
    observe,
  };
};

export const useIntersectionObserverOnce = (options) => {
  const intersected = ref(false);
  const { intersectionObserver, observe } = useIntersectionObserver((changes, observer) => {
    changes.forEach((change) => {
      if (!change.isIntersecting) {
        return;
      }
      intersected.value = true;
      observer.disconnect();
    });
  }, options);

  return {
    intersected,
    intersectionObserver,
    observe,
  };
};
