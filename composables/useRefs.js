import { ref } from 'vue';

export const useRefs = () => {
  const refs = ref({});

  const setRef = (name, el) => {
    refs.value[name] = el;
  };

  return {
    refs,
    setRef,
  };
};
