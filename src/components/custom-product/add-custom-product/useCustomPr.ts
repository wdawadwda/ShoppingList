import { useForm } from "react-hook-form";
import { AddCustomPrForm } from "./add-custom-pr.type";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { t } from "i18next";
import { ProductInList } from "@/constants";

export const useCustomForm = (language: "en" | "ru") => {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<AddCustomPrForm>({
    mode: "onChange",
    defaultValues: {
      name: { en: "", ru: "" },
      category: { en: "", ru: "" },
      quantity: "",
      svgKey: "",
      isPushed: false,
    },
    resolver: yupResolver(
      yup.object().shape({
        name: yup.object().shape({
          en:
            language === "en"
              ? yup
                  .string()
                  .required(t("validation.customProduct.isReq", { lang: "EN", type: "name" }))
                  .max(25, t("validation.customProduct.exceedCharacters", { type: "Name", max: "25" }))
              : yup.string().max(25, t("validation.customProduct.exceedCharacters", { type: "Name", max: "25" })),
          ru:
            language === "ru"
              ? yup
                  .string()
                  .required(t("validation.customProduct.isReq", { lang: "RU", type: "название" }))
                  .max(25, t("validation.customProduct.exceedCharacters", { type: "Название", max: "25" }))
              : yup.string().max(25, t("validation.customProduct.exceedCharacters", { type: "Название", max: "25" })),
        }),
        category: yup.object().shape({
          en:
            language === "en"
              ? yup
                  .string()
                  .required(t("validation.customProduct.isReq", { lang: "EN", type: "category" }))
                  .max(25, t("validation.customProduct.exceedCharacters", { type: "Сategory", max: "25" }))
              : yup.string().max(25, t("validation.customProduct.exceedCharacters", { type: "Сategory", max: "25" })),
          ru:
            language === "ru"
              ? yup
                  .string()
                  .required(t("validation.customProduct.isReq", { lang: "RU", type: "категория" }))
                  .max(25, t("validation.customProduct.exceedCharacters", { type: "Категория", max: "25" }))
              : yup.string().max(25, t("validation.customProduct.exceedCharacters", { type: "Категория", max: "25" })),
        }),
        quantity: yup.string().defined(),
        svgKey: yup.string().defined(),
        isPushed: yup.boolean().defined(),
      }),
    ),
  });

  const synchronizeFields = (data: AddCustomPrForm) => {
    const syncField = (field: "name" | "category") => {
      if (data[field].en && !data[field].ru) {
        data[field].ru = data[field].en;
      } else if (data[field].ru && !data[field].en) {
        data[field].en = data[field].ru;
      }
    };

    syncField("name");
    syncField("category");

    return data as ProductInList;
  };

  return {
    control,
    handleSubmit,
    setValue,
    reset,
    errors,
    isValid,
    synchronizeFields,
  };
};

export default useCustomForm;
