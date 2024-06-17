import React, { useState } from "react";
import { type Theme } from "@/store";
import { ScrollView, StyleSheet, View } from "react-native";
import { t } from "i18next";
import { fetchHistory } from "@/store/api";
import { type History } from "@/components/receipt/receipt.type";
import { formatDate, getPeriodDates } from "@/utils";
import { Button } from "@/components/ui";
import HistoryDatePicker from "./history-datepicker";
import { MessForm } from "@/components/mess-form";
export function HistoryButton({
  setIsLoading,
  isLoading,
  setHistoryData,
  userId,
  theme,
}: {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setHistoryData: React.Dispatch<React.SetStateAction<History[] | null>>;
  userId: number | null;
  theme: Theme;
}) {
  const [isDatePicker, setIsDatePicker] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [error, setError] = useState<string | null>(null);

  const handleFetchHistory = async (period: "week" | "month" | "halfYear" | "year" | "twoYears") => {
    const { fromDate, toDate } = getPeriodDates(period);
    if (userId) {
      setIsLoading(true);

      try {
        const data = await fetchHistory(fromDate, toDate, userId);
        setHistoryData(data);
      } catch (error) {
        setError(t("defaultMessage.defaultError"));
      } finally {
        setIsLoading(false);
      }
    }
    setIsLoading(false);
  };

  const handleCustomDateSubmit = async () => {
    if (userId) {
      setIsLoading(true);

      try {
        const data = await fetchHistory(formatDate(startDate), formatDate(endDate), userId);
        setHistoryData(data);
      } catch (error) {
        setError(t("defaultMessage.defaultError"));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isDatePicker ? (
        <>
          <HistoryDatePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            theme={theme}
            setError={setError}
          />
          <Button
            theme={theme}
            style={[styles.button, { marginBottom: 10 }]}
            onPress={() => {
              handleCustomDateSubmit();
              setError(null);
            }}
          >
            {t("buttonLabels.reviseReceipt.submitCustomDate")}
          </Button>
        </>
      ) : (
        <ScrollView horizontal={true} style={styles.buttonContainer} showsHorizontalScrollIndicator={false}>
          <Button theme={theme} style={styles.button} onPress={() => handleFetchHistory("week")}>
            {t("buttonLabels.reviseReceipt.week")}
          </Button>
          <Button theme={theme} style={styles.button} onPress={() => handleFetchHistory("month")}>
            {t("buttonLabels.reviseReceipt.month")}
          </Button>
          <Button theme={theme} style={styles.button} onPress={() => handleFetchHistory("halfYear")}>
            {t("buttonLabels.reviseReceipt.halfYear")}
          </Button>
          <Button theme={theme} style={styles.button} onPress={() => handleFetchHistory("year")}>
            {t("buttonLabels.reviseReceipt.year")}
          </Button>
          <Button theme={theme} style={styles.button} onPress={() => handleFetchHistory("twoYears")}>
            {t("buttonLabels.reviseReceipt.twoYears")}
          </Button>
        </ScrollView>
      )}
      <Button
        theme={theme}
        style={styles.button}
        onPress={() => {
          setIsDatePicker(!isDatePicker);
          setError(null);
        }}
      >
        {isDatePicker ? t("buttonLabels.reviseReceipt.selectPeriod") : t("buttonLabels.reviseReceipt.selectYourDate")}
      </Button>
      {error && !isLoading && (
        <View style={styles.error}>
          <MessForm message={{ defaultAxios: error }} status={"error"} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
  },
  button: {
    marginRight: 10,
    minWidth: 150,
  },
  error: {
    marginTop: 10,
  },
});

export default HistoryButton;
