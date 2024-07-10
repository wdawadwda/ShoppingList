import { ListProductItemCard } from "@/components/ui";
import { type Language, type ProductInList, type ProductsListData } from "@/constants";
import { type Theme } from "@/store";
import { globalStyles } from "@/styles";
import { type Dispatch } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export const ListContent = ({
  productList,
  language,
  theme,
  setProductData,
  productData,
}: {
  productList: ProductInList[];
  theme: Theme;
  language: Language;
  setProductData: React.Dispatch<React.SetStateAction<ProductsListData>>;
  productData: ProductsListData;
}) => {
  type CategoryMap = {
    [key: string]: ProductInList[];
  };

  const toggleProductPushed = (product: ProductInList) => {
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
    return Object.entries(categories).map(([category, products]) => (
      <View key={`${category}-${isPurchased}`}>
        <Text>{category}</Text>
        {products.map((product) => (
          <TouchableOpacity key={product.id} onPress={() => toggleProductPushed(product)}>
            <ListProductItemCard
              setProductData={setProductData}
              productList={productList}
              productData={productData}
              language={language}
              product={product}
              theme={theme}
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
      <View>
        <Text>Список покупок</Text>
        {Object.keys(unpurchasedCategories).length > 0 ? (
          renderProductList(unpurchasedCategories, false)
        ) : (
          <Text>Список пока пуст</Text>
        )}
      </View>

      {/* <View style={globalStyles.separator} /> */}

      <View>
        <Text>Купленные товары</Text>
        {Object.keys(purchasedCategories).length > 0 ? (
          renderProductList(purchasedCategories, true)
        ) : (
          <Text>Нет купленных товаров</Text>
        )}
      </View>
    </View>
  );
};

export default ListContent;
