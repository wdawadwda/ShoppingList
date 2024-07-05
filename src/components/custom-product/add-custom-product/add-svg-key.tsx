import { type Theme } from "@/store";
import { StyleSheet, View } from "react-native";
import { svgSchemeForAdding } from "@/constants/products-lists/svg-scheme";
import { Button } from "@/components/ui";

export const AddSvgKey = ({ theme, onSelectSvgKey }: { theme: Theme; onSelectSvgKey: (key: string) => void }) => {
  return (
    <View style={styles.container}>
      {Object.keys(svgSchemeForAdding).map((key) => (
        <View key={key} style={styles.buttonContainer}>
          <Button theme={theme} onPress={() => onSelectSvgKey(key)} style={styles.button}>
            {svgSchemeForAdding[key]}
          </Button>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    margin: 5,
  },
  button: {
    display: "flex",
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddSvgKey;
