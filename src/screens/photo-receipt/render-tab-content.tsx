import DownloadPhoto from "@/components/receipt/download-photo";
import TakePhoto from "@/components/receipt/take-photo";
import { type Content, type RenderTabContentProps } from "@/components/tabs/tabs.types";

export type ExtendedRenderTabContentProps = RenderTabContentProps & {
  userId?: string | null;
};

export const renderTabContent = ({ activeTab, t, theme, userId }: ExtendedRenderTabContentProps): Content => {
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
