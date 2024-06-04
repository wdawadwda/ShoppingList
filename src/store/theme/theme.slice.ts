import { createSlice } from "@reduxjs/toolkit";
import { type ThemeState } from "./theme.type";

const initialState: ThemeState = {
  theme: null,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
  extraReducers: () => {},
});

export const { actions: themeActions } = themeSlice;
