import { Controller, FieldValues } from "react-hook-form";
import { Text, TextInput, View } from "react-native";

import { Path } from "react-hook-form";
import { FormField, FormInputProps } from "./input.type";
import { useState } from "react";
import { DetailButton } from "../buttons/detail-button/detail-button";
import { colorDark, darkStyles, fontsStyles, globalStyles } from "@/styles";

export const InputForm = <T extends FieldValues>({
  formFields,
  formState,
  theme,
  control,
  detail = false,
}: FormInputProps<T> & { detail?: boolean }) => {
  const [isTextVisible, setIsTextVisible] = useState(false);

  if (detail) {
    return (
      <>
        {formFields.map((field: FormField) => (
          <View key={field.name}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>{`${field.label}:`}</Text>
              {field.detail && <DetailButton theme={theme} onPress={() => setIsTextVisible(!isTextVisible)} />}
            </View>
            {field.detail && isTextVisible && (
              <>
                {field.detailText1 && (
                  <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>{`${field.detailText1}`}</Text>
                )}
                {field.detailText2 && (
                  <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>{`${field.detailText2}`}</Text>
                )}
              </>
            )}
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={globalStyles.input}
                  placeholder={field.placeholder}
                  value={value ? String(value) : ""}
                  onChangeText={(text) => onChange(text)}
                  keyboardType={field.keyboardType}
                  secureTextEntry={field.secureTextEntry || false}
                  maxLength={field.maxLength}
                />
              )}
              name={field.name as Path<T>}
            />
            {formState.errors && field.name in formState.errors && formState.errors[field.name] && (
              <View style={[darkStyles.containerAlert, globalStyles.containerAlert]}>
                <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>
                  {formState.errors[field.name]?.message}
                </Text>
              </View>
            )}
          </View>
        ))}
      </>
    );
  } else {
    return (
      <>
        {formFields.map((field: FormField) => (
          <View key={field.name}>
            <Text style={[fontsStyles.text2, { color: colorDark.textColor }]}>{`${field.label}:`}</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={globalStyles.input}
                  placeholder={field.placeholder}
                  value={value ? String(value) : ""}
                  onChangeText={(text) => onChange(text)}
                  keyboardType={field.keyboardType}
                  secureTextEntry={field.secureTextEntry || false}
                  maxLength={field.maxLength}
                />
              )}
              name={field.name as Path<T>}
            />
            {formState.errors && field.name in formState.errors && formState.errors[field.name] && (
              <View style={[darkStyles.containerAlert, globalStyles.containerAlert]}>
                <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>
                  {formState.errors[field.name]?.message}
                </Text>
              </View>
            )}
          </View>
        ))}
      </>
    );
  }
};
