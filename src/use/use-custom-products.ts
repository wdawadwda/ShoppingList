import { type User } from "@/constants";
import { fetchCustompProducts } from "@/store/api";
import { type AppDispatch } from "@/store/store.types";
import { useEffect } from "react";

export const useCustomProducts = (dispatch: AppDispatch, user: User | null) => {
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchCustompProducts(user.id));
    }
  }, [user]);
};
