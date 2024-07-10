import { type Content, type RenderTabContentProps } from "@/components/tabs/tabs.types";
import { Search } from "./search";
import { type ListAddProductProps } from "@/constants";
import { AddCustomPr } from "@/components/custom-product";

export type ExtendedRenderTabContentProps = RenderTabContentProps & ListAddProductProps;
const type = "customAndDefault";
export const renderTabContent = ({
  activeTab,
  t,
  theme,
  setshowInputAdd,
  language,
  setProductData,
  productData,
}: ExtendedRenderTabContentProps): Content => {
  switch (activeTab) {
    case "Поиск":
      return {
        type: "content",
        component: (
          <Search
            {...{
              setshowInputAdd,
              language,
              setProductData,
              theme,
              productData,
              t,
              type,
            }}
          />
        ),
      };
    case "Cвой продукт":
      return {
        type: "content",
        component: (
          <AddCustomPr
            setshowInputAdd={setshowInputAdd}
            setProductData={setProductData}
            theme={theme}
            productData={productData}
            isScreen={false}
          />
        ),
      };
    default:
      return null;
  }
};
