import { EditSvgComponent, XSvgComponent } from "@/assets";
import { type Language, type ProductInList, type ProductsListData, svgScheme } from "@/constants";
import { type Theme } from "@/store";
import { colorDark, darkStyles, fontsStyles, lightStyles } from "@/styles";
import { getFirstLetter } from "@/utils";
import { useState, type Dispatch } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { EditProduct } from "./edit-product";

const updateProductData = (
  updatedList: ProductInList[],
  productData: ProductsListData,
  setProductData: Dispatch<ProductsListData>,
) => {
  setProductData({
    ...productData,
    products: updatedList,
  });
};

const handleDelete = (
  product: ProductInList,
  productList: ProductInList[],
  productData: ProductsListData,
  setProductData: Dispatch<ProductsListData>,
) => {
  const updatedList = productList.filter((item) => item.id !== product.id);
  updateProductData(updatedList, productData, setProductData);
};

const handleEdit = (
  updatedProduct: ProductInList,
  productList: ProductInList[],
  productData: ProductsListData,
  setProductData: Dispatch<ProductsListData>,
  setIsEdit: Dispatch<React.SetStateAction<boolean>>,
) => {
  const updatedList = productList.map((item) => (item.id === updatedProduct.id ? updatedProduct : item));
  updateProductData(updatedList, productData, setProductData);
  setIsEdit(false);
};

const renderProductIcon = (product: ProductInList, language: Language) =>
  svgScheme[product.svgKey] || <Text style={styles.productInitial}>{getFirstLetter(product.name, language)}</Text>;

const renderScrollableText = (text: string, width: any) => (
  <View style={{ width }}>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Text style={[fontsStyles.text, styles.scrollableText]}>{text}</Text>
    </ScrollView>
  </View>
);

const renderActionButton = (onPress: () => void, Icon: React.ComponentType<any>) => (
  <TouchableOpacity onPress={onPress} style={styles.actionButton}>
    <Icon width={25} height={25} color={colorDark.textColor} />
  </TouchableOpacity>
);

export const ListProductItemCard = ({
  product,
  theme,
  language,
  productList,
  setProductData,
  productData,
}: {
  product: ProductInList;
  theme: Theme;
  language: Language;
  productList: ProductInList[];
  setProductData: Dispatch<ProductsListData>;
  productData: ProductsListData;
}) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const quantity = product.quantity || " ";
  const productName = product.name[language];

  return (
    <>
      <View style={[theme === "dark" ? darkStyles.secondContainer : lightStyles.secondContainer, styles.card]}>
        <View style={styles.iconContainer}>{renderProductIcon(product, language)}</View>
        {renderScrollableText(productName, "40%")}
        {renderScrollableText(quantity, "15%")}
        {renderActionButton(() => setIsEdit(true), EditSvgComponent)}
        {renderActionButton(() => handleDelete(product, productList, productData, setProductData), XSvgComponent)}
      </View>
      {isEdit && (
        <EditProduct
          theme={theme}
          product={product}
          onEdit={(updatedProduct) => handleEdit(updatedProduct, productList, productData, setProductData, setIsEdit)}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    height: 60,
  },
  iconContainer: {
    width: "10%",
  },
  productInitial: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: colorDark.textColor,
  },
  scrollableText: {
    color: colorDark.textColor,
    height: 35,
  },
  actionButton: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ListProductItemCard;
