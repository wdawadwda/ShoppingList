import { t } from "i18next";
import { FormField } from "./register-auth.type";
import { ProductCustom } from "@/constants";

export const useConst = (product: ProductCustom) => {
  const formFields: FormField[] = [
    {
      name: "nameRu",
      label: `${t("text.customProduct.labels.name")} (ru)`,
      placeholder: product.name.ru,
      keyboardType: "default",
      maxLength: 10,
    },
    {
      name: "nameEn",
      label: `${t("text.customProduct.labels.name")} (en)`,
      placeholder: product.name.en,
      keyboardType: "default",
      maxLength: 10,
    },
    {
      name: "categoryRu",
      label: `${t("text.customProduct.labels.category")} (ru)`,
      placeholder: product.category.ru,
      keyboardType: "default",
      maxLength: 10,
    },
    {
      name: "categoryEn",
      label: `${t("text.customProduct.labels.category")} (en)`,
      placeholder: product.category.en,
      keyboardType: "default",
      maxLength: 10,
    },
  ];

  return { formFields };
};
