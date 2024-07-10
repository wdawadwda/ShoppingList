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
import { type ErrorMessageType } from "@/constants/api";

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
      <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>
        <Text>Name ({lang})</Text>
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
            placeholder={`Enter product name in ${lang === "en" ? "English" : "Russian"}`}
          />
        )}
        name={`name.${lang}`}
      />
      <ErrorMessage error={errors.name?.[lang]?.message} />

      <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>Category ({lang})</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            maxLength={10}
            style={globalStyles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder={`Enter category in ${lang === "en" ? "English" : "Russian"}`}
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
        <View style={{ marginTop: 25 }}>
          <MessForm
            message={{
              detail:
                (customProductError.errorLangData as ErrorMessageType)?.[primaryLang] ??
                customProductError.errorLangData ??
                "",
            }}
            status="error"
          />
        </View>
      )}
      {synchronizedData && !isLoading ? (
        <>
          <TextInput
            style={globalStyles.input}
            placeholder="Введите количество"
            value={quantity}
            maxLength={7}
            onChangeText={setQuantity}
          />
          {productData && (
            <Button theme={theme} onPress={() => handleAddProduct(productData)}>
              Подтвердить
            </Button>
          )}
        </>
      ) : (
        <View style={{ marginBottom: 50 }}>
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
            {isScreen ? "Save product" : "Save and add product"}
          </Button>
          {!showAddImageText &&
            (currentSvgKey ? (
              <Button style={styles.button} theme={theme} onPress={() => setShowAddImageText(true)}>
                {svgSchemeForAdding[currentSvgKey]}
              </Button>
            ) : (
              <Button style={styles.button} theme={theme} onPress={() => setShowAddImageText(true)}>
                Добавить изображение
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
});

export default AddCustomPr;
