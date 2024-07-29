import { StyleSheet, Text } from "react-native";
import { Theme } from "@/store";
import { Button, Layout } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { fontsStyles } from "@/styles";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import { type MainNavigationProp } from "@/navigation";

export function Settings({ theme }: { theme: Theme }) {
  const user = useSelector(selectUser);
  const navigation = useNavigation<MainNavigationProp>();

  return (
    <Layout theme={theme}>
      <Text style={[fontsStyles.subtitle, fontsStyles.defaultColor]}>{t("screensName.settings")}</Text>
      {user ? (
        <>
          <Text style={[fontsStyles.text, fontsStyles.defaultColor, styles.marginForELements]}>
            {t("screensName.settingsAdditional.theme")}:
          </Text>

          <Button theme={theme} onPress={() => navigation.navigate("UserTheme")}>
            <Text>{t("buttonLabels.themeSettings")}</Text>
          </Button>
          <Text style={[fontsStyles.text, fontsStyles.defaultColor, styles.marginForELements, styles.marginForChapter]}>
            {t("screensName.settingsAdditional.customProduct")}:
          </Text>

          <Button
            style={styles.marginForELements}
            theme={theme}
            onPress={() => navigation.navigate("AddCustomProduct")}
          >
            <Text>{t("buttonLabels.addCustomProduct")}</Text>
          </Button>
          <Button theme={theme} onPress={() => navigation.navigate("DellEditCustomProduct")}>
            <Text>{t("buttonLabels.dellEdit")}</Text>
          </Button>
        </>
      ) : (
        <Button theme={theme} onPress={() => navigation.navigate("RegAuth")}>
          <Text>{t("buttonLabels.regAuth.pleaseAuthorize")}</Text>
        </Button>
      )}
    </Layout>
  );
}
const styles = StyleSheet.create({
  marginForELements: {
    marginBottom: 10,
  },
  marginForChapter: { marginTop: 25 },
});

export default Settings;
