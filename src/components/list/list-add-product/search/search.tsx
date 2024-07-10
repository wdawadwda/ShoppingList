import { Button } from "@/components/ui";
import { type ListAddProductProps, type ProductInList, productsConst } from "@/constants";
import { useEffect, useMemo, useState } from "react";
import { ScrollView, Text, TextInput } from "react-native";
import { useSelector } from "react-redux";
import { selectСustomProducts, Theme } from "@/store";
import { RadixTree } from "@/utils";
import { Language } from "@/constants/products-lists/products-lists.type";
import { HelperRenderComponent } from "./helper";

interface SearchProps extends Partial<Omit<ListAddProductProps, "theme" | "language">> {
  theme: Theme;
  language: Language;
  type: "custom" | "customAndDefault";
}

export const Search = ({
  setshowInputAdd,
  language,
  setProductData,
  productData,
  theme,
  type = "customAndDefault",
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ProductInList[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductInList | null>(null);
  const customProductsData = useSelector(selectСustomProducts);

  const productsForSearch = type === "custom" ? [...customProductsData] : [...productsConst, ...customProductsData];

  const radixTree = useMemo(() => {
    const tree = new RadixTree();
    productsForSearch.forEach((product) => tree.insert(product, language));
    return tree;
  }, [language]);

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === "") {
      setSuggestions([]);
    } else {
      const filteredProducts = radixTree.search(text.toLowerCase());
      setSuggestions(filteredProducts);
    }
  };

  const selectProduct = (product: ProductInList) => {
    setCurrentProduct(product);
    setSuggestions([]);
  };

  return (
    <>
      <Text>Поиск:</Text>
      {currentProduct ? (
        <HelperRenderComponent
          type={type}
          currentProduct={currentProduct}
          productData={productData}
          setProductData={setProductData}
          setshowInputAdd={setshowInputAdd}
          setSearchTerm={setSearchTerm}
          setCurrentProduct={setCurrentProduct}
          theme={theme}
        />
      ) : (
        <>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            placeholder="Введите название продукта"
            value={searchTerm}
            onChangeText={handleSearch}
          />

          <ScrollView>
            {suggestions.length > 0 &&
              suggestions.map((product, index) => (
                <Button theme={theme} key={index} onPress={() => selectProduct(product)}>
                  <Text>{(product.name as { [key: string]: string })[language.toLowerCase()]}</Text>
                </Button>
              ))}
          </ScrollView>
        </>
      )}
    </>
  );
};

export default Search;
