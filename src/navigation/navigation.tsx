import { useColorScheme } from "react-native";
import { TabNavigator } from "./tab";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type Theme, themeActions, selectTheme, useAppSelector } from "@/store";
import { Layout, LoaderFetchUser } from "@/components";
import { useAuth, useLoadAsyncInState } from "@/use";

export const Navigation = () => {
  const isInitializing = useAppSelector(
    ({ user }) =>
      (user.currentUser.status === "loading" || user.currentUser.status === "idle") && user.tokens.status === "success",
  );
  // const isInitializing = false;
  const dispatch = useAppDispatch();
  const defaultTheme = useColorScheme();
  const theme: Theme = useSelector(selectTheme);

  useAuth(dispatch);
  useLoadAsyncInState(dispatch);

  useEffect(() => {
    dispatch(themeActions.setTheme(defaultTheme === "dark" ? "dark" : "light"));
  }, []);

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
