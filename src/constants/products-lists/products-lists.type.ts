import { type Theme } from "@/store";
import { type Dispatch } from "react";

export type Language = "ru" | "en";

export interface UpdateingProductInList {
  quantity?: string;
  category?: {
    en?: string;
    ru?: string;
  };
  name?: {
    en?: string;
    ru?: string;
  };
  svgKey?: string;
  isPushed?: boolean;
}

export interface ProductInList {
  quantity: string;
  category: {
    en: string;
    ru: string;
  };
  name: {
    en: string;
    ru: string;
  };
  svgKey: string;
  isPushed: boolean;
}

export interface ProductCustom extends ProductInList {
  user: number | string;
  id: number | string;
}

export interface ProductsListData {
  id: number | string | null;
  name: string;
  products: ProductInList[] | [];
}

export interface BaseListProps {
  productData: ProductsListData;
  theme: Theme;
  language: Language;
  listId: string | undefined;
  listName: string;
  listTitle: string;
  setListTitle: Dispatch<string>;
  handleAddName: (data: ProductsListData) => void;
  handleAddClick: () => void;
  setshowInputAdd: Dispatch<boolean>;
  setProductData: Dispatch<ProductsListData>;
}

export type ListAddProductProps = Pick<
  BaseListProps,
  "setshowInputAdd" | "language" | "setProductData" | "theme" | "productData"
>;

export type ExistingListProps = Pick<
  BaseListProps,
  "listId" | "listName" | "productData" | "handleAddClick" | "theme" | "language"
>;

export type NewListProps = Pick<
  BaseListProps,
  "productData" | "listTitle" | "setListTitle" | "handleAddName" | "handleAddClick" | "theme" | "language" | "listId"
>;
