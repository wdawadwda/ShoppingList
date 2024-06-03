import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { styles } from "./styles/global.style";
import { Navigation } from "./src/navigation/navigation";

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
      <Navigation />
    </View>
  );
}

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
