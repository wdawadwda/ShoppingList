import { View } from "react-native";
import { stylesHeader } from "./header.style";
import { type HeaderProps } from "./header.type";
import { darkStyles, lightStyles } from "@/styles";
import { LangSwitcher } from "@/components/ui";

export const Header = ({ theme }: HeaderProps) => {
  return (
    <View style={[theme === "dark" ? darkStyles.headerContainer : lightStyles.headerContainer, stylesHeader.container]}>
      <View>
        <LangSwitcher theme={theme} />
      </View>
    </View>
  );
};
