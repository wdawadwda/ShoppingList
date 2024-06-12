import { type JWTTokens, type User } from "@/constants";

export interface UserSlice {
  currentUser:
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: User }
    | { status: "error"; error: string };
  tokens:
    | { status: "idle" }
    | { status: "loading" }
    | { status: "success"; data: JWTTokens }
    | { status: "error"; error: string };
  error: ErrorObject | null;
}
export interface ErrorObject {
  statusErr: string | number;
  detail: string;
  message: string;
}
