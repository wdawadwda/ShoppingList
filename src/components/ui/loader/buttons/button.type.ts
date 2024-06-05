import { type Theme } from "@/store";
import { ReactNode } from "react";
import { GestureResponderEvent, StyleProp, ViewStyle } from "react-native";

export interface ButtonProps {
  theme: Theme;
  children: ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  buttonColorVar?: "backgroundColorSecond";
}
