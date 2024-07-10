import { AddCustomPr, BackButton, Layout } from "@/components";
import { type Theme } from "@/store";
import { colorDark, fontsStyles } from "@/styles";
import { t } from "i18next";
import { Text } from "react-native";

export const AddCustomProduct = ({ theme }: { theme: Theme }) => {
  return (
    <Layout theme={theme}>
      <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>{t("text.addCustomProduct.title")}</Text>
      <BackButton theme={theme} />
      <AddCustomPr isScreen={true} theme={theme} />
    </Layout>
  );
};

export default AddCustomProduct;
