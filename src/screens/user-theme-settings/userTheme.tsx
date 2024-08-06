import { Text, View } from "react-native";
import { type Theme } from "@/store";
import { BackButton, Layout, ThemeToggleButtons } from "@/components";
import { fontsStyles, globalStyles } from "@/styles";
import { t } from "i18next";

export function UserTheme({ theme }: { theme: Theme }) {
  return (
    <Layout theme={theme}>
      <View style={globalStyles.container}>
        <View>
          <Text style={[fontsStyles.subtitle, fontsStyles.defaultColor]}>{t("buttonLabels.themeSettings")}</Text>
          <BackButton theme={theme} />
        </View>
        <ThemeToggleButtons theme={theme} />
      </View>
    </Layout>
  );
}

export default UserTheme;
