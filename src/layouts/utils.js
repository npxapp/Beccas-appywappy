// utils/getDomain.js
export const getDomain = (href = document.baseURI || window.location.href) => {
  const url = new URL(href);
  return url.hostname;
};