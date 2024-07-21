import { ScrollView, View } from "react-native";

import { getUserTabs } from "./list-add-profuct.utils";
import { SliderWithButtons, useTabs } from "@/components/tabs";
import { darkStyles, globalStyles, lightStyles } from "@/styles";
import { renderTabContent } from "./render-tab-content";
import { BackButton } from "@/components/ui";
import { type ListAddProductProps } from "@/constants";

export const ListAddProduct = ({
  setshowInputAdd,
  language,
  setProductData,
  productData,
  theme,
}: ListAddProductProps) => {
  const { tabs, t } = getUserTabs();
  const { activeTab, handleTabClick } = useTabs<string | null>(null);
  const content = renderTabContent({
    activeTab,
    t,
    theme,
    setshowInputAdd,
    language,
    setProductData,
    productData,
  });

  return (
    <ScrollView style={[theme === "dark" ? darkStyles.container : lightStyles.container, globalStyles.container]}>
      <BackButton theme={theme} onPress={() => setshowInputAdd(false)} />
      <SliderWithButtons
        theme={theme}
        activeTab={activeTab}
        tabs={tabs}
        handleTabClick={handleTabClick}
        center={true}
        fixedWidth={true}
      />
      <View style={{ marginTop: 15 }}>{content && content.type === "content" && content.component}</View>
    </ScrollView>
  );
};

export default ListAddProduct;
