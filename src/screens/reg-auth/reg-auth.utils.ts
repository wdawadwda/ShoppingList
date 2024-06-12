import { t } from "i18next";

export const getUserTabs = () => {
  const tabs: string[] = [t("buttonLabels.regAuth.login"), t("buttonLabels.regAuth.register")];

  return { tabs, t };
};
