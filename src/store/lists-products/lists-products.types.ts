import { ProductsListData, Status } from "@/constants";

export interface UserSlice {
  status: Status;
  data: ProductsListsDataApi | null;
  error: ErrorObject | null;
}
export interface ErrorObject {
  statusErr: string | number;
  detail: string;
  message: string;
}

export type ProductsListsDataApi = {
  owner: ProductsListData[];
  shared: ProductsListData[];
};
