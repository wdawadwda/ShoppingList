import { combineReducers } from "@reduxjs/toolkit";
import { themeSlice } from "./theme/theme.slice";

export const rootReducer = combineReducers({
  [themeSlice.name]: themeSlice.reducer,
});
