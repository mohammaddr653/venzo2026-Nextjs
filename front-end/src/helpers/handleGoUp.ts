export const handleGoUp = (behavior: ScrollBehavior) => {
  window.scroll({
    top: 0,
    behavior: behavior,
  });
};
