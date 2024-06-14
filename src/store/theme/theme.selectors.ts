import { type RootState } from "../store.types";

export const selectTheme = (state: RootState) => state.theme.theme;
export const selectThemeAuto = (state: RootState) => state.theme.auto;
