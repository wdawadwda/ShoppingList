import { Auth, Reg } from "@/components";
import { type Content, type RenderTabContentProps } from "@/components/tabs/tabs.types";

export const renderTabContent = ({ activeTab, t, theme }: RenderTabContentProps): Content => {
  switch (activeTab) {
    case t("buttonLabels.regAuth.login"):
      return {
        type: "content",
        component: <Auth theme={theme}></Auth>,
      };
    case t("buttonLabels.regAuth.register"):
      return {
        type: "content",
        component: <Reg theme={theme}></Reg>,
      };
    default:
      return null;
  }
};
