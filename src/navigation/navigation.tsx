import { Text, View } from "react-native";
import { TabNavigator } from "./tab";
import { NavigationContainer } from "@react-navigation/native";

export const Navigation = () => {
  const isInitializing = false;

  return (
    <NavigationContainer>
      {isInitializing ? (
        <View>
          <Text>Loading...</Text>
        </View>
      ) : (
        <TabNavigator />
      )}
    </NavigationContainer>
  );
};
