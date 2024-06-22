import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { colorDark, colorLight, fontsStyles } from "@/styles";

import { useState } from "react";
import { Theme } from "@/store";
import i18n from "@/i118/i18n";

export const LangSwitcher = ({ theme }: { theme: Theme }) => {
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const handlePress = () => {
    setIsOpen(!isOpen);
  };
  const handleChangeLanguage = () => {
    const newLanguage = language === "en" ? "ru" : "en";
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress} style={{ width: 50 }}>
        <Text style={[styles.text, fontsStyles.text]}>{language.toUpperCase()}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.openingContainer}>
          <TouchableOpacity
            style={{
              backgroundColor: theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond,
              height: 25,
            }}
            onPress={() => setIsOpen(false)}
          >
            <Text style={[styles.text, fontsStyles.text]}>{language === "en" ? "EN" : "RU"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: theme === "dark" ? colorDark.backgroundColorSecond : colorLight.backgroundColorSecond,
              height: 25,
            }}
            onPress={() => handleChangeLanguage()}
          >
            <Text style={[styles.text, fontsStyles.text]}>{language === "en" ? "RU" : "EN"}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colorDark.textColor,
    textAlign: "center",
    fontSize: 20,
  },
  openingContainer: {
    backgroundColor: colorDark.textColor,
    borderRadius: 5,
    position: "absolute",
    top: 0,
    right: 0,
    width: 50,
  },
});
