import { StyleSheet } from "react-native";
import { colorDark, colorLight } from "./color.const";

export const globalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  containerAlert: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  containerSuccess: {
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    padding: 10,
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
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
  defaultColor: {
    color: colorDark.textColor,
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
    backgroundColor: colorDark.backgroundColoSuccess,
  },
  secondContainer: {
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
    backgroundColor: colorLight.backgroundColoSuccess,
  },
  secondContainer: {
    backgroundColor: colorLight.backgroundColorSecond,
  },
});
