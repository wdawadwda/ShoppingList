import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAppDispatch, type Theme } from "@/store";
import { useState, type Dispatch } from "react";
import { BackButton, Button } from "@/components/ui";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { colorDark, darkStyles, fontsStyles, globalStyles } from "@/styles";
import { type User, type ProductsListData } from "@/constants";
import { fetchProductsLists, sharedPermission } from "@/store/api";
import { type MainNavigationProp } from "@/navigation";

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
          .typeError("User ID must be a number")
          .required("User ID is required")
          .positive("User ID must be positive")
          .integer("User ID must be an integer"),
        permission: yup.string().oneOf(["read", "write"], "Invalid permission").required("Permission is required"),
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
        console.error("Error updating share rights:", error);
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
        <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>Enter user ID to share with:</Text>
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
          <View style={[darkStyles.containerAlert, globalStyles.containerAlert, { marginBottom: 10 }]}>
            <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{errors.userId.message}</Text>
          </View>
        )}
        <View style={styles.radioGroup}>
          <Text style={[fontsStyles.text2, { color: colorDark.textColor, marginBottom: 10 }]}>Выберите права:</Text>
          <Controller
            control={control}
            name="permission"
            render={({ field: { onChange, value } }) => (
              <>
                <TouchableOpacity style={styles.radioButton} onPress={() => onChange("read")}>
                  <View style={[styles.radio, value === "read" && styles.radioSelected]} />
                  <Text style={[styles.radioText, fontsStyles.text2]}>Чтение</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.radioButton} onPress={() => onChange("write")}>
                  <View style={[styles.radio, value === "write" && styles.radioSelected]} />
                  <Text style={[styles.radioText, fontsStyles.text2]}>Запись</Text>
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
          Share
        </Button>
      </View>
    </>
  );
};

export default SharedForm;

const styles = StyleSheet.create({
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
