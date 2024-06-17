import DownloadPhoto from "@/components/receipt/download-photo";
import TakePhoto from "@/components/receipt/take-photo";
import { Content, RenderTabContentProps } from "@/components/tabs/tabs.types";

export const renderTabContent = ({ activeTab, t, theme, userId }: RenderTabContentProps): Content => {
  switch (activeTab) {
    case t("buttonLabels.reviseReceipt.takePhoto"):
      return {
        type: "content",
        component: <TakePhoto userId={userId} theme={theme}></TakePhoto>,
      };
    case t("buttonLabels.reviseReceipt.download"):
      return {
        type: "content",
        component: <DownloadPhoto userId={userId} theme={theme}></DownloadPhoto>,
      };
    default:
      return null;
  }
};
