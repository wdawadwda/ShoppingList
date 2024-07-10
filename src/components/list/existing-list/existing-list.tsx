import { BackButton, Button } from "@/components/ui";
import { Text } from "react-native";
import { ListContent } from "../list-content";
import { type ProductsListData, type ExistingListProps } from "@/constants";
import { createProductsLists, deleteProductListData, fetchProductsLists, updateProductsList } from "@/store/api";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import { type MainNavigationProp } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "@/store";
import { colorDark } from "@/styles";
import { TrashSvgComponent } from "@/assets";
import { type Dispatch } from "react";

export const ExistingList = ({
  listId,
  listName,
  productData,
  handleAddClick,
  theme,
  language,
  isNewList,
  setProductData,
}: ExistingListProps & { isNewList: boolean; setProductData: Dispatch<ProductsListData> }) => {
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();
  const id = user?.id;
  const navigation = useNavigation<MainNavigationProp>();

  const hendleSave = async (userId: string | number) => {
    const data = { ...productData, owner_id: userId };

    if (isNewList) {
      try {
        await createProductsLists(data);
        dispatch(fetchProductsLists(userId));
        navigation.navigate("Home");
      } catch (error) {
        console.error("Ошибка при создании нового списка:", error);
      }
    } else {
      if (data.id) {
        try {
          await updateProductsList(data.id, data.owner_id, data);
          dispatch(fetchProductsLists(userId));
          navigation.navigate("Home");
        } catch (error) {
          console.error("Ошибка при создании нового списка:", error);
        }
      }
    }
  };

  const hendleDell = async (objId: string | number, userId: string | number) => {
    try {
      await deleteProductListData(objId, userId);
      dispatch(fetchProductsLists(userId));
      navigation.navigate("Home");
    } catch (error) {
      console.error("Ошибка при удалении списка:", error);
    }
  };

  return (
    <>
      <BackButton theme={theme} />
      <Text>List ID: {listId}</Text>
      <Text>List Name: {listName}</Text>
      <Button theme={theme} onPress={handleAddClick}>
        <Text>Добавить</Text>
      </Button>
      {productData?.products && (
        <ListContent
          setProductData={setProductData}
          productList={productData.products}
          productData={productData}
          language={language}
          theme={theme}
        />
      )}
      {id ? (
        <>
          <Button theme={theme} onPress={() => hendleSave(id)}>
            <Text>Сохранить список</Text>
          </Button>
          {!isNewList && productData && productData?.id ? (
            <Button
              theme={theme}
              onPress={() => {
                productData.id ? hendleDell(productData.id, id) : null;
              }}
            >
              <TrashSvgComponent width={25} height={25} color={colorDark.textColor} />
            </Button>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default ExistingList;
