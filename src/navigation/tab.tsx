import { AntDesign } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackNavigator, StackUserNavigator } from "./stack";
import TestSvgComponent from "../../assets/icons/test/test-svg";

const Tab = createBottomTabNavigator();
export const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "gray",
          borderTopColor: "lightgray",
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
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <AntDesign name="home" size={35} color={color} />,
          headerShown: false,
        }}
      >
        {() => <StackNavigator />}
      </Tab.Screen>

      <Tab.Screen
        name="UserTab"
        initialParams={{ initialRoute: "User" }}
        options={{
          tabBarLabel: "User",
          tabBarIcon: ({ color }) => <TestSvgComponent width={50} height={50} color={color} />,
          headerShown: false,
        }}
      >
        {() => <StackUserNavigator />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
