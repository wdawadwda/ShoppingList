import { ListProductItemCard } from "@/components/ui";
import { type Language, type ProductInList, type ProductsListData } from "@/constants";
import { type Theme } from "@/store";
import { fontsStyles, globalStyles } from "@/styles";
import { t } from "i18next";
import { type Dispatch } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const ListContent = ({
  productList,
  language,
  theme,
  setProductData,
  productData,
  isEditable = true,
}: {
  productList: ProductInList[];
  theme: Theme;
  language: Language;
  setProductData: Dispatch<React.SetStateAction<ProductsListData>>;
  productData: ProductsListData;
  isEditable?: boolean;
}) => {
  type CategoryMap = {
    [key: string]: ProductInList[];
  };

  const toggleProductPushed = (product: ProductInList) => {
    if (!isEditable) return;
    const updatedProducts = productData.products.map((p) =>
      p.id === product.id ? { ...p, isPushed: !p.isPushed } : p,
    );
    setProductData((prevData) => ({
      ...prevData,
      products: updatedProducts,
    }));
  };

  const categorizeProducts = (products: ProductInList[], isPushed: boolean): CategoryMap => {
    return products
      .filter((product) => product.isPushed === isPushed)
      .reduce<CategoryMap>((acc, product) => {
        const category = product.category[language.toLowerCase() as keyof typeof product.category];
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});
  };

  const renderProductList = (categories: CategoryMap, isPurchased: boolean) => {
    return Object.entries(categories).map(([category, products], index) => (
      <View key={`${category}-${isPurchased}-${index + 1}`}>
        <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>{category}</Text>
        {products.map((product) => (
          <TouchableOpacity
            key={`${product.id}--${index + 1}` || `${product.name}--${index + 1}`}
            onPress={() => toggleProductPushed(product)}
            disabled={!isEditable}
          >
            <ListProductItemCard
              setProductData={setProductData}
              productList={productList}
              productData={productData}
              language={language}
              product={product}
              theme={theme}
              isPurchased={!isPurchased}
              isEditable={isEditable}
            />
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  const unpurchasedCategories = categorizeProducts(productData.products, false);
  const purchasedCategories = categorizeProducts(productData.products, true);

  return (
    <View style={globalStyles.container}>
      <View style={styles.emptyText}>
        <Text style={[fontsStyles.text, fontsStyles.defaultColor, styles.headerText]}>
          {t("text.lists.listsLabels.shoppingList")}
        </Text>
        {Object.keys(unpurchasedCategories).length > 0 ? (
          renderProductList(unpurchasedCategories, false)
        ) : (
          <Text style={[fontsStyles.text, fontsStyles.defaultColor, styles.section]}>
            {t("text.lists.listsLabels.emptyList")}
          </Text>
        )}
      </View>

      <View>
        <Text style={[fontsStyles.text, fontsStyles.defaultColor, styles.headerText]}>
          {t("text.lists.listsLabels.purchasedItems")}
        </Text>
        {Object.keys(purchasedCategories).length > 0 ? (
          renderProductList(purchasedCategories, true)
        ) : (
          <Text style={[fontsStyles.text, fontsStyles.defaultColor, styles.section]}>
            {t("text.lists.listsLabels.noPurchasedItems")}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginVertical: 10,
  },
  headerText: {
    width: "100%",
    textAlign: "center",
  },
  emptyText: {
    marginVertical: 15,
  },
});

export default ListContent;
