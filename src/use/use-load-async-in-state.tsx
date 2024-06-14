import { KEYS } from "@/constants";
import { type AppDispatch } from "@/store/store.types";
import { userActions } from "@/store/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

export const useLoadAsyncInState = (dispatch: AppDispatch) => {
  useEffect(() => {
    const loadAsyncInState = async () => {
      try {
        const access = await AsyncStorage.getItem(KEYS.USER.ACCESS_TOKEN);
        const refresh = await AsyncStorage.getItem(KEYS.USER.REFRESH_TOKEN);

        if (access !== null && refresh !== null) {
          dispatch(userActions.updateTokens({ access, refresh }));
        }
      } catch (error) {
        console.error("Error reading tokens from AsyncStorage:", error);
      }
    };

    loadAsyncInState();
  }, []);
};
