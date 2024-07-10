import { type ProductInList } from "@/constants";

import { type Theme } from "@/store";
import { colorDark, fontsStyles, globalStyles } from "@/styles";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";

export const EditProduct = ({
  product,
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
        style={globalStyles.input}
        placeholder="Введите количество"
        value={quantity}
        onChangeText={setQuantity}
        maxLength={7}
      />
      <TouchableOpacity onPress={handleEdit}>
        <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>Подтвердить</Text>
      </TouchableOpacity>
    </>
  );
};

export default EditProduct;
