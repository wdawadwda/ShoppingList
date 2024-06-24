import { type ProductInList } from "@/constants";
import { type Theme } from "@/store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Button } from "../ui";
import AddSvgKey from "./add-svg-key";

export const AddCustomPr = ({ theme }: { theme: Theme }) => {
  const { t, i18n } = useTranslation();
  const [showSecondLanguage, setShowSecondLanguage] = useState(false);
  const [showAddImageText, setShowAddImageText] = useState(false);

  const [product, setProduct] = useState<ProductInList>({
    quantity: "",
    category: { en: "", ru: "" },
    name: { en: "", ru: "" },
    svgKey: "",
    isPushed: false,
  });

  useEffect(() => {
    console.log(product);
  }, [product]);
  const handleChange = (field: keyof ProductInList, value: string, lang?: "en" | "ru") => {
    setProduct((prev) => {
      if (lang && (field === "name" || field === "category")) {
        return {
          ...prev,
          [field]: { ...(prev[field] as { en: string; ru: string }), [lang]: value },
        };
      }
      return { ...prev, [field]: value };
    });
  };
  const primaryLang = i18n.language as "en" | "ru";
  const secondaryLang = primaryLang === "en" ? "ru" : "en";

  const renderInputs = (lang: "en" | "ru") => (
    <>
      <Text>Name ({lang})</Text>
      <TextInput
        style={styles.input}
        value={product.name[lang]}
        onChangeText={(value) => handleChange("name", value, lang)}
        placeholder={`Enter product name in ${lang === "en" ? "English" : "Russian"}`}
      />
      <Text>Category ({lang})</Text>
      <TextInput
        style={styles.input}
        value={product.category[lang]}
        onChangeText={(value) => handleChange("category", value, lang)}
        placeholder={`Enter category in ${lang === "en" ? "English" : "Russian"}`}
      />
    </>
  );

  const handleSvgKeySelect = (svgKey: string) => {
    setProduct((prev) => ({ ...prev, svgKey }));
    setShowAddImageText(false);
  };

  return (
    <>
      <View style={styles.form}>
        {renderInputs(primaryLang)}
        {showAddImageText && <AddSvgKey onSelectSvgKey={handleSvgKeySelect} theme={theme} />}

        {!showSecondLanguage && (
          <Button onPress={() => setShowSecondLanguage(true)} theme={theme}>
            {t("buttonLabels.addCustomProductBtn.addNames", { lang: secondaryLang })}
          </Button>
        )}
        {showSecondLanguage && renderInputs(secondaryLang)}
        <Button
          onPress={() => {
            console.log(product);
          }}
          theme={theme}
        >
          Add Product
        </Button>
        {!showAddImageText && (
          <Button onPress={() => setShowAddImageText(true)} theme={theme}>
            Показать надпись
          </Button>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
});

export default AddCustomPr;
