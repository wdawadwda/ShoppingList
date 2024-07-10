import { ProductInList, type ProductsListData } from "@/constants";
import { Theme } from "@/store";
import { Dispatch, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

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
        style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Введите количество"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TouchableOpacity onPress={() => handleAddProduct(productData)}>
        <Text>Подтвердить</Text>
      </TouchableOpacity>
    </>
  );
};

export default AddQuantity;
