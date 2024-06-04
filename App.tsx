import { View } from "react-native";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { globalStyles } from "@/styles";
import { Navigation } from "@/navigation/navigation";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Lato-Regular": require("./src/assets/fonts/Lato-Regular.ttf"),
    "Lato-Medium": require("./src/assets/fonts/Lato-Medium.ttf"),
    "Montserrat-SemiBold": require("./src/assets/fonts/Montserrat-SemiBold.ttf"),
    "Montserrat-Bold": require("./src/assets/fonts/Montserrat-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={globalStyles.container}>
        <Navigation />
      </View>
    </Provider>
  );
}
