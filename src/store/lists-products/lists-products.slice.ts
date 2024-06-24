import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type ErrorObject, type UserSlice } from "./lists-products.types";
import { fetchProductsLists } from "../api";
import { type ProductsListsDataApi } from "@/store/lists-products";

const getInitialState = (): UserSlice => {
  return {
    status: "idle",
    data: null,
    error: null,
  };
};

export const listsProductsSlice = createSlice({
  name: "lists-products",
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsLists.pending, (state) => {
        state.status = "loading";
        state.data = null;
        state.error = null;
      })
      .addCase(fetchProductsLists.fulfilled, (state, action: PayloadAction<ProductsListsDataApi>) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchProductsLists.rejected, (state, action) => {
        state.status = "error";
        state.data = null;
        state.error = action.payload as ErrorObject;
      });
  },
});

export const { actions: listsProductsActions } = listsProductsSlice;
