import { t } from "i18next";
import { type FormField } from "../register-auth.type";

export const useConst = ({ reg = false }: { reg?: boolean }) => {
  const formFields: FormField[] = [
    {
      name: "username",
      label: `${t("validation.regAuth.username")}`,
      placeholder: ``,
      keyboardType: "default",
    },
    {
      name: "email",
      label: `${t("validation.regAuth.email")}`,
      placeholder: ``,
      keyboardType: "email-address",
    },
    {
      name: "password",
      label: `${t("validation.regAuth.password")}`,
      placeholder: ``,
      keyboardType: "default",
      secureTextEntry: true,
    },
    ...(reg
      ? [
          {
            name: "repeatPassword",
            label: `${t("validation.regAuth.repeatPassword")}`,
            placeholder: ``,
            keyboardType: "default" as const,
            secureTextEntry: true,
          },
        ]
      : []),
  ];

  return { formFields };
};
