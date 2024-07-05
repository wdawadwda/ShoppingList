import { type ErrorDetail } from "@/constants";
import { type AxiosError } from "axios";

export function createErrorObject(error: AxiosError<ErrorDetail>) {
  const errorStatus = error.response?.status || "";
  const errorData = JSON.stringify(error.response?.data.detail) || "";
  const errorMassage = error.message || "";
  const errorLangData = error.response?.data?.details || "";
  return {
    statusErr: errorStatus,
    detail: errorData,
    message: errorMassage,
    errorLangData: errorLangData,
  };
}
