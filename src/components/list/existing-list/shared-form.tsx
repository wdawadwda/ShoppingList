import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppDispatch, type Theme } from "@/store";
import { useState, type Dispatch } from "react";
import { BackButton, Button } from "@/components/ui";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { colorDark, darkStyles, fontsStyles, globalStyles } from "@/styles";
import { type User, type ProductsListData, ErrorObject } from "@/constants";
import { fetchProductsLists, sharedPermission } from "@/store/api";
import { type MainNavigationProp } from "@/navigation";
import { t } from "i18next";
import { MessForm } from "@/components/mess-form";
import i18n from "@/i118/i18n";

type FormValues = {
  userId: number;
  permission: "read" | "write";
};

export const SharedForm = ({
  theme,
  setIsSharedForm,
  productData,
  user,
  navigation,
}: {
  theme: Theme;
  setIsSharedForm: Dispatch<React.SetStateAction<boolean>>;
  productData: ProductsListData;
  user: User | null;
  navigation: MainNavigationProp;
}) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      userId: undefined,
      permission: "read",
    },
    resolver: yupResolver(
      yup.object().shape({
        userId: yup
          .number()
          .typeError(t("validation.permission.user.userId"))
          .required(t("validation.permission.user.required"))
          .positive(t("validation.permission.user.positive"))
          .integer(t("validation.permission.user.integer")),
        permission: yup
          .string()
          .oneOf(["read", "write"], t("validation.permission.permission.permissionRequired"))
          .required(t("validation.permission.permission.permissionInvalid")),
      }),
    ),
  });

  const handleShareRights = async (data: { permission: "read" | "write"; userId: number }) => {
    if (productData?.id && user?.id && data) {
      setIsLoading(true);
      try {
        await sharedPermission(productData.id, user.id, data);
        navigation.navigate("Home");
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
        reset();
        dispatch(fetchProductsLists(user.id));
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <View>
        <BackButton
          theme={theme}
          onPress={() => {
            reset();
            setIsSharedForm(false);
          }}
        />
        {error && (
          <MessForm
            message={{
              detail: error,
            }}
            status={"error"}
          />
        )}

        <Text
          style={[fontsStyles.text2, fontsStyles.defaultColor]}
        >{`${t("text.lists.placeholders.enterUserId")}:`}</Text>
        <Controller
          control={control}
          name="userId"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={globalStyles.input}
              keyboardType="numeric"
              maxLength={5}
              placeholder="ID"
              onChangeText={(text) => {
                onChange(text.replace(/\s/g, ""));
              }}
              onBlur={onBlur}
              value={value !== undefined ? value.toString() : ""}
            />
          )}
        />
        {errors.userId && (
          <View style={[darkStyles.containerAlert, globalStyles.containerAlert, styles.defaultMargin]}>
            <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{errors.userId.message}</Text>
          </View>
        )}
        <View style={styles.radioGroup}>
          <Text
            style={[fontsStyles.text2, fontsStyles.defaultColor, styles.defaultMargin]}
          >{`${t("text.lists.permissions.selectRights")}:`}</Text>
          <Controller
            control={control}
            name="permission"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity style={styles.radioButton} onPress={() => onChange("read")}>
                  <View style={[styles.radio, value === "read" && styles.radioSelected]} />
                  <Text style={[styles.radioText, fontsStyles.text2]}>{t("text.lists.permissions.read")}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButton} onPress={() => onChange("write")}>
                  <View style={[styles.radio, value === "write" && styles.radioSelected]} />
                  <Text style={[styles.radioText, fontsStyles.text2]}>{t("text.lists.permissions.write")}</Text>
                </TouchableOpacity>
              </>
            )}
          />
        </View>
        <Button
          disabled={!isValid || isLoading}
          isLoading={isLoading}
          theme={theme}
          onPress={handleSubmit(handleShareRights)}
        >
          {t("defaultMessage.share")}
        </Button>
      </View>
    </>
  );
};

export default SharedForm;

const styles = StyleSheet.create({
  defaultMargin: {
    marginBottom: 10,
  },
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 20,
  },
  radioGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colorDark.textColor,
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: colorDark.textColor,
  },
  radioText: {
    color: colorDark.textColor,
  },
});
