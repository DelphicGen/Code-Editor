const debouncerIds = {};

export const debouncer = (func, delay, id) => {
  const debouncerId = id;
  clearTimeout(debouncerIds[debouncerId]);
  debouncerIds[debouncerId] = setTimeout(func, delay);
};
