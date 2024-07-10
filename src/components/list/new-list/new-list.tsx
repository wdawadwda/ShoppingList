import { Text, TextInput } from "react-native";
import { type ProductsListData, type NewListProps } from "@/constants";
import { ExistingList } from "../existing-list";
import { type Dispatch } from "react";
import { colorDark, fontsStyles, globalStyles } from "@/styles";
import { BackButton, Button } from "@/components/ui";

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
}: NewListProps & { setProductData: Dispatch<React.SetStateAction<ProductsListData>> }) => (
  <>
    <BackButton theme={theme} />

    <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>Создание списка</Text>
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
        <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>Добавить название списка</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Добавить название списка"
          value={listTitle}
          onChangeText={setListTitle}
          maxLength={15}
        />
        <Button theme={theme} onPress={() => handleAddName(productData)}>
          <Text>Подтвердить</Text>
        </Button>
      </>
    )}
  </>
);

export default NewList;
