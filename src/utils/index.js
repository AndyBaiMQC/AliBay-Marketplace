export const setLocalStorage = (key, item) => {
  window.localStorage.setItem(key, item);
};

export const getLocalStorage = (key) => {
  return window.localStorage.getItem(key);
};

export const parserQuery = (string) => {
  // eslint-disable-next-line no-sequences
  return string.substr(1).split('&').map(item => item.split('=')).reduce((acc, cur) => (acc[cur[0]]=cur[1], acc), {})
};
