export const BASE_URL = 'http://localhost:3333';

export const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http')) {
    return url;
  }
  return `${BASE_URL}${url}`;
};