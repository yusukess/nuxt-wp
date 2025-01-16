export default () => {
  const setProperty = () => {
    const vw = (document.body.offsetWidth - 1) * 0.01;
    const vh = (window.innerHeight - 1) * 0.01;
    document.documentElement.style.setProperty('--vw', `${vw}px`);
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  window.addEventListener('resize', setProperty);
  setProperty();
};
