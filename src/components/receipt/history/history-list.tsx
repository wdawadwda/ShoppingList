import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { t } from "i18next";
import { type History } from "@/components/receipt/receipt.type";
import { formatDate } from "@/utils";
import { colorDark, fontsStyles } from "@/styles";

export function HistoryList({ historyData }: { historyData: History[] | null }) {
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
                    {t("text.reviseReceipt.productName")}: {billItem.product_name}
                  </Text>
                  <Text style={[fontsStyles.text, styles.text]}>
                    {t("text.reviseReceipt.price")}: {billItem.price} {billItem.unit}
                  </Text>
                  <Text style={[fontsStyles.text, styles.text]}>
                    {t("text.reviseReceipt.amount")}: {billItem.amount} {billItem.unit}
                  </Text>
                  <Text style={[fontsStyles.text, styles.text]}>
                    {t("text.reviseReceipt.cost")}: {billItem.cost}
                  </Text>
                </View>
              ))}
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
});

export default HistoryList;
