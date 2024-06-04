import { type Theme } from "../store";
import { colorDark, colorLight } from "./color.const";
import { fontsStyles } from "./global.style";

export const commonTextStyle = (
  theme: Theme,
  styleVariant: "textColor" | "textAlertColor" | "textDisabledColor" | "textLinks",
  textVariant: "title" | "subtitle" | "text" | "text2",
) => [theme === "dark" ? colorDark[styleVariant] : colorLight[styleVariant], fontsStyles[textVariant]];
