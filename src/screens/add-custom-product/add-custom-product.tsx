import { AddCustomPr, Layout } from "@/components";
import { type Theme } from "@/store";
import { t } from "i18next";
import { Text } from "react-native";

export const AddCustomProduct = ({ theme }: { theme: Theme }) => {
  return (
    <Layout theme={theme}>
      <Text>{t("text.addCustomProduct.title")}</Text>
      <AddCustomPr theme={theme} />
    </Layout>
  );
};

export default AddCustomProduct;
