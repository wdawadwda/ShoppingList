import { Text, TextInput, TouchableOpacity } from "react-native";
import { type ProductsListData, type NewListProps } from "@/constants";
import { ExistingList } from "../existing-list";
import { type Dispatch } from "react";

export const NewList = ({
  productData,
  listTitle,
  setListTitle,
  handleAddName,
  handleAddClick,
  theme,
  language,
  listId,
  setProductData,
}: NewListProps & { setProductData: Dispatch<ProductsListData> }) => (
  <>
    <Text>Создание списка</Text>
    {productData?.name ? (
      <ExistingList
        listId={listId}
        listName={listTitle}
        productData={productData}
        handleAddClick={handleAddClick}
        theme={theme}
        language={language}
        isNewList={true}
        setProductData={setProductData}
      />
    ) : (
      <>
        <Text>Добавить название списка</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 }}
          placeholder="Добавить название списка"
          value={listTitle}
          onChangeText={setListTitle}
        />
        <TouchableOpacity onPress={() => handleAddName(productData)}>
          <Text>Подтвердить</Text>
        </TouchableOpacity>
      </>
    )}
  </>
);

export default NewList;
