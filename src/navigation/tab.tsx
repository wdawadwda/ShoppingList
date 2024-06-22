import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ResiptNavigator, StackNavigator, StackSettingsNavigator } from "./stack";
import { Theme } from "@/store";
import { colorDark, colorLight } from "@/styles";
import { useTranslation } from "react-i18next";
import { HomeSvgComponent, ReceiptSvgComponent, SettingsSvgComponent } from "@/assets";

const Tab = createBottomTabNavigator();
export const TabNavigator = ({ theme }: { theme: Theme }) => {
  const { t } = useTranslation();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: theme === "dark" ? colorDark.textColor : colorLight.textColor,
        tabBarInactiveTintColor: colorDark.textDisabledColor,
        tabBarStyle: {
          backgroundColor: theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond,
          borderTopColor: theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond,
          height: 75,
        },
        tabBarLabelStyle: {
          fontSize: 15,
          marginBottom: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        initialParams={{ initialRoute: "Home" }}
        options={{
          tabBarLabel: t("tabsLabels.home"),
          tabBarIcon: ({ color }) => <HomeSvgComponent stroke={color} width={32} height={32} color={color} />,
          headerShown: false,
        }}
      >
        {() => <StackNavigator theme={theme} />}
      </Tab.Screen>

      <Tab.Screen
        name="ResiptTab"
        initialParams={{ initialRoute: "Resipt" }}
        options={{
          tabBarLabel: t("tabsLabels.receipts"),
          tabBarIcon: ({ color }) => <ReceiptSvgComponent stroke={color} width={32} height={32} color={color} />,
          headerShown: false,
        }}
      >
        {() => <ResiptNavigator theme={theme} />}
      </Tab.Screen>

      <Tab.Screen
        name="SettingsTab"
        initialParams={{ initialRoute: "Settings" }}
        options={{
          tabBarLabel: t("tabsLabels.settings"),
          tabBarIcon: ({ color }) => <SettingsSvgComponent stroke={color} width={32} height={32} color={color} />,
          headerShown: false,
        }}
      >
        {() => <StackSettingsNavigator theme={theme} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
