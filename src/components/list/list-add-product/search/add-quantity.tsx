import { Button } from "@/components/ui";
import { ProductInList, type ProductsListData } from "@/constants";
import { Theme } from "@/store";
import { globalStyles } from "@/styles";
import { t } from "i18next";
import { Dispatch, useState } from "react";
import { Text, TextInput } from "react-native";
export interface AddQuantityProps {
  productData: ProductsListData;
  currentProduct: ProductInList;
  setProductData: Dispatch<ProductsListData>;
  setshowInputAdd: Dispatch<boolean>;
  setSearchTerm: Dispatch<string>;
  setCurrentProduct: Dispatch<ProductInList | null>;
  theme: Theme;
}

export const AddQuantity = ({
  productData,
  currentProduct,
  setProductData,
  setshowInputAdd,
  setSearchTerm,
  setCurrentProduct,
  theme,
}: AddQuantityProps) => {
  const [quantity, setQuantity] = useState<string>("");

  const handleAddProduct = (prData: ProductsListData) => {
    const productWithQuantity = { ...currentProduct, quantity };
    const newData = {
      ...prData,
      products: [...prData.products, productWithQuantity],
    };

    setProductData(newData as ProductsListData);

    setSearchTerm("");
    setCurrentProduct(null);
    setQuantity("");
    setshowInputAdd(false);
  };

  return (
    <>
      <TextInput
        style={globalStyles.input}
        placeholder={t("defaultMessage.enterQuantity")}
        value={quantity}
        maxLength={7}
        onChangeText={setQuantity}
      />
      <Button theme={theme} onPress={() => handleAddProduct(productData)}>
        <Text> {t("defaultMessage.confirm")}</Text>
      </Button>
    </>
  );
};

export default AddQuantity;
