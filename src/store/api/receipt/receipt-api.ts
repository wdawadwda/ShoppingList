import { Good } from "@/components/receipt/receipt.type";
import { BACKEND_URL, ErrorObject, type BillResponse } from "@/constants";
import { createErrorObject } from "@/utils";
import axios, { AxiosError, type AxiosResponse } from "axios";

export async function sendBillPhoto(formData: FormData): Promise<BillResponse> {
  try {
    const response: AxiosResponse<BillResponse> = await axios.post(`${BACKEND_URL}/api/v1/send-bill/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
}

export const acceptBillText = async (userId: string, goods: Good[]) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/accept-bill-text/`, {
      user: userId,
      bill_text: goods,
    });
    return response.data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
};

export const fetchHistory = async (from: string, to: string, userId: number) => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/bill-history/`, {
      params: {
        user: userId,
        date_from: from,
        date_to: to,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
};

export const deleteBillHistoryItem = async (itemId: string | number, userId: string | number) => {
  try {
    const url = `${BACKEND_URL}/api/v1/bill-history/${itemId}/`;

    const response = await axios.delete(url, {
      params: {
        user_id: userId,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      return true;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error) {
    const errorObject = createErrorObject(error as AxiosError<ErrorObject>);
    throw errorObject;
  }
};
