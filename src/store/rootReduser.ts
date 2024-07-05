import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./user";
import { themeSlice } from "./theme";
import { listsProductsSlice } from "./lists-products";

export const rootReducer = combineReducers({
  [themeSlice.name]: themeSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [listsProductsSlice.name]: listsProductsSlice.reducer,
});
