import { ScrollView } from "react-native";

import { renderTabContent } from "./render-tab-content";
import { getUserTabs } from "./reg-auth.utils";
import { Theme } from "@/store";
import { useTabs } from "@/components/tabs/use-tabs";
import { darkStyles, globalStyles, lightStyles } from "@/styles";
import { BackButton, Layout } from "@/components";
import { SliderWithButtons } from "@/components/tabs/tabs";

export function RegAuth({ theme }: { theme: Theme }) {
  const { tabs, t } = getUserTabs();
  const { activeTab, handleTabClick } = useTabs<string | null>(null);
  const content = renderTabContent({ activeTab, t, theme });

  return (
    <Layout theme={theme}>
      <BackButton theme={theme} />
      <ScrollView style={[theme === "dark" ? darkStyles.container : lightStyles.container, globalStyles.container]}>
        <SliderWithButtons
          theme={theme}
          activeTab={activeTab}
          tabs={tabs}
          handleTabClick={handleTabClick}
          center={true}
          fixedWidth={true}
        />
        {content && content.type === "content" && content.component}
      </ScrollView>
    </Layout>
  );
}

export default RegAuth;
