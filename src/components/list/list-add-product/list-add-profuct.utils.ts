import { t } from "i18next";

export const getUserTabs = () => {
  const tabs: string[] = ["Поиск", "Cвой продукт"];

  return { tabs, t };
};
