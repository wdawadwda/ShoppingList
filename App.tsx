import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import ShoppingListTest from "./src/components/test/shopping-list-test";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
    "Lato-Medium": require("./assets/fonts/Lato-Medium.ttf"),
    "Montserrat-SemiBold": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={fontsStyles.title}>Open up App.tsx to start working on your app!</Text>
      <Text style={fontsStyles.subtitle}>Open up App.tsx to start working on your app!</Text>
      <Text style={fontsStyles.text}>Open up App.tsx to start working on your app!</Text>
      <Text style={fontsStyles.text2}>Open up App.tsx to start working on your app!</Text>
      {/* <TestSvgComponent style={styles.svg} /> */}
      <ShoppingListTest />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  // svg: {
  //   color: "red",
  //   width: 50,
  //   height: 50,
  // },
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
  },
  text2: {
    fontSize: 14,
    fontFamily: "Lato-Medium",
  },
});
