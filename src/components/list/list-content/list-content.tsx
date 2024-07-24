import { ListProductItemCard } from "@/components/ui";
import { type Language, type ProductInList, type ProductsListData } from "@/constants";
import { type Theme } from "@/store";
import { colorDark, fontsStyles, globalStyles } from "@/styles";
import { type Dispatch } from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
        <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>{category}</Text>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id || `${product.name}--${index + 1}`}
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
      <View style={{ marginVertical: 10 }}>
        <Text style={[fontsStyles.text, { width: "100%", textAlign: "center", color: colorDark.textColor }]}>
          Список покупок
        </Text>
        {Object.keys(unpurchasedCategories).length > 0 ? (
          renderProductList(unpurchasedCategories, false)
        ) : (
          <Text style={[fontsStyles.text, { marginVertical: 15, color: colorDark.textColor }]}>Список пока пуст</Text>
        )}
      </View>

      <View>
        <Text style={[fontsStyles.text, { width: "100%", textAlign: "center", color: colorDark.textColor }]}>
          Купленные товары
        </Text>
        {Object.keys(purchasedCategories).length > 0 ? (
          renderProductList(purchasedCategories, true)
        ) : (
          <Text style={[fontsStyles.text, { marginVertical: 15, color: colorDark.textColor }]}>
            Нет купленных товаров
          </Text>
        )}
      </View>
    </View>
  );
};

export default ListContent;
