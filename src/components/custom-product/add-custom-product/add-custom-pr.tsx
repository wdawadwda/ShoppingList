import { type ErrorObject, type ProductsListData, type ProductCustom } from "@/constants";
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
import { type ErrorMessageType } from "@/constants/api";
import { MessForm } from "@/components/mess-form";
import { Button } from "@/components/ui";

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
  const [isLoading, setIsLoading] = useState(false);
  const [currentSvgKey, setCurrentSvgKey] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [synchronizedData, setSynchronizedData] = useState<AddCustomPrForm | null>(null);
  const [errorBack, setErrorBack] = useState<ErrorMessageType | null>(null);
  const navigation = useNavigation();

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
    setErrorBack(null);
    setIsLoading(true);
    if (user?.id) {
      const synchronizedData = synchronizeFields(data);
      const product: Omit<ProductCustom, "id"> = {
        ...synchronizedData,
        user: user.id,
      };

      try {
        if (isScreen) {
          await createCustomProduct(product);
          navigation.goBack();
        } else {
          await createCustomProduct(product);
          setSynchronizedData(synchronizedData);
        }
      } catch (error) {
        const customError = error as ErrorObject;
        if (customError?.errorLangData) {
          setErrorBack(customError.errorLangData);
        } else {
          setErrorBack({ ru: "Дефолтная ошибка", en: "Default error" });
        }
      } finally {
        setIsLoading(false);
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
  }, [primaryLang, errorBack]);

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
      {errorBack && (
        <View style={{ marginTop: 25 }}>
          <MessForm message={{ detail: errorBack[primaryLang] }} status="error" />
        </View>
      )}
      {synchronizedData && !isLoading ? (
        <>
          <TextInput
            style={globalStyles.input}
            placeholder="Введите количество"
            value={quantity}
            onChangeText={setQuantity}
          />
          {productData && (
            <Button theme={theme} onPress={() => handleAddProduct(productData)}>
              Подтвердить
            </Button>
          )}
        </>
      ) : (
        <View style={{ marginBottom: 50, marginTop: 25 }}>
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
