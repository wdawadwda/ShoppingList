import React, { useEffect } from "react";
import { BackButton, Layout, SliderWithButtons, useTabs } from "@/components";
import { Theme } from "@/store";
import { darkStyles, fontsStyles, globalStyles, lightStyles } from "@/styles";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { useCameraPermissions } from "expo-camera";
import { getResiptTabs } from "./photo-receipt.utils";
import { renderTabContent } from "./render-tab-content";
import { selectUser } from "@/store/user";
import { useSelector } from "react-redux";

export function PhotoResipt({ theme }: { theme: Theme }) {
  const user = useSelector(selectUser);
  const userId = user?.id.toString() || null;
  const [permission, requestPermission] = useCameraPermissions();
  const { tabs, t } = getResiptTabs();
  const { activeTab, handleTabClick } = useTabs<string | null>(null);
  const content = renderTabContent({ activeTab, t, theme, userId });

  useEffect(() => {
    requestPermission();
  }, []);

  if (!permission) {
    return (
      <Layout theme={theme}>
        <BackButton theme={theme} />
        <View style={globalStyles.container} />
      </Layout>
    );
  }

  if (!permission.granted) {
    return (
      <Layout theme={theme}>
        <BackButton theme={theme} />

        <View style={globalStyles.container}>
          <Text style={[fontsStyles.text, fontsStyles.defaultColor, style.textAdditional]}>
            {t("permission.receipt")}
          </Text>
        </View>
      </Layout>
    );
  }

  return (
    <Layout theme={theme}>
      <BackButton theme={theme} />

      <View style={globalStyles.container}>
        <ScrollView style={[theme === "dark" ? darkStyles.container : lightStyles.container, globalStyles.container]}>
          <SliderWithButtons
            theme={theme}
            activeTab={activeTab}
            tabs={tabs}
            handleTabClick={handleTabClick}
            center={false}
            fixedWidth={true}
            fixedWidthWidth={250}
          />
          {content && content.type === "content" && content.component}
        </ScrollView>
      </View>
    </Layout>
  );
}

const style = StyleSheet.create({
  textAdditional: { textAlign: "center", marginBottom: 10 },
});

export default PhotoResipt;
