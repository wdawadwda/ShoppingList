import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { t } from "i18next";
import { type History } from "@/components/receipt/receipt.type";
import { formatDate } from "@/utils";
import { colorDark, fontsStyles } from "@/styles";
import { Button } from "@/components/ui";
import { type Theme } from "@/store";
import { deleteBillHistoryItem } from "@/store/api";
import { useNavigation } from "@react-navigation/native";
import { MessForm } from "@/components/mess-form";
import { type MainNavigationProp } from "@/navigation";

export function HistoryList({ historyData, theme }: { historyData: History[] | null; theme: Theme }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ id: string | number; error: string } | null>(null);

  const navigation = useNavigation<MainNavigationProp>();
  const handleDeleteItem = (itemId: string | number) => {
    setError(null);
    Alert.alert(
      t("text.reviseReceipt.deleteReceipt"),
      t("text.reviseReceipt.confirmDelete"),
      [
        {
          text: t("buttonLabels.cancel"),
          style: "cancel",
          onPress: () => {},
        },
        {
          text: t("buttonLabels.delete"),
          onPress: () => {
            deleteItem(itemId);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const deleteItem = async (itemId: string | number) => {
    try {
      setIsLoading(true);
      const deletedSuccessfully = await deleteBillHistoryItem(itemId);
      if (deletedSuccessfully) {
        navigation.navigate("Receipt");
      }
    } catch (error) {
      setError({ id: itemId, error: t("defaultMessage.errorReceipt") });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View>
      {historyData && historyData.length > 0 ? (
        historyData
          .filter((item) => item.bill_text && item.bill_text.length > 0)
          .map((item) => (
            <View key={item.id}>
              <Text style={[fontsStyles.subtitle, { color: colorDark.textColor, marginTop: 30 }]}>
                {formatDate(new Date(item.date))}
              </Text>
              {item.bill_text.map((billItem, index) => (
                <View key={index} style={styles.billItemContainer}>
                  <Text style={[fontsStyles.text, styles.text]}>
                    {t("text.reviseReceipt.productName")}: {billItem?.product_name}
                  </Text>
                  <Text style={[fontsStyles.text, styles.text]}>
                    {t("text.reviseReceipt.price")}: {billItem?.price}
                  </Text>
                  <Text style={[fontsStyles.text, styles.text]}>
                    {t("text.reviseReceipt.amount")}: {billItem?.amount} {billItem?.unit}
                  </Text>
                  <Text style={[fontsStyles.text, styles.text]}>
                    {t("text.reviseReceipt.cost")}: {billItem?.cost}
                  </Text>
                </View>
              ))}
              <Button
                isLoading={isLoading}
                disabled={isLoading}
                buttonColorVar="backgroundAlert"
                style={{ marginTop: 5 }}
                theme={theme}
                onPress={() => handleDeleteItem(item.id)}
              >
                Удалить чек
              </Button>
              {error && error.id === item.id && !isLoading && (
                <View style={styles.error}>
                  <MessForm message={{ defaultAxios: error.error }} status={"error"} />
                </View>
              )}
            </View>
          ))
      ) : historyData && historyData.length === 0 ? (
        <Text style={[fontsStyles.text, styles.text2]}>{t("text.reviseReceipt.noData")}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colorDark.textColor,
    marginBottom: 5,
  },
  billItemContainer: {
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: colorDark.textColor,
  },
  text2: {
    color: colorDark.textColor,
    textAlign: "center",
    marginTop: 10,
  },
  error: {
    marginTop: 5,
  },
});

export default HistoryList;
