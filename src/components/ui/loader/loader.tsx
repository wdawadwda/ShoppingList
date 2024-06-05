import { type Theme } from "@/store";
import { colorDark, colorLight } from "@/styles";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = ({ size, theme }: { size: number; theme: Theme }) => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator
      size={size}
      color={theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },
});

export default Loader;
