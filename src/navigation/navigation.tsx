import { useColorScheme } from "react-native";
import { TabNavigator } from "./tab";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type Theme, themeActions, selectTheme, useAppSelector } from "@/store";
import { Layout, LoaderFetchUser } from "@/components";
import { useAuth, useCustomProducts, useFetchLists, useLoadAsyncInState } from "@/use";
import { selectUser } from "@/store/user";

export const Navigation = () => {
  const isInitializing = useAppSelector(
    ({ user }) =>
      (user.currentUser.status === "loading" || user.currentUser.status === "idle") && user.tokens.status === "success",
  );
  const user = useSelector(selectUser);

  // const isInitializing = false;

  const dispatch = useAppDispatch();
  const defaultTheme = useColorScheme();
  const theme: Theme = useSelector(selectTheme);

  useAuth(dispatch);
  useLoadAsyncInState(dispatch);
  useFetchLists(dispatch, user);
  useCustomProducts(dispatch, user);

  useEffect(() => {
    const systemTheme = defaultTheme === "dark" ? "dark" : "light";

    if (!user || user.user_theme === "auto") {
      dispatch(themeActions.setTheme(systemTheme));
    } else if (user.user_theme === "dark" || user.user_theme === "light") {
      dispatch(themeActions.setTheme(user.user_theme));
    } else {
      dispatch(themeActions.setTheme(systemTheme));
    }
  }, [user, defaultTheme]);

  return (
    <NavigationContainer>
      {isInitializing ? (
        <Layout theme={theme}>
          <LoaderFetchUser theme={theme} />
        </Layout>
      ) : (
        <TabNavigator theme={theme} />
      )}
    </NavigationContainer>
  );
};
