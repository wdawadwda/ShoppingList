import { type ErrorObject, type ProductsListData, type Status } from "@/constants";

export interface UserSlice {
  status: Status;
  data: ProductsListsDataApi | null;
  error: ErrorObject | null;
}

export type ProductsListsDataApi = {
  owner: ProductsListData[];
  shared: ProductsListData[];
};
