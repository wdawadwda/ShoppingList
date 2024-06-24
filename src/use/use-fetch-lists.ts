import { type User } from "@/constants";
import { fetchProductsLists } from "@/store/api";
import { type AppDispatch } from "@/store/store.types";
import { useEffect } from "react";

export const useFetchLists = (dispatch: AppDispatch, user: User | null) => {
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchProductsLists(user.id));
    }
  }, [user]);
};
