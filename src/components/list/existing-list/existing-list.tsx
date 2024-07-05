import { BackButton, Button } from "@/components/ui";
import { Text } from "react-native";
import { ListContent } from "../list-content";
import { type ExistingListProps } from "@/constants";

export const ExistingList = ({ listId, listName, productData, handleAddClick, theme, language }: ExistingListProps) => (
  <>
    <BackButton theme={theme} />
    <Text>List ID: {listId}</Text>
    <Text>List Name: {listName}</Text>
    <Button theme={theme} onPress={handleAddClick}>
      <Text>Добавить</Text>
    </Button>
    {productData.products && <ListContent productList={productData.products} language={language} theme={theme} />}
  </>
);
export default ExistingList;
