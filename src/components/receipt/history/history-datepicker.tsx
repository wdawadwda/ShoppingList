import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import DateTimePicker, { type DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { type Theme } from "@/store";
import { Button } from "@/components/ui";
import { formatDate } from "@/utils";
import { colorDark, fontsStyles } from "@/styles";
import { t } from "i18next";

const HistoryDatePicker = ({
  startDate,
  endDate,
  setError,
  setStartDate,
  setEndDate,
  theme,
}: {
  startDate: Date;
  endDate: Date;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate: React.Dispatch<React.SetStateAction<Date>>;
  theme: Theme;
}) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const startDateOnChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartDatePicker(false);
    setStartDate(currentDate);
  };

  const endDateOnChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndDatePicker(false);
    setEndDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <Button
          style={styles.button}
          theme={theme}
          onPress={() => {
            setShowStartDatePicker(true);
            setError(null);
          }}
        >
          {t("buttonLabels.reviseReceipt.startDate")}
        </Button>
        <Button
          theme={theme}
          onPress={() => {
            setShowEndDatePicker(true);
            setError(null);
          }}
        >
          {t("buttonLabels.reviseReceipt.endDate")}
        </Button>
      </ScrollView>
      {showStartDatePicker && (
        <DateTimePicker
          testID="startDatePicker"
          value={startDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={startDateOnChange}
        />
      )}
      {showEndDatePicker && (
        <DateTimePicker
          testID="endDatePicker"
          value={endDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={endDateOnChange}
        />
      )}
      <Text style={[fontsStyles.text, styles.text]}>
        {t("buttonLabels.reviseReceipt.startDate")}: {formatDate(startDate)} {"\n"}
        {"\n"}
        {t("buttonLabels.reviseReceipt.endDate")}: {formatDate(endDate)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { marginTop: 20, marginBottom: 20, color: colorDark.textColor },
  button: { marginRight: 10 },
});

export default HistoryDatePicker;
