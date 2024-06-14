import { type JWTTokens } from "@/constants";
import { fetchUser } from "@/store/api";
import { useAppSelector, type AppDispatch } from "@/store/store.types";
import { selectTokens } from "@/store/user";
import { useEffect } from "react";

export const useAuth = (dispatch: AppDispatch) => {
  const tokens: JWTTokens | null = useAppSelector(selectTokens);
  useEffect(() => {
    if (tokens && tokens.access && tokens.refresh) {
      const { access, refresh } = tokens;
      const promise = dispatch(fetchUser({ accessToken: access, refreshToken: refresh }));
      return () => {
        promise.abort("cancelled");
      };
    }
  }, [tokens]);
};
