import { BackButton, Button, InputForm } from "@/components/ui";
import { type Theme } from "@/store";
import { StyleSheet, Text } from "react-native";
import { useConst } from "./use/useConst";
import { ErrorObject, ProductCustom } from "@/constants";
import { type Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { UpdateingProductInList } from "@/constants/products-lists/products-lists.type";
import { type Dispatch, useState } from "react";
import AddSvgKey from "../add-custom-product/add-svg-key";
import { svgSchemeForAdding } from "@/constants/products-lists/svg-scheme";
import { t } from "i18next";
import { fetchCustompProducts, patchCustomProduct } from "@/store/api";
import { type AppDispatch } from "@/store/store.types";
import { MainNavigationProp } from "@/navigation";
import i18n from "@/i118/i18n";

interface FormData {
  nameRu?: string;
  nameEn?: string;
  categoryRu?: string;
  categoryEn?: string;
}

const schema = yup.object().shape({
  nameRu: yup.string().optional(),
  nameEn: yup.string().optional(),
  categoryRu: yup.string().optional(),
  categoryEn: yup.string().optional(),
});

export const EditForm = ({
  theme,
  customProduct,
  isLoading,
  setIsEddit,
  setError,
  setIsLoading,
  dispatch,
  navigation,
}: {
  theme: Theme;
  customProduct: ProductCustom;
  isLoading: boolean;
  setIsEddit: Dispatch<boolean>;
  setError: Dispatch<string | null>;
  setIsLoading: Dispatch<boolean>;
  dispatch: AppDispatch;
  navigation: MainNavigationProp;
}) => {
  const [showAddImageText, setShowAddImageText] = useState(false);
  const [currentSvgKey, setCurrentSvgKey] = useState(customProduct.svgKey || "");

  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      nameRu: "",
      nameEn: "",
      categoryRu: "",
      categoryEn: "",
    },
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { formFields } = useConst(customProduct);

  const onSubmit = async (formData: FormData) => {
    setIsLoading(true);
    const updatedProduct: UpdateingProductInList = {
      svgKey: currentSvgKey,
    };

    if (formData.categoryRu !== undefined && formData.categoryRu !== "") {
      updatedProduct.category = {
        ru: formData.categoryRu,
      };
    }

    if (formData.categoryEn !== undefined && formData.categoryEn !== "") {
      updatedProduct.category = {
        ...updatedProduct.category,
        en: formData.categoryEn,
      };
    }

    if (formData.nameRu !== undefined && formData.nameRu !== "") {
      updatedProduct.name = {
        ru: formData.nameRu,
      };
    }

    if (formData.nameEn !== undefined && formData.nameEn !== "") {
      updatedProduct.name = {
        ...updatedProduct.name,
        en: formData.nameEn,
      };
    }
    try {
      await patchCustomProduct(customProduct.id, customProduct.user, updatedProduct);
      dispatch(fetchCustompProducts(customProduct.user));
      navigation.navigate("Settings");
    } catch (error) {
      const err = error as ErrorObject;
      if (err && typeof err.detail === "object" && "ru" in err.detail && "en" in err.detail) {
        const detail = err.detail as { [key: string]: string };
        if (detail[i18n.language]) {
          setError(detail[i18n.language]);
        } else {
          setError(t("defaultMessage.defaultError"));
        }
      } else {
        setError(t("defaultMessage.defaultError"));
      }
    } finally {
      setIsEddit(false);
      setIsLoading(false);
    }
  };

  const handleSvgKeySelect = (svgKey: string) => {
    setCurrentSvgKey(svgKey);
    setShowAddImageText(false);
  };

  return (
    <>
      <BackButton onPress={() => setIsEddit(false)} theme={theme} />

      <InputForm formFields={formFields} formState={formState} theme={theme} control={control as unknown as Control} />
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        style={styles.button}
        theme={theme}
        onPress={handleSubmit(onSubmit)}
      >
        <Text>{t("defaultMessage.send")}</Text>
      </Button>
      {!showAddImageText &&
        (currentSvgKey ? (
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            style={styles.button}
            theme={theme}
            onPress={() => setShowAddImageText(true)}
          >
            {svgSchemeForAdding[currentSvgKey]}
          </Button>
        ) : (
          <Button
            isLoading={isLoading}
            disabled={isLoading}
            style={styles.button}
            theme={theme}
            onPress={() => setShowAddImageText(true)}
          >
            {t("text.customProduct.addImage")}
          </Button>
        ))}
      {showAddImageText && <AddSvgKey onSelectSvgKey={handleSvgKeySelect} theme={theme} />}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
});

export default EditForm;
