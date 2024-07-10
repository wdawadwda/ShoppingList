import { StyleSheet } from "react-native";
import Button from "../button";
import { type Theme } from "@/store";
import { colorDark } from "@/styles";
import { PlusComponent } from "@/assets";

export const AddButton = ({
  theme,
  onPress,
  iconComponent: IconComponent = PlusComponent,
}: {
  theme: Theme;
  onPress?: () => void;
  iconComponent?: React.ComponentType<any>;
}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <Button
      theme={theme}
      onPress={handlePress}
      style={[styles.buttonContainer, { alignSelf: "flex-start" }]}
      buttonColorVar="backgroundColorThird"
    >
      <IconComponent width={20} height={20} color={colorDark.textColor} />
    </Button>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    height: 40,
    width: 40,
  },
});

export default AddButton;
