export const BASE_URL = 'http://localhost:3333';

export const fetchProductByIdApi = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error('Failed to fetch product details.');
  return await res.json();
};

export const getImageUrl = (path) => `${BASE_URL}${path}`;
