import { Image, TouchableOpacity, View } from "react-native";
import { stylesHeader } from "./header.style";
import { type HeaderProps } from "./header.type";
import { darkStyles, lightStyles } from "@/styles";
import { LangSwitcher } from "@/components/ui";
import { useNavigation } from "@react-navigation/native";

export const Header = ({ theme }: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <View style={[theme === "dark" ? darkStyles.headerContainer : lightStyles.headerContainer, stylesHeader.container]}>
      <TouchableOpacity style={stylesHeader.logoWrapper} onPress={() => navigation.navigate("Home" as never)}>
        <Image style={stylesHeader.logo} source={require("../../../assets/logo/logo.png")} />
      </TouchableOpacity>
      <View style={stylesHeader.switchersWrapper}>
        <LangSwitcher theme={theme} />
        <LangSwitcher theme={theme} />
      </View>
    </View>
  );
};
