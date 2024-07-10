import { ListAddProductProps } from "@/constants";
import { Theme } from "@/store";

export type AddCustomPrForm = {
  name: {
    en?: string;
    ru?: string;
  };
  category: {
    en?: string;
    ru?: string;
  };
  quantity: string;
  svgKey: string;
  isPushed: boolean;
};

export interface AddCustomPrProps extends Partial<Omit<ListAddProductProps, "theme" | "language">> {
  isScreen: boolean;
  theme: Theme;
}
