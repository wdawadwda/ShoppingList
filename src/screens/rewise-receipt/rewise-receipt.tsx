import React from "react";
import { Button, Layout } from "@/components";
import { Theme } from "@/store";
import { colorDark, fontsStyles, globalStyles } from "@/styles";
import { Text, View } from "react-native";
import { t } from "i18next";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";

export function Resipt({ theme }: { theme: Theme }) {
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  return (
    <Layout theme={theme}>
      <View style={globalStyles.container}>
        <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>{t("tabsLabels.receipts")}</Text>
        {user ? (
          <>
            <Button
              theme={theme}
              style={{ marginBottom: 10 }}
              onPress={() => navigation.navigate("PhotoResipt" as never)}
            >
              {t("buttonLabels.reviseReceipt.add")}
            </Button>
            <Button theme={theme} onPress={() => navigation.navigate("HistoryResipt" as never)}>
              {t("buttonLabels.reviseReceipt.history")}
            </Button>
          </>
        ) : (
          <Button
            theme={theme}
            onPress={() => navigation.navigate("RegAuth" as never)}
          >{`${t("buttonLabels.regAuth.login")} / ${t("buttonLabels.regAuth.register")}`}</Button>
        )}
      </View>
    </Layout>
  );
}

export default Resipt;
