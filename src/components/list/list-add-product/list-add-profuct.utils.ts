import { t } from "i18next";

export const getUserTabs = () => {
  const tabs: string[] = [`${t("text.lists.tabs.searh")}`, `${t("text.lists.tabs.customProduct")}`];

  return { tabs, t };
};
