import { type ProductsListData } from "@/constants/products-lists/products-lists.type";
import AddQuantity, { type AddQuantityProps } from "./add-quantity";
import { type Dispatch } from "react";
import { EditDellProduct } from "@/components/custom-product";

interface HelperRenderComponentProps
  extends Pick<
    AddQuantityProps,
    Exclude<keyof AddQuantityProps, "setProductData" | "setshowInputAdd" | "productData">
  > {
  setProductData?: Dispatch<ProductsListData>;
  setshowInputAdd?: Dispatch<boolean>;
  productData?: ProductsListData;
  type: "custom" | "customAndDefault";
}

export const HelperRenderComponent = ({
  type,
  currentProduct,
  productData,
  setProductData,
  setshowInputAdd,
  setSearchTerm,
  setCurrentProduct,
  theme,
}: HelperRenderComponentProps) => {
  if (type === "customAndDefault" && productData && setProductData && setshowInputAdd) {
    return (
      <AddQuantity
        {...{ productData, currentProduct, setProductData, setshowInputAdd, setSearchTerm, setCurrentProduct, theme }}
      />
    );
  }

  if (type === "custom") {
    return <EditDellProduct {...{ setCurrentProduct, currentProduct, theme }} />;
  }

  return null;
};
