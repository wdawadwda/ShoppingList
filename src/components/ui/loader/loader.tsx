import { type Theme } from "@/store";
import { colorDark, colorLight } from "@/styles";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = ({ size, theme, inButton }: { size: number; theme: Theme; inButton?: boolean }) => {
  const loaderColor = inButton
    ? colorDark.textColor
    : theme === "dark"
      ? colorDark.backgroundColorSecond
      : colorLight.backgroundColorSecond;

  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={size} color={loaderColor} />
    </View>
  );
};
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
