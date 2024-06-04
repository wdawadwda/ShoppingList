import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { type Theme } from "@/store";
import { colorDark, colorLight } from "@/styles";
import { Home, User } from "@/screens";

const Stack = createNativeStackNavigator();

export const StackNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond}
      barStyle="light-content"
    />
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{
          headerShown: false,
        }}
      >
        {() => <Home theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);

export const StackUserNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond}
      barStyle="light-content"
    />
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        options={{
          headerShown: false,
        }}
      >
        {() => <User theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);
