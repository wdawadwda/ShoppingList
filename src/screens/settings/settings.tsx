import { Text } from "react-native";
import { Theme } from "@/store";
import { Button, Layout } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { colorDark, fontsStyles } from "@/styles";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import { type MainNavigationProp } from "@/navigation";

export function Settings({ theme }: { theme: Theme }) {
  const user = useSelector(selectUser);
  const navigation = useNavigation<MainNavigationProp>();

  return (
    <Layout theme={theme}>
      <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>{t("screensName.settings")}</Text>
      {user ? (
        <>
          <Text style={[fontsStyles.text, { color: colorDark.textColor, marginBottom: 10 }]}>
            {t("screensName.settingsAdditional.theme")}:
          </Text>

          <Button theme={theme} onPress={() => navigation.navigate("UserTheme")}>
            <Text>{t("buttonLabels.themeSettings")}</Text>
          </Button>
          <Text style={[fontsStyles.text, { color: colorDark.textColor, marginBottom: 10, marginTop: 25 }]}>
            {t("screensName.settingsAdditional.customProduct")}:
          </Text>

          <Button theme={theme} onPress={() => navigation.navigate("AddCustomProduct")}>
            <Text>{t("buttonLabels.addCustomProduct")}</Text>
          </Button>
          <Button style={{ marginTop: 10 }} theme={theme} onPress={() => navigation.navigate("DellEditCustomProduct")}>
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

export default Settings;
