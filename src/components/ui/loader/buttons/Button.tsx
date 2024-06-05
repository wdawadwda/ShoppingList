import { Pressable, StyleSheet, Text } from "react-native";

import { type ButtonProps } from "./button.type";
import { colorDark, colorLight } from "@/styles";

export const Button = ({ children, onPress, style, disabled, theme, buttonColorVar }: ButtonProps) => {
  const backgroundColor = buttonColorVar
    ? theme === "dark"
      ? colorDark[buttonColorVar]
      : colorLight[buttonColorVar]
    : theme === "dark"
      ? colorDark.backgroundColorSecond
      : colorLight.backgroundColorSecond;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          opacity: pressed ? 0.6 : 1,
          backgroundColor: backgroundColor,
        },
        style,
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colorDark.textColor,
    textTransform: "uppercase",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;
