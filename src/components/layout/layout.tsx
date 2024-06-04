import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "react-native";
import { type LayoutProps } from "./layout.type";
import { Header } from "./header/header";
import { darkStyles, globalStyles, lightStyles } from "@/styles";

export const Layout = ({ children, theme }: LayoutProps) => {
  return (
    <SafeAreaView style={globalStyles.safeArea}>
      <View style={[theme === "dark" ? darkStyles.container : lightStyles.container, globalStyles.container]}>
        <Header theme={theme} />
        <View style={globalStyles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
};
