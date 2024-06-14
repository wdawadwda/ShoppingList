import { createListenerMiddleware } from "@reduxjs/toolkit";
import { userActions } from "./user.slice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEYS, type JWTTokens } from "@/constants";
import { createTokens } from "../api";

export const userlistenerMiddleware = createListenerMiddleware();

userlistenerMiddleware.startListening({
  matcher: createTokens.fulfilled.match,
  effect: async ({ payload }: { payload: JWTTokens }) => {
    try {
      await AsyncStorage.setItem(KEYS.USER.ACCESS_TOKEN, payload.access);
      await AsyncStorage.setItem(KEYS.USER.REFRESH_TOKEN, payload.refresh);
    } catch (error) {
      console.error("Error saving tokens to AsyncStorage:", error);
    }
  },
});

userlistenerMiddleware.startListening({
  matcher: userActions.logout.match,
  effect: async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER.ACCESS_TOKEN);
      await AsyncStorage.removeItem(KEYS.USER.REFRESH_TOKEN);
    } catch (error) {
      console.error("Error removing tokens from AsyncStorage:", error);
    }
  },
});
