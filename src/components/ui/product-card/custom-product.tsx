import { Language, type ProductInList, svgScheme } from "@/constants";
import i18n from "@/i118/i18n";
import { type Theme } from "@/store";
import { colorDark, darkStyles, fontsStyles, lightStyles } from "@/styles";
import { getFirstLetter } from "@/utils";
import { StyleSheet, Text, View } from "react-native";

export const CustomProduct = ({ product, theme }: { product: ProductInList; theme: Theme }) => {
  const language = i18n.language as Language;
  const categoryName = product.category[language];
  const productName = product.name[language];

  return (
    <>
      <Text>{categoryName}</Text>

      <View style={[theme === "dark" ? darkStyles.secondContainer : lightStyles.secondContainer, styles.card]}>
        <View>
          {svgScheme[product.svgKey] || (
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{getFirstLetter(product.name, language)}</Text>
          )}
        </View>

        <View style={styles.textWrapper}>
          <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>{productName}</Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  textWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomProduct;
