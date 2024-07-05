import { type RootState } from "../store.types";

export const selectСustomProducts = (state: RootState) => state["custom-products"].products || [];
