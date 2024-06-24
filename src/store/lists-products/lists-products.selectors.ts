import { type RootState } from "../store.types";

export const selectProductsStatus = (state: RootState) => state["lists-products"].status;

export const selectProductsData = (state: RootState) => state["lists-products"].data;

export const selectProductsError = (state: RootState) => state["lists-products"].error;

export const selectProductListById = (state: RootState, listId: string | undefined) => {
  const data = state["lists-products"].data;
  if (!data) return null;

  const ownerList = data.owner.find((list) => String(list.id) === listId);
  if (ownerList) return ownerList;

  const sharedList = data.shared.find((list) => String(list.id) === listId);
  return sharedList || null;
};
