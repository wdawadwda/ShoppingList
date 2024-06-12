import { View } from "react-native";
import { type Control, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { t } from "i18next";
import { useConst } from "./use/useConst";
import { useSelector } from "react-redux";

import { useEffect } from "react";
import { createTokens } from "@/store/api";
import { UserRequest } from "@/constants";
import { Button, InputForm } from "../ui";
import { selectError, selectTokensStatus, userActions } from "@/store/user";
import { type Theme, useAppDispatch } from "@/store";
import { MessForm } from "../mess-form";

export function Auth({ theme }: { theme: Theme }) {
  const dispatch = useAppDispatch();
  const error = useSelector(selectError);
  const tokensStatus = useSelector(selectTokensStatus);

  const { formFields } = useConst({});
  const { control, handleSubmit, formState } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
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
      }),
    ),
    mode: "onChange",
  });

  const onSubmit = async ({ username, email, password }: UserRequest) => {
    try {
      dispatch(createTokens({ username, email, password }));
    } catch (error) {
      console.error("Error while dispatching createTokens:", error);
    }
  };

  useEffect(() => {
    dispatch(userActions.clearError());
  }, []);

  return (
    <View style={{ marginBottom: 50, marginTop: 25 }}>
      {tokensStatus === "error" && (
        <>{error && <MessForm message={{ detail: error.detail || error.message }} status={tokensStatus} />}</>
      )}
      <InputForm formFields={formFields} formState={formState} theme={theme} control={control as unknown as Control} />
      <Button
        theme={theme}
        style={{ marginTop: 10 }}
        disabled={!formState.isValid || tokensStatus === "loading"}
        isLoading={tokensStatus === "loading"}
        onPress={handleSubmit(onSubmit)}
      >
        {t("buttonLabels.regAuth.login")}
      </Button>
    </View>
  );
}

export default Auth;
