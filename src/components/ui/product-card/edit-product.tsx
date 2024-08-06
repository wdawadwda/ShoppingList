import { type ProductInList } from "@/constants";

import { type Theme } from "@/store";
import { fontsStyles, globalStyles } from "@/styles";
import { t } from "i18next";
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
        placeholder={t("defaultMessage.enterQuantity")}
        value={quantity}
        onChangeText={setQuantity}
        maxLength={7}
      />
      <TouchableOpacity onPress={handleEdit}>
        <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>{t("defaultMessage.confirm")}</Text>
      </TouchableOpacity>
    </>
  );
};

export default EditProduct;
