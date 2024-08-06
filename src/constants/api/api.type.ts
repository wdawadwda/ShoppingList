import { UserTheme } from "@/store";
import { Language } from "../products-lists";

export interface User {
  username: string;
  id: number;
  email: string;
  is_staff: boolean;
  user_theme: UserTheme;
}

export type ErrorDetail = {
  detail: string | { ru: string; en: string };
};

export interface ErrorObject {
  statusErr: string | number;
  detail: string | { [key in Language]: string };
  message: string;
}

export interface JWTTokens {
  access: string;
  refresh: string;
}

export interface Access {
  access: string;
}

export type UserRequest = {
  email: string;
  username: string;
  password: string;
};

export type UserError = {
  detail: {
    [key: string]: {
      email: string;
      username: string;
      password: string;
    };
  };
};

export type MessageType = {
  type: Exclude<Status, "loading">;
  text: string | null;
};

export type Status = "idle" | "loading" | "success" | "error";

export interface Product {
  barcode: string;
  product_name: string;
  unit: string;
  price: string;
  amount?: string;
  cost?: string;
}

export interface BillResponse {
  message: string;
  AI: boolean;
  goods: Product[];
  text_OCR: string;
}
