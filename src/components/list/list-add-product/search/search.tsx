import { Button } from "@/components/ui";
import { type ListAddProductProps, type ProductInList, productsConst, type ProductsListData } from "@/constants";
import { useMemo, useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity } from "react-native";
import { RadixTree } from "./radix-tree";

export const Search = ({ setshowInputAdd, language, setProductData, productData, theme }: ListAddProductProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ProductInList[]>([]);
  const [currentProduct, setCurrentProduct] = useState<ProductInList | null>(null);
  const [quantity, setQuantity] = useState<string>("");

  const radixTree = useMemo(() => {
    const tree = new RadixTree();
    productsConst.forEach((product) => tree.insert(product, language));
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

  const handleAddProduct = (prData: ProductsListData) => {
    const productWithQuantity = { ...currentProduct, quantity };
    const newData = {
      ...prData,
      products: [...prData.products, productWithQuantity],
    };

    setProductData(newData as ProductsListData);

    setSearchTerm("");
    setCurrentProduct(null);
    setQuantity("");
    setshowInputAdd(false);
  };

  return (
    <>
      {currentProduct ? (
        <>
          <Text>Поиск:</Text>
          <TextInput
            style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
            placeholder="Введите количество"
            value={quantity}
            onChangeText={setQuantity}
          />
          <TouchableOpacity onPress={() => handleAddProduct(productData)}>
            <Text>Подтвердить</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Поиск:</Text>
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
