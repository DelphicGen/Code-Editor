export const setToLocalStorage = (key, val) => {
  localStorage.setItem(key, JSON.stringify(val));
}

export const getFromLocalStorage = (key) => {
  let val = localStorage.getItem(key)
  if(val) return JSON.parse(val);
}