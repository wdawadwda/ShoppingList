import { Language } from "@/constants/products-lists/products-lists.type";

type ProductName = {
  [key: string]: string;
};

export const getFirstLetter = (productName: ProductName, language: Language): string => {
  const name = productName[language.toLowerCase()];
  return name.charAt(0).toUpperCase();
};
