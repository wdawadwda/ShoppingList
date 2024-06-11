import { Text, View } from "react-native";
import { Button } from "../buttons/button";
import { themeActions, useAppDispatch } from "@/store";
import { type Theme } from "@/store";
import { Feather } from "@expo/vector-icons";
import { colorDark } from "@/styles";
export const ThemeToggleButtons = ({ theme }: { theme: Theme }) => {
  const dispatch = useAppDispatch();
  const setTheme = (newTheme: Theme) => {
    dispatch(themeActions.setTheme(newTheme));
  };

  const handleAutoTheme = () => {
    console.log("auto");
  };

  return (
    <View>
      <Button
        style={{ height: 70, marginBottom: 5, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
        onPress={() => setTheme("light")}
        theme={theme}
      >
        <Feather name="sun" size={25} color={colorDark.textColor} />
      </Button>
      <Button style={{ height: 70, marginBottom: 5, borderRadius: 0 }} onPress={() => setTheme("dark")} theme={theme}>
        <Feather name="moon" size={25} color={colorDark.textColor} />
      </Button>
      <Button
        style={{ height: 70, marginBottom: 5, flexDirection: "row", borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
        onPress={handleAutoTheme}
        theme={theme}
      >
        <Text>Auto</Text>
      </Button>
    </View>
  );
};

export default ThemeToggleButtons;
