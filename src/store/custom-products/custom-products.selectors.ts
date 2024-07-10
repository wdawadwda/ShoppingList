import { type RootState } from "../store.types";

export const selectСustomProducts = (state: RootState) => state["custom-products"].products || [];

export const selectСustomProductError = (state: RootState) => state["custom-products"].createCustomProductError || null;
export const selectСustomProductStatus = (state: RootState) => state["custom-products"].createCustomProductStatus;
