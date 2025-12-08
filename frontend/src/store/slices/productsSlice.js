import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { BASE_URL } from '../../utils/api'; 
import { applyFilters } from '../../utils/filterUtils';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/products/all`);
      if (!response.ok) throw new Error('Failed to fetch all products.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/products/${productId}`);
      if (!response.ok) throw new Error('Failed to fetch product details.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDiscountedProducts = createAsyncThunk(
  'products/fetchDiscountedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/products/sale`);
      if (!response.ok) throw new Error('Failed to fetch discounted products.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/categories/${id}`);
      if (!response.ok) throw new Error('Failed to fetch products for category.');
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  list: [],
  rawList: [],
  selectedProduct: null,
  status: 'idle',
  detailsStatus: 'idle',
  error: null,
  filters: {
    priceFrom: '',
    priceTo: '',
    discount: false,
    sortBy: 'default',
  },
  isDiscountPage: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductsFilter: (state, action) => {
      Object.assign(state.filters, action.payload);
    },
    clearRawList: (state) => {
      state.rawList = [];
      state.list = [];
      state.status = 'idle';
      state.isDiscountPage = false;
    }
  },
  extraReducers: (builder) => {
    const handlePending = (state) => {
      state.status = 'loading';
      state.error = null;
    };

    const handleFulfilled = (state, rawData, isDiscount) => {
      state.status = 'succeeded';
      state.isDiscountPage = isDiscount;
      state.rawList = rawData;
      state.list = applyFilters(rawData, state.filters);
    };

    builder
      .addCase(fetchAllProducts.pending, handlePending)
      .addCase(fetchAllProducts.fulfilled, (state, action) => handleFulfilled(state, action.payload, false))
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchDiscountedProducts.pending, handlePending)
      .addCase(fetchDiscountedProducts.fulfilled, (state, action) => handleFulfilled(state, action.payload, true))
      .addCase(fetchDiscountedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchProductsByCategory.pending, handlePending)
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        const products = action.payload.data || [];
        handleFulfilled(state, products, false);
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.detailsStatus = 'loading';
        state.selectedProduct = null;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailsStatus = 'succeeded';
        state.selectedProduct = action.payload[0] || null;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailsStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setProductsFilter, clearRawList } = productsSlice.actions;
export default productsSlice.reducer;