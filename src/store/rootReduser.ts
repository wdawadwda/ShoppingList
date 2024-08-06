import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./user";
import { themeSlice } from "./theme";
import { listsProductsSlice } from "./lists-products";
import { customProductsSlice } from "./custom-products";
import { languageSlice } from "./lang/language.slice";

export const rootReducer = combineReducers({
  [themeSlice.name]: themeSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [listsProductsSlice.name]: listsProductsSlice.reducer,
  [customProductsSlice.name]: customProductsSlice.reducer,
  [languageSlice.name]: languageSlice.reducer,
});
