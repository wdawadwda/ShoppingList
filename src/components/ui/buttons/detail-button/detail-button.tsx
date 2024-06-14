import { StyleSheet } from "react-native";
import Button from "../button";
import { ExtraButtonsType } from "../button.type";

export const DetailButton = ({ onPress, theme }: ExtraButtonsType) => {
  return (
    <>
      <Button theme={theme} onPress={onPress} style={[style.buttonContainer]}>
        ?
      </Button>
    </>
  );
};

const style = StyleSheet.create({
  buttonContainer: {
    borderRadius: 50,
    width: 25,
    height: 25,
    borderColor: "white",
    borderWidth: 1,
    padding: 0,
    backgroundColor: "inherit",
  },
});
