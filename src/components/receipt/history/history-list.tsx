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
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import { ErrorObject, Language } from "@/constants";
import i18n from "@/i118/i18n";

export function HistoryList({ historyData, theme }: { historyData: History[] | null; theme: Theme }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<{ id: string | number; error: string } | null>(null);
  const user = useSelector(selectUser);

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
    if (user && user.id) {
      try {
        setIsLoading(true);
        const deletedSuccessfully = await deleteBillHistoryItem(itemId, user.id);
        if (deletedSuccessfully) {
          navigation.navigate("Receipt");
        }
      } catch (error) {
        const err = error as ErrorObject;
        let errorMessage = null;
        if (typeof err.detail === "object" && (i18n?.language as keyof typeof err.detail)) {
          errorMessage = err.detail[i18n.language as Language] || t("defaultMessage.defaultError");
        } else {
          errorMessage =
            typeof err.detail === "string" && err.detail !== "" ? err.detail : t("defaultMessage.defaultError");
        }
        setError({ id: itemId, error: errorMessage });
      } finally {
        setIsLoading(false);
      }
    } else {
      setError({ id: itemId, error: t("defaultMessage.errorReceipt") });
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
                style={styles.defaultMargin}
                theme={theme}
                onPress={() => handleDeleteItem(item.id)}
              >
                {t("text.receipts.deleteReceipt")}
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
  defaultMargin: {
    marginBottom: 10,
    marginTop: 10,
  },
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
