import { Alert } from "react-native";
import { type ProductsListData, type ExistingListProps, ErrorObject } from "@/constants";
import {
  canselPermission,
  createProductsLists,
  deleteProductListData,
  fetchProductsLists,
  updateProductsList,
} from "@/store/api";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import { type MainNavigationProp } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "@/store";
import { useState, type Dispatch } from "react";
import useExistingList from "./use/use-existing-list";
import SharedForm from "./shared-form";

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
  const navigation = useNavigation<MainNavigationProp>();

  const [isSharedForm, setIsSharedForm] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (userId: string | number) => {
    const data = { ...productData, owner_id: userId };
    if (isNewList) {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    } else {
      if (data.id) {
        setIsLoading(true);
        try {
          await updateProductsList(data.id, data.owner_id, data);
          dispatch(fetchProductsLists(userId));
          navigation.navigate("Home");
        } catch (error) {
          console.error("Ошибка при создании нового списка:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }
  };

  const handleDelete = async (objId: string | number, userId: string | number) => {
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
            setIsLoading(true);
            try {
              await deleteProductListData(objId, userId);
              dispatch(fetchProductsLists(userId));
              navigation.navigate("Home");
            } catch (error) {
              console.error("Ошибка при удалении списка:", error);
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  const cancellationPermissions = async () => {
    if (productData?.id && user?.id) {
      setIsLoading(true);
      try {
        await canselPermission(productData.id, user.id);
        navigation.navigate("Home");
      } catch (error) {
        console.error("Error updating share rights:", error);
      } finally {
        dispatch(fetchProductsLists(user.id));
        setIsLoading(false);
      }
    }
  };

  const { renderContent } = useExistingList({
    listId,
    listName,
    productData,
    handleAddClick,
    theme,
    language,
    isNewList,
    setProductData,
    handleSave,
    handleDelete,
    cancellationPermissions,
    user,
    setIsSharedForm,
    isLoading,
  });

  return (
    <>
      {isSharedForm ? (
        <SharedForm
          theme={theme}
          setIsSharedForm={setIsSharedForm}
          productData={productData}
          user={user}
          navigation={navigation}
        />
      ) : (
        renderContent()
      )}
    </>
  );
};

export default ExistingList;
