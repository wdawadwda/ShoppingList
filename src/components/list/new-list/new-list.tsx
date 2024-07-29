import { Text, TextInput } from "react-native";
import { type ProductsListData, type NewListProps } from "@/constants";
import { ExistingList } from "../existing-list";
import { type Dispatch } from "react";
import { fontsStyles, globalStyles } from "@/styles";
import { BackButton, Button } from "@/components/ui";
import { t } from "i18next";

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
    <Text style={[fontsStyles.subtitle, fontsStyles.defaultColor]}>{t("text.lists.newList.createList")}</Text>
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
        <BackButton theme={theme} />
        <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>{t("text.lists.newList.addListName")}</Text>
        <TextInput
          style={globalStyles.input}
          placeholder={`${t("text.lists.newList.addListName")}`}
          value={listTitle}
          onChangeText={setListTitle}
          maxLength={15}
        />
        <Button theme={theme} onPress={() => handleAddName(productData)}>
          <Text>{t("defaultMessage.confirm")}</Text>
        </Button>
      </>
    )}
  </>
);

export default NewList;
