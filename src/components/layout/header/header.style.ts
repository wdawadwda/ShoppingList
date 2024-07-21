import { StyleSheet } from "react-native";

export const stylesHeader = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
  },
  logoWrapper: {
    width: 70,
    height: 70,
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  switchersWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  user: {
    marginRight: 10,
  },
  sync: {
    marginRight: 20,
  },
});
