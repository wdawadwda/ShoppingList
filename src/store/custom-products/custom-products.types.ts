import { type ErrorObject, type ProductInList, type Status } from "@/constants";

export interface UserSlice {
  status: Status;
  products: ProductInList[] | [];
  errorFetchCustompProducts: ErrorObject | null;
}
