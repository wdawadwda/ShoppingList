import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./user";
import { themeSlice } from "./theme";

export const rootReducer = combineReducers({
  [themeSlice.name]: themeSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});
