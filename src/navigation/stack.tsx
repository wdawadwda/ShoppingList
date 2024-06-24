import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import { type Theme } from "@/store";
import { colorDark, colorLight } from "@/styles";
import { AddCustomProduct, HistoryResipt, Home, List, PhotoResipt, RegAuth, Resipt, Settings, User, UserTheme } from "@/screens";

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

      <Stack.Screen
        name="List"
        options={{
          headerShown: false,
        }}
      >
        {() => <List theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="User"
        options={{
          headerShown: false,
        }}
      >
        {() => <User theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="RegAuth"
        options={{
          headerShown: false,
        }}
      >
        {() => <RegAuth theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);

export const ResiptNavigator = ({ theme }: { theme: Theme }) => (
  <>
    <StatusBar
      backgroundColor={theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond}
      barStyle="light-content"
    />
    <Stack.Navigator>
      <Stack.Screen
        name="Receipt"
        options={{
          headerShown: false,
        }}
      >
        {() => <Resipt theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="PhotoResipt"
        options={{
          headerShown: false,
        }}
      >
        {() => <PhotoResipt theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="HistoryResipt"
        options={{
          headerShown: false,
        }}
      >
        {() => <HistoryResipt theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="User"
        options={{
          headerShown: false,
        }}
      >
        {() => <User theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="RegAuth"
        options={{
          headerShown: false,
        }}
      >
        {() => <RegAuth theme={theme} />}
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
        name="User"
        options={{
          headerShown: false,
        }}
      >
        {() => <User theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="RegAuth"
        options={{
          headerShown: false,
        }}
      >
        {() => <RegAuth theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="UserTheme"
        options={{
          headerShown: false,
        }}
      >
        {() => <UserTheme theme={theme} />}
      </Stack.Screen>

      <Stack.Screen
        name="AddCustomProduct"
        options={{
          headerShown: false,
        }}
      >
        {() => <AddCustomProduct theme={theme} />}
      </Stack.Screen>
    </Stack.Navigator>
  </>
);
