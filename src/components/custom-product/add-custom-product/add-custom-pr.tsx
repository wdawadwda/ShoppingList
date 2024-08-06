import { type ProductsListData, type ProductCustom } from "@/constants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";
import AddSvgKey from "./add-svg-key";
import { Controller } from "react-hook-form";
import { type AddCustomPrProps, type AddCustomPrForm } from "./add-custom-pr.type";

import { svgSchemeForAdding } from "@/constants/products-lists/svg-scheme";
import { createCustomProduct } from "@/store/api";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import useCustomForm from "./useCustomPr";
import { t } from "i18next";
import { colorDark, darkStyles, fontsStyles, globalStyles } from "@/styles";
import { useNavigation } from "@react-navigation/native";
import { MessForm } from "@/components/mess-form";
import { Button } from "@/components/ui";
import { customProductsActions, useAppDispatch } from "@/store";
import { selectСustomProductError, selectСustomProductStatus } from "@/store";

const ErrorMessage = ({ error }: { error: string | undefined }) =>
  error ? (
    <View style={[darkStyles.containerAlert, globalStyles.containerAlert]}>
      <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{error}</Text>
    </View>
  ) : null;

export const AddCustomPr = ({ setshowInputAdd, setProductData, theme, productData, isScreen }: AddCustomPrProps) => {
  const { i18n } = useTranslation();
  const [showSecondLanguage, setShowSecondLanguage] = useState(false);
  const [showAddImageText, setShowAddImageText] = useState(false);
  const [currentSvgKey, setCurrentSvgKey] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [synchronizedData, setSynchronizedData] = useState<AddCustomPrForm | null>(null);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const customProductError = useSelector(selectСustomProductError);
  const customProductStatus = useSelector(selectСustomProductStatus);
  const isLoading = !!(customProductStatus === "loading");

  const user = useSelector(selectUser);

  const { control, handleSubmit, setValue, reset, errors, isValid, synchronizeFields } = useCustomForm(
    i18n.language as "en" | "ru",
  );

  const primaryLang = i18n.language as "en" | "ru";
  const secondaryLang = primaryLang === "en" ? "ru" : "en";

  const handleAddProduct = (prData: ProductsListData) => {
    if (synchronizedData && setProductData && setshowInputAdd) {
      const productWithQuantity = { ...synchronizedData, quantity };
      const newData = {
        ...prData,
        products: [...prData.products, productWithQuantity],
      };

      setProductData(newData as ProductsListData);

      setSynchronizedData(null);
      setQuantity("");
      setshowInputAdd(false);
    }
  };

  const onSubmit = async (data: AddCustomPrForm) => {
    if (user?.id) {
      const synchronizedData = synchronizeFields(data);
      const product: Omit<ProductCustom, "id"> = {
        ...synchronizedData,
        user: user.id,
      };

      const resultAction = await dispatch(createCustomProduct(product));

      if (createCustomProduct.fulfilled.match(resultAction)) {
        if (isScreen) {
          navigation.goBack();
        } else {
          setSynchronizedData(synchronizedData);
        }
      }
    }
  };

  const handleSvgKeySelect = (svgKey: string) => {
    setValue("svgKey", svgKey);
    setCurrentSvgKey(svgKey);
    setShowAddImageText(false);
  };

  useEffect(() => {
    reset();
    setCurrentSvgKey(null);
  }, [primaryLang, customProductError]);

  useEffect(() => {
    dispatch(customProductsActions.resetCreateCustomProduct());

    return () => {
      dispatch(customProductsActions.resetCreateCustomProduct());
    };
  }, []);

  const renderInputs = (lang: "en" | "ru") => (
    <>
      <Text style={[fontsStyles.text2, fontsStyles.defaultColor]}>
        <Text>{`${t("text.customProduct.labels.name")} (${lang})`}</Text>
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            maxLength={10}
            style={globalStyles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={`${t("text.customProduct.labels.namePlasholder")} ${
              lang === "en" ? `${t("languages.en", { end: "ом" })}` : `${t("languages.ru", { end: "ом" })}`
            }`}
          />
        )}
        name={`name.${lang}`}
      />
      <ErrorMessage error={errors.name?.[lang]?.message} />

      <Text
        style={[fontsStyles.text2, fontsStyles.defaultColor]}
      >{`${t("text.customProduct.labels.category")} (${lang})`}</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            maxLength={10}
            style={globalStyles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={`${t("text.customProduct.labels.categoryPlasholder")} ${
              lang === "en" ? `${t("languages.en", { end: "ом" })}` : `${t("languages.ru", { end: "ом" })}`
            }`}
          />
        )}
        name={`category.${lang}`}
      />
      <ErrorMessage error={errors.category?.[lang]?.message} />
    </>
  );

  return (
    <>
      {customProductError && (
        <View>
          <MessForm
            message={{
              detail:
                typeof customProductError.detail === "object"
                  ? customProductError?.detail?.[primaryLang] || customProductError?.message
                  : customProductError?.detail || customProductError?.message,
            }}
            status="error"
          />
        </View>
      )}
      {synchronizedData && !isLoading ? (
        <>
          <TextInput
            style={globalStyles.input}
            placeholder={t("defaultMessage.enterQuantity")}
            value={quantity}
            maxLength={7}
            onChangeText={setQuantity}
          />
          {productData && (
            <Button theme={theme} onPress={() => handleAddProduct(productData)}>
              {t("defaultMessage.confirm")}
            </Button>
          )}
        </>
      ) : (
        <View style={styles.container}>
          {renderInputs(primaryLang)}
          {showAddImageText && <AddSvgKey onSelectSvgKey={handleSvgKeySelect} theme={theme} />}

          {!showSecondLanguage && (
            <Button style={styles.button} onPress={() => setShowSecondLanguage(true)} theme={theme}>
              {t("buttonLabels.addCustomProductBtn.addNames", { lang: secondaryLang })}
            </Button>
          )}
          {showSecondLanguage && renderInputs(secondaryLang)}

          <Button
            style={styles.button}
            isLoading={isLoading}
            onPress={handleSubmit((data) => onSubmit(data))}
            disabled={!isValid || isLoading}
            theme={theme}
          >
            {isScreen ? `${t("text.customProduct.labels.save")}` : `${t("text.customProduct.labels.saveAndAdd")}`}
          </Button>
          {!showAddImageText &&
            (currentSvgKey ? (
              <Button style={styles.button} theme={theme} onPress={() => setShowAddImageText(true)}>
                {svgSchemeForAdding[currentSvgKey]}
              </Button>
            ) : (
              <Button style={styles.button} theme={theme} onPress={() => setShowAddImageText(true)}>
                {t("text.customProduct.labels.addImage")}
              </Button>
            ))}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    marginBottom: 10,
  },
  container: {
    marginBottom: 50,
  },
});

export default AddCustomPr;
