import { createSlice } from "@reduxjs/toolkit";
import { UserSlice } from "./custom-products.types";
import { fetchCustompProducts } from "../api";

const getInitialState = (): UserSlice => {
  return {
    status: "idle",
    products: [],
    errorFetchCustompProducts: null,
  };
};

export const customProductsSlice = createSlice({
  name: "custom-products",
  initialState: getInitialState(),
  reducers: {},
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
      });
  },
});
export const { actions: customProductsActions } = customProductsSlice;
