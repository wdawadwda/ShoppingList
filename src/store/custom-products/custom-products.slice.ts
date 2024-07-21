import { createSlice } from "@reduxjs/toolkit";
import { UserSlice } from "./custom-products.types";
import { createCustomProduct, fetchCustompProducts } from "../api";

const getInitialState = (): UserSlice => {
  return {
    status: "idle",
    products: [],
    errorFetchCustompProducts: null,
    createCustomProductStatus: "idle",
    createCustomProductError: null,
  };
};

export const customProductsSlice = createSlice({
  name: "custom-products",
  initialState: getInitialState(),
  reducers: {
    resetCreateCustomProduct: (state) => {
      state.createCustomProductStatus = "idle";
      state.createCustomProductError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustompProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCustompProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload;
      })
      .addCase(fetchCustompProducts.rejected, (state, action) => {
        state.status = "error";
        state.errorFetchCustompProducts = action.payload || null;
      })
      .addCase(createCustomProduct.pending, (state) => {
        state.createCustomProductStatus = "loading";
        state.createCustomProductError = null;
      })
      .addCase(createCustomProduct.fulfilled, (state) => {
        state.createCustomProductStatus = "success";
      })
      .addCase(createCustomProduct.rejected, (state, action) => {
        state.createCustomProductStatus = "error";
        state.createCustomProductError = action.payload || null;
      });
  },
});

export const { actions: customProductsActions } = customProductsSlice;
