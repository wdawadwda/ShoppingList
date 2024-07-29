import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type ErrorObject, type UserSlice } from "./user.types";
import { JWTTokens, User } from "@/constants";
import { createTokens, fetchUser } from "../api";

const getInitialState = (): UserSlice => {
  return {
    currentUser: { status: "idle" },
    tokens: { status: "idle" },
    error: null,
  };
};

export const userSlice = createSlice({
  name: "user",
  initialState: getInitialState(),
  reducers: {
    logout: (state) => {
      state.currentUser = { status: "idle" };
      state.tokens = { status: "idle" };
    },
    setError: (state, action: PayloadAction<ErrorObject | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateTokens: (state, action: PayloadAction<JWTTokens>) => {
      state.tokens = { status: "success", data: action.payload };
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.currentUser = { status: "success", data: action.payload };
    },
    updateUserTheme: (state, action: PayloadAction<"light" | "dark" | "auto">) => {
      if (state.currentUser.status === "success" && state.currentUser.data) {
        state.currentUser.data.user_theme = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.currentUser = { status: "loading" };
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      if (state.tokens.status === "idle") {
        state.currentUser = { status: "idle" };
      } else {
        state.currentUser = { status: "success", data: action.payload };
      }
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      if (action.error.name === "AbortError") {
        return;
      }
      state.currentUser = {
        status: "error",
        error: action.error.message || "Something went wrong",
      };
    });

    builder.addCase(createTokens.pending, (state) => {
      state.tokens = { status: "loading" };
    });
    builder.addCase(createTokens.fulfilled, (state, action: PayloadAction<JWTTokens>) => {
      state.tokens = { status: "success", data: action.payload };
    });
    builder.addCase(createTokens.rejected, (state, action) => {
      if (action.error.name === "AbortError") {
        return;
      }
      const errorPayload = action.payload as ErrorObject | undefined;
      state.tokens = {
        status: "error",
        error: errorPayload?.message || action.error.message || "Something went wrong",
      };
      state.error = errorPayload || null;
    });
  },
});

export const { actions: userActions } = userSlice;
