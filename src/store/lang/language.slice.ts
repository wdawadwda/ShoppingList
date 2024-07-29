import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import i18n from "@/i118/i18n";

interface LanguageState {
  currentLanguage: string;
}

const initialState: LanguageState = {
  currentLanguage: i18n.language,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.currentLanguage = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { actions: langActions } = languageSlice;
