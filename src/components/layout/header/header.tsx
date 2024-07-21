import { Animated, Easing, Image, TouchableOpacity, View } from "react-native";
import { stylesHeader } from "./header.style";
import { type HeaderProps } from "./header.type";
import { colorDark, darkStyles, lightStyles } from "@/styles";
import { LangSwitcher } from "@/components/ui";
import { useNavigation } from "@react-navigation/native";
import { selectUser } from "@/store/user";
import { useSelector } from "react-redux";
import { SyncSvgComponent, UserSvgComponent } from "@/assets";
import { type MainNavigationProp } from "@/navigation";
import { useAppDispatch } from "@/store";
import { fetchCustompProducts, fetchProductsLists } from "@/store/api";
import { useRef } from "react";

export const Header = ({ theme }: HeaderProps) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation<MainNavigationProp>();
  const dispatch = useAppDispatch();
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const handleSync = () => {
    if (user && user.id) {
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        rotateAnim.setValue(0);
      });

      dispatch(fetchProductsLists(user.id));
      dispatch(fetchCustompProducts(user.id));
    }
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={[theme === "dark" ? darkStyles.headerContainer : lightStyles.headerContainer, stylesHeader.container]}>
      <TouchableOpacity style={stylesHeader.logoWrapper} onPress={() => navigation.navigate("Home")}>
        <Image style={stylesHeader.logo} source={require("../../../assets/logo/logo.png")} />
      </TouchableOpacity>
      <View style={stylesHeader.switchersWrapper}>
        {user && (
          <TouchableOpacity style={stylesHeader.sync} onPress={handleSync}>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <SyncSvgComponent color={colorDark.textColor} width={20} height={20} />
            </Animated.View>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={stylesHeader.user} onPress={() => navigation.navigate("User")}>
          <UserSvgComponent color={user ? "#98CA06" : colorDark.textColor} width={20} height={20} />
        </TouchableOpacity>
        <LangSwitcher theme={theme} />
      </View>
    </View>
  );
};
