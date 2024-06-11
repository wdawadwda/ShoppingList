import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { type Theme } from "@/store";
import { colorDark, colorLight } from "@/styles";
import { Home, Settings, UserTheme } from "@/screens";

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

export const StackSettingsNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond}
      barStyle="light-content"
    />
    <Stack.Navigator>
      <Stack.Screen
        name="Settings"
        options={{
          headerShown: false,
        }}
      >
        {() => <Settings theme={theme} />}
      </Stack.Screen>
      <Stack.Screen
        name="UserTheme"
        options={{
          headerShown: false,
        }}
      >
        {() => <UserTheme theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);
