import { type ProductInList } from "@/constants";

import { type Theme } from "@/store";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

export const EditProduct = ({
  product,
  theme,
  onEdit,
}: {
  product: ProductInList;
  theme: Theme;
  onEdit: (updatedProduct: ProductInList) => void;
}) => {
  const [quantity, setQuantity] = useState<string>(product.quantity || "");

  const handleEdit = () => {
    onEdit({ ...product, quantity });
  };
  return (
    <>
      <TextInput
        style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
        placeholder="Введите количество"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TouchableOpacity onPress={handleEdit}>
        <Text>Подтвердить</Text>
      </TouchableOpacity>
    </>
  );
};

export default EditProduct;
