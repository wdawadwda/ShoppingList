import { ScrollView, StyleSheet, Text, ViewStyle } from "react-native";

import { type TabsProperties } from "./tabs.types";
import { Button } from "../ui";

export const SliderWithButtons = ({
  activeTab,
  tabs,
  handleTabClick,
  center = false,
  fixedWidth = false,
  theme,
}: TabsProperties) => {
  const scrollViewStyle: ViewStyle = center ? { flex: 1, justifyContent: "center", alignItems: "center" } : {};

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[scrollViewStyle, { height: 50 }]}
    >
      {tabs.map((tab, index) => (
        <Button
          theme={theme}
          key={index}
          style={[
            styles.button,
            { opacity: activeTab === tab ? 1 : 0.6 },
            { height: 50 },
            fixedWidth && { width: 150 },
          ]}
          onPress={() => handleTabClick(tab)}
        >
          <Text style={styles.buttonText}>{tab}</Text>
        </Button>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    textTransform: "uppercase",
  },
});
