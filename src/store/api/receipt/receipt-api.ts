import { Good } from "@/components/receipt/receipt.type";
import { BACKEND_URL, type BillResponse } from "@/constants";
import axios, { type AxiosResponse } from "axios";

export async function sendBillPhoto(formData: FormData): Promise<BillResponse> {
  try {
    const response: AxiosResponse<BillResponse> = await axios.post(`${BACKEND_URL}/api/v1/send-bill/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.message;
    } else {
      console.error("Error sending bill photo2:", error);
    }
    throw error;
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
    if (axios.isAxiosError(error)) {
      console.error("Error sending bill photo2:", error);
      throw error.message;
    } else {
      console.error("Error sending bill photo2:", error);
    }
    throw error;
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
    if (axios.isAxiosError(error)) {
      console.error("Error sending bill photo2:", error);
      throw error.message;
    } else {
      console.error("Error sending bill photo2:", error);
    }
    throw error;
  }
};

export const deleteBillHistoryItem = async (itemId: string | number) => {
  try {
    const url = `${BACKEND_URL}/api/v1/bill-history/${itemId}/`;
    const response = await fetch(url, {
      method: "DELETE",
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
    console.error("Error deleting bill history item:", error);
    throw error;
  }
};
