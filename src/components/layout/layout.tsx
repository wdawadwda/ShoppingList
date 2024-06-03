import { SafeAreaView } from "react-native-safe-area-context";

import { View } from "react-native";
import { type LayoutProps } from "./layout.type";
import { Header } from "./header/header";
import { styles } from "../../../styles/global.style";

export const Layout = ({ children }: LayoutProps) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={{ backgroundColor: "gray" }}>
        <Header />
        <View style={styles.content}>{children}</View>
      </View>
    </SafeAreaView>
  );
};
