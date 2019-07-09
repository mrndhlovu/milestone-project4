export const checkObjectUpdate = (oldObject, propsUpdated) => {
  return {
    ...oldObject,
    ...propsUpdated
  };
};
