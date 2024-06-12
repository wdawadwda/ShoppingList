import { Image, TouchableOpacity, View } from "react-native";
import { stylesHeader } from "./header.style";
import { type HeaderProps } from "./header.type";
import { colorDark, darkStyles, lightStyles } from "@/styles";
import { LangSwitcher } from "@/components/ui";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import { selectUser } from "@/store/user";
import { useSelector } from "react-redux";

export const Header = ({ theme }: HeaderProps) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  return (
    <View style={[theme === "dark" ? darkStyles.headerContainer : lightStyles.headerContainer, stylesHeader.container]}>
      <TouchableOpacity style={stylesHeader.logoWrapper} onPress={() => navigation.navigate("Home" as never)}>
        <Image style={stylesHeader.logo} source={require("../../../assets/logo/logo.png")} />
      </TouchableOpacity>
      <View style={stylesHeader.switchersWrapper}>
        <TouchableOpacity style={stylesHeader.user} onPress={() => navigation.navigate("User" as never)}>
          <FontAwesome name="user" size={25} color={user ? "#98CA06" : colorDark.textColor} />
        </TouchableOpacity>
        <LangSwitcher theme={theme} />
      </View>
    </View>
  );
};
