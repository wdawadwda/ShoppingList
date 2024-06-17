import React, { useState } from "react";
import { BackButton, HistoryButton, HistoryList, Layout, Loader } from "@/components";
import { Theme } from "@/store";
import { globalStyles } from "@/styles";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import { type History } from "@/components/receipt/receipt.type";

export function HistoryResipt({ theme }: { theme: Theme }) {
  const user = useSelector(selectUser);
  const userId = user?.id || null;

  const [historyData, setHistoryData] = useState<History[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Layout theme={theme}>
      <View style={(globalStyles.container, styles.container)}>
        <BackButton theme={theme} />
        <HistoryButton
          theme={theme}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setHistoryData={setHistoryData}
          userId={userId}
        />
        {isLoading ? <Loader theme={theme} size={50} /> : <HistoryList historyData={historyData} />}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 10 },
});

export default HistoryResipt;
