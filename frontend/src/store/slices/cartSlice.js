import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  try {
    const persistedCart = localStorage.getItem('cartItems');
    return persistedCart ? JSON.parse(persistedCart) : [];
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return [];
  }
};

const saveState = (state) => {
  localStorage.setItem('cartItems', JSON.stringify(state));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: getInitialState() },
  reducers: {
    addToCart: (state, action) => {
      const { id, title, price, image, discont_price, quantity } = action.payload;

      const currentPrice = (discont_price != null) ? Number(discont_price) : Number(price) || 0;

      const existingItem = state.items.find(item => item.id === id);

      if (existingItem) {
        existingItem.count = Number(existingItem.count) + Number(quantity || 1);
      } else {
        state.items.push({
          id,
          title,
          price: currentPrice,
          originalPrice: Number(price) || 0,
          image,
          count: Number(quantity) || 1,
        });
      }

      saveState(state.items);
    },

    increaseCount: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) item.count = Number(item.count) + 1;
      saveState(state.items);
    },

    decreaseCount: (state, action) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item && item.count > 1) item.count = Number(item.count) - 1;
      saveState(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
      saveState(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveState(state.items);
    },
  },
});

export const { addToCart, increaseCount, decreaseCount, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
