import { type RootState } from "../store.types";

export const selectTheme = (state: RootState) => state.theme.theme;
