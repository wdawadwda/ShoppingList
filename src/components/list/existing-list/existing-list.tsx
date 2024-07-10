import { BackButton, Button } from "@/components/ui";
import { Alert, Text, View } from "react-native";
import { ListContent } from "../list-content";
import { type ProductsListData, type ExistingListProps, ErrorObject } from "@/constants";
import { createProductsLists, deleteProductListData, fetchProductsLists, updateProductsList } from "@/store/api";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import { type MainNavigationProp } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "@/store";
import { colorDark, fontsStyles } from "@/styles";
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
}: ExistingListProps & { isNewList: boolean; setProductData: Dispatch<React.SetStateAction<ProductsListData>> }) => {
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
        if (
          typeof error === "object" &&
          error !== null &&
          "statusErr" in error &&
          (error as ErrorObject).statusErr === 409
        ) {
          setProductData({ ...productData, name: "" });
          Alert.alert("Такой список уже существует");
        }
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
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this product?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            try {
              await deleteProductListData(objId, userId);
              dispatch(fetchProductsLists(userId));
              navigation.navigate("Home");
            } catch (error) {
              console.error("Ошибка при удалении списка:", error);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
      <BackButton theme={theme} />
      <Text style={(fontsStyles.text, { color: colorDark.textColor })}>List ID: {listId}</Text>
      <Text style={(fontsStyles.text, { color: colorDark.textColor })}>List Name: {listName}</Text>
      <Button style={{ marginTop: 25 }} theme={theme} onPress={handleAddClick}>
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
              style={{ marginTop: 15, marginBottom: 25 }}
              onPress={() => {
                productData.id ? hendleDell(productData.id, id) : null;
              }}
            >
              <TrashSvgComponent width={25} height={25} color={colorDark.textColor} />
            </Button>
          ) : (
            <View style={{ height: 25 }} />
          )}
        </>
      ) : null}
    </>
  );
};

export default ExistingList;
