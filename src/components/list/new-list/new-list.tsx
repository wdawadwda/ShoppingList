import { Text, TextInput, TouchableOpacity } from "react-native";
import { type NewListProps } from "@/constants";
import { ExistingList } from "../existing-list";

export const NewList = ({
  productData,
  listTitle,
  setListTitle,
  handleAddName,
  handleAddClick,
  theme,
  language,
  listId,
}: NewListProps) => (
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
