import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { type Good } from "../receipt.type";
import { colorDark, fontsStyles, globalStyles } from "@/styles";
import { Button, Loader } from "@/components/ui";
import { type Theme } from "@/store";
import { acceptBillText } from "@/store/api";
import { useNavigation } from "@react-navigation/native";
import { MessForm } from "@/components/mess-form";
import { t } from "i18next";
import { type MainNavigationProp } from "@/navigation";
import { ErrorObject, Language } from "@/constants";
import i18n from "@/i118/i18n";

export const GoodsList = ({
  userId,
  goods,
  theme,
}: {
  userId: string | null | undefined;
  goods: Good[];
  theme: Theme;
}) => {
  const navigation = useNavigation<MainNavigationProp>();
  const [editedGoods, setEditedGoods] = useState<Good[]>(goods);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (index: number, field: keyof Good, value: string) => {
    const newGoods = [...editedGoods];
    newGoods[index][field] = value;
    setEditedGoods(newGoods);
  };

  const handleAccept = () => {
    setEditMode(null);
  };

  const handleDelete = (index: number) => {
    const newGoods = editedGoods.filter((_, i) => i !== index);
    setEditedGoods(newGoods);
    setEditMode(null);
  };

  const handleSave = async () => {
    setError(null);
    setLoading(true);
    if (userId) {
      try {
        await acceptBillText(userId, editedGoods);
        navigation.navigate("Receipt");
      } catch (error) {
        const err = error as ErrorObject;
        let errorMessage = null;
        if (typeof err.detail === "object" && (i18n?.language as keyof typeof err.detail)) {
          errorMessage = err.detail[i18n.language as Language] || t("defaultMessage.errorPhoto");
        } else {
          errorMessage =
            typeof err.detail === "string" && err.detail !== "" ? err.detail : t("defaultMessage.errorPhoto");
        }
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddProduct = () => {
    const newProduct: Good = {
      barcode: "",
      product_name: "",
      unit: "",
      price: "",
      amount: "",
      cost: "",
    };
    setEditedGoods([...editedGoods, newProduct]);
    setEditMode(editedGoods.length);
  };

  if (loading) {
    return (
      <View style={[globalStyles.container, styles.defaultMarginTop]}>
        <Loader theme={theme} size={50} />
      </View>
    );
  }

  return (
    <View style={[globalStyles.container, styles.defaultMarginBottom]}>
      {error && (
        <View style={styles.errorContainer}>
          <MessForm message={{ defaultAxios: error }} status={"error"} />
        </View>
      )}
      {editedGoods.map((item, index) => (
        <View key={`${item.barcode}-${index}`} style={styles.item}>
          {editMode === index ? (
            <>
              <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>
                {t("text.reviseReceipt.productName")}:
              </Text>
              <TextInput
                style={globalStyles.input}
                value={item.product_name}
                onChangeText={(value) => handleInputChange(index, "product_name", value)}
              />
              <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>
                {t("text.reviseReceipt.unitOfMeasurement")}:
              </Text>
              <TextInput
                style={globalStyles.input}
                value={item.unit}
                onChangeText={(value) => handleInputChange(index, "unit", value)}
              />
              <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>{t("text.reviseReceipt.price")}:</Text>
              <TextInput
                style={globalStyles.input}
                value={item.price}
                onChangeText={(value) => handleInputChange(index, "price", value)}
                keyboardType="numeric"
              />
              <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>{t("text.reviseReceipt.amount")}:</Text>
              <TextInput
                style={globalStyles.input}
                value={item.amount}
                onChangeText={(value) => handleInputChange(index, "amount", value)}
                keyboardType="numeric"
              />
              <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>{t("text.reviseReceipt.cost")}:</Text>
              <TextInput
                style={globalStyles.input}
                value={item.cost}
                onChangeText={(value) => handleInputChange(index, "cost", value)}
                keyboardType="numeric"
              />
              <View style={styles.buttonContainer}>
                <Button theme={theme} onPress={handleAccept}>
                  {t("buttonLabels.reviseReceipt.accept")}
                </Button>
                <Button theme={theme} onPress={() => handleDelete(index)}>
                  {t("buttonLabels.reviseReceipt.delete")}
                </Button>
              </View>
            </>
          ) : (
            <>
              <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>
                {t("text.reviseReceipt.productName")}: {item.product_name}
              </Text>
              <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>
                {t("text.reviseReceipt.unitOfMeasurement")}: {item.unit}
              </Text>
              <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>
                {t("text.reviseReceipt.price")}: {item.price}
              </Text>
              <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>
                {t("text.reviseReceipt.amount")}: {item.amount}
              </Text>
              <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>
                {t("text.reviseReceipt.cost")}: {item.cost}
              </Text>
              <Button style={styles.button} theme={theme} onPress={() => setEditMode(index)}>
                {t("buttonLabels.reviseReceipt.edit")}
              </Button>
            </>
          )}
        </View>
      ))}
      <View style={styles.buttonView}>
        <Button theme={theme} onPress={handleAddProduct}>
          {t("buttonLabels.reviseReceipt.addProduct")}
        </Button>
        <Button style={styles.button} theme={theme} onPress={handleSave}>
          {t("buttonLabels.reviseReceipt.saveChanges")}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultMarginBottom: {
    marginBottom: 10,
  },
  defaultMarginTop: {
    marginTop: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colorDark.textColor,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonView: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
  },
  errorContainer: {
    marginTop: 10,
  },
});

export default GoodsList;
