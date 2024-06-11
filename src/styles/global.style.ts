import { StyleSheet } from "react-native";
import { colorDark, colorLight } from "./color.const";

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
  },
});

export const fontsStyles = StyleSheet.create({
  title: {
    fontSize: 35,
    textAlign: "center",
    marginBottom: 25,
    textTransform: "uppercase",
    fontFamily: "Montserrat-Bold",
  },
  subtitle: {
    fontSize: 25,
    textTransform: "uppercase",
    textAlign: "center",
    marginBottom: 15,
    fontFamily: "Montserrat-SemiBold",
  },
  text: {
    fontSize: 18,
    fontFamily: "Lato-Medium",
    textTransform: "none",
  },
  text2: {
    fontSize: 14,
    fontFamily: "Lato-Medium",
    textTransform: "none",
  },
});

export const darkStyles = StyleSheet.create({
  container: {
    backgroundColor: colorDark.backgroundColor,
  },
  headerContainer: {
    backgroundColor: colorDark.backgroundColorSecond,
  },
  containerAlert: {
    backgroundColor: colorDark.backgroundAlert,
  },
  containerSuccess: {
    backgroundColor: colorDark.backgroundColorSecond,
  },
});

export const lightStyles = StyleSheet.create({
  container: {
    backgroundColor: colorLight.backgroundColor,
  },
  headerContainer: {
    backgroundColor: colorLight.backgroundColorSecond,
  },
  containerAlert: {
    backgroundColor: colorLight.backgroundAlert,
  },
  containerSuccess: {
    backgroundColor: colorLight.backgroundColorSecond,
  },
});
