import { type NativeStackNavigationProp } from "@react-navigation/native-stack";
import { type RouteProp } from "@react-navigation/native";

type NavigationParamsList = {
  listId: string;
  listName: string;
};

type RootStackParamList = {
  Home: undefined;
  User: undefined;
  Receipt: undefined;
  PhotoResipt: undefined;
  HistoryResipt: undefined;
  RegAuth: undefined;
  UserTheme: undefined;
  AddList: undefined;
  AddCustomProduct: undefined;
  Settings: undefined;
  DellEditCustomProduct: undefined;
  List: NavigationParamsList | undefined;
};

export type ListRouteParamsWithData = RouteProp<RootStackParamList, "List"> & NavigationParamsList;
export type ListRouteParamsWithoutData = RouteProp<RootStackParamList, "List">;

export type MainNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home" | "User" | "List">;
