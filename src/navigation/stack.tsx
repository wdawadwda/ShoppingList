import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/home/home";
import { StatusBar } from "react-native";
import User from "../screens/user/user";

const Stack = createNativeStackNavigator();

export const StackNavigator = () => (
  <>
    <StatusBar backgroundColor={"gray"} barStyle={"dark-content"} />
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      >
        {() => <Home />}
      </Stack.Screen>
      <Stack.Screen
        name="User"
        options={{
          headerShown: false,
        }}
      >
        {() => <User />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);

export const StackUserNavigator = () => (
  <>
    <StatusBar backgroundColor={"gray"} barStyle={"dark-content"} />
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTintColor: "#000",
      }}
    >
      <Stack.Screen
        name="User"
        options={{
          headerShown: false,
        }}
      >
        {() => <User />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);
