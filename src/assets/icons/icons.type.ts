import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

export interface CustomSvgProps extends SvgProps {
  style?: StyleProp<ViewStyle | TextStyle>;
}
