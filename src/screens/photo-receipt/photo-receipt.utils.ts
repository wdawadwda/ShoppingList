import { t } from "i18next";

export const getResiptTabs = () => {
  const tabs: string[] = [t("buttonLabels.reviseReceipt.takePhoto"), t("buttonLabels.reviseReceipt.download")];

  return { tabs, t };
};
