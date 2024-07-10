import { Layout } from "@/components";
import { Search } from "@/components/list/list-add-product/search";
import { type Language } from "@/constants/products-lists/products-lists.type";
import i18n from "@/i118/i18n";
import { type Theme } from "@/store";
import { colorDark, fontsStyles } from "@/styles";
import { t } from "i18next";
import { Text } from "react-native";

export const DellEditCustomProduct = ({ theme }: { theme: Theme }) => {
  const language = i18n.language as Language;
  return (
    <Layout theme={theme}>
      <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>{t("text.dellEdit.title")}</Text>
      <Search theme={theme} type="custom" language={language} />
    </Layout>
  );
};

export default DellEditCustomProduct;
