import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("./src/fonts/Lato-Regular.ttf"),
    "Lato-Medium": require("./src/fonts/Lato-Medium.ttf"),
    "Montserrat-SemiBold": require("./src/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./src/fonts/Montserrat-Bold.ttf"),
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
