import { Text } from "react-native";
import { Theme } from "@/store";
import { Button, Layout } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { t } from "i18next";
import { colorDark, fontsStyles } from "@/styles";

export function Settings({ theme }: { theme: Theme }) {
  const navigation = useNavigation();
  return (
    <Layout theme={theme}>
      <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>{t("screensName.settings")}</Text>
      <Button theme={theme} onPress={() => navigation.navigate("UserTheme" as never)}>
        <Text>{t("buttonLabels.themeSettings")}</Text>
      </Button>
    </Layout>
  );
}

export default Settings;
