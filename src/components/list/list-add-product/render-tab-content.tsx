import { type Content, type RenderTabContentProps } from "@/components/tabs/tabs.types";
import { Search } from "./search";
import { type ListAddProductProps } from "@/constants";

export type ExtendedRenderTabContentProps = RenderTabContentProps & ListAddProductProps;

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
            }}
          ></Search>
        ),
      };
    // case "Cвой продукт":
    //   return {
    //     type: "content",
    //     component: <Reg theme={theme}></Reg>,
    //   };
    default:
      return null;
  }
};
