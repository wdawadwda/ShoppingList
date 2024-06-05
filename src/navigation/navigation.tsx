import { useColorScheme, View } from "react-native";
import { TabNavigator } from "./tab";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch, type Theme, themeActions, selectTheme } from "@/store";
import { Loader } from "@/components";

export const Navigation = () => {
  const isInitializing = false;
  const dispatch = useAppDispatch();

  const isDark = useColorScheme();
  const theme: Theme = useSelector(selectTheme);
  useEffect(() => {
    dispatch(themeActions.setTheme(isDark ? "dark" : "light"));
  }, []);

  return (
    <NavigationContainer>
      {isInitializing ? (
        <View>
          <Loader size={100} theme={theme} />
        </View>
      ) : (
        <TabNavigator theme={theme} />
      )}
    </NavigationContainer>
  );
};
