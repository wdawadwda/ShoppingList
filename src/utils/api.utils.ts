import { type ErrorDetail } from "@/constants";
import { type AxiosError } from "axios";

export function createErrorObject(error: AxiosError<ErrorDetail>) {
  const errorStatus = error?.response?.status || "";
  const errorData = error?.response?.data?.detail || "";
  const errorMassage = error?.message || "";
  return {
    statusErr: errorStatus,
    detail: errorData,
    message: errorMassage,
  };
}
