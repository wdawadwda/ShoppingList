import { StyleSheet } from "react-native";
import Button from "../button";
import { type Theme } from "@/store";
import { useNavigation } from "@react-navigation/native";
import { colorDark } from "@/styles";
import { ArrowLeftComponent } from "@/assets";

export const BackButton = ({ theme, onPress }: { theme: Theme; onPress?: () => void }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };
  return (
    <Button
      theme={theme}
      onPress={handlePress}
      style={[styles.buttonContainer, { alignSelf: "flex-start" }]}
      buttonColorVar="backgroundColorThird"
    >
      <ArrowLeftComponent width={25} height={25} color={colorDark.textColor} />
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    marginBottom: 25,
    height: 50,
    width: 50,
  },
});

export default BackButton;
