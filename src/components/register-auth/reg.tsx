import { StyleSheet, Text, View } from "react-native";
import { t } from "i18next";
import * as yup from "yup";
import { type Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useConst } from "./use/useConst";
import { useState } from "react";
import { AxiosError } from "axios";
import { type UserRequest } from "@/constants";
import { registerUser } from "@/store/api";
import { Button, InputForm } from "../ui";
import { colorDark, darkStyles, fontsStyles, globalStyles } from "@/styles";
import { type Theme } from "@/store";
import { MessForm } from "../mess-form";
import i18n from "@/i118/i18n";
import { UserError } from "@/constants/api/api.type";

export function Reg({ theme }: { theme: Theme }) {
  const { formFields } = useConst({ reg: true });
  const { control, handleSubmit, formState, reset } = useForm({
    mode: "onChange",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup
          .string()
          .required(`${t("validation.regAuth.login.usernameRequired")}`)
          .min(3, t("validation.regAuth.reg.usernameMinLength", { min: 3 })),
        email: yup
          .string()
          .email(`${t("validation.regAuth.reg.emailInvalid")}`)
          .required(`${t("validation.regAuth.reg.emailRequired")}`),
        password: yup
          .string()
          .required(`${t("validation.regAuth.login.passwordRequired")}`)
          .min(6, t("validation.regAuth.reg.passwordMinLength", { min: 6 }))
          .matches(/[A-Za-zЁА-яё]/, `${t("validation.regAuth.reg.passwordInvalid")}`)
          .matches(/[A-ZЁА-Я]/, `${t("validation.regAuth.reg.passwordInvalid")}`)
          .matches(/[a-zа-яё]/, `${t("validation.regAuth.reg.passwordInvalid")}`)
          .matches(/\d/, `${t("validation.regAuth.reg.passwordInvalid")}`),
        repeatPassword: yup
          .string()
          .oneOf([yup.ref("password"), undefined], `${t("validation.regAuth.reg.repeatPasswordMatch")}`)
          .required(`${t("validation.regAuth.reg.repeatPasswordRequired")}`),
      }),
    ),
  });

  const [registrationStatus, setRegistrationStatus] = useState<string | null>(null);
  const [registrationError, setRegistrationError] = useState<(UserRequest & { defaultAxios: string }) | null>(null);

  const onSubmit = async ({ username, email, password }: UserRequest) => {
    setRegistrationStatus("loading");
    try {
      await registerUser({ username, email, password });
      setRegistrationStatus("success");
      setRegistrationError(null);
      reset();
    } catch (error) {
      const axiosError = error as AxiosError<UserError>;
      setRegistrationStatus("error");
      const errorMessage = axiosError?.response?.data?.detail?.[i18n.language] || {
        email: "",
        password: "",
        username: "",
      };
      const defaultMessage = axiosError.message;
      setRegistrationError({
        email: errorMessage.email || "",
        password: errorMessage.password || "",
        username: errorMessage.username || "",
        defaultAxios: defaultMessage,
      });
    }
  };

  return (
    <View style={styles.container}>
      {registrationStatus === "success" && (
        <View style={[darkStyles.containerSuccess, globalStyles.containerSuccess]}>
          <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>{t("text.regAuth.regSuccess")}</Text>
        </View>
      )}
      {registrationStatus === "error" && <MessForm message={registrationError || {}} status={registrationStatus} />}
      <InputForm formFields={formFields} formState={formState} theme={theme} control={control as unknown as Control} />
      <Button
        theme={theme}
        style={styles.button}
        disabled={!formState.isValid || registrationStatus === "loading"}
        isLoading={registrationStatus === "loading"}
        onPress={handleSubmit(onSubmit)}
      >
        {t("buttonLabels.regAuth.register")}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 50,
    marginTop: 25,
  },
  button: {
    marginTop: 10,
  },
});

export default Reg;
