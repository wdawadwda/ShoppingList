import { Image, TouchableOpacity, View } from "react-native";
import { stylesHeader } from "./header.style";
import { type HeaderProps } from "./header.type";
import { colorDark, darkStyles, lightStyles } from "@/styles";
import { LangSwitcher } from "@/components/ui";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "@/store/user";
import { useSelector } from "react-redux";
import { UserSvgComponent } from "@/assets";
import { type MainNavigationProp } from "@/navigation";

export const Header = ({ theme }: HeaderProps) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation<MainNavigationProp>();
  return (
    <View style={[theme === "dark" ? darkStyles.headerContainer : lightStyles.headerContainer, stylesHeader.container]}>
      <TouchableOpacity style={stylesHeader.logoWrapper} onPress={() => navigation.navigate("Home")}>
        <Image style={stylesHeader.logo} source={require("../../../assets/logo/logo.png")} />
      </TouchableOpacity>
      <View style={stylesHeader.switchersWrapper}>
        <TouchableOpacity style={stylesHeader.user} onPress={() => navigation.navigate("User")}>
          <UserSvgComponent color={user ? "#98CA06" : colorDark.textColor} width={20} height={20} />
        </TouchableOpacity>
        <LangSwitcher theme={theme} />
      </View>
    </View>
  );
};
