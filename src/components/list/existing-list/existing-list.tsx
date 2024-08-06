import { Alert } from "react-native";
import { type ProductsListData, type ExistingListProps, type ErrorObject, Language } from "@/constants";
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
import i18n from "@/i118/i18n";
import { t } from "i18next";

export interface ErrorState {
  detail: string | null;
  status: "idle" | "error";
}

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
  const [errorState, setErrorState] = useState<ErrorState>({ detail: null, status: "idle" });

  const handleSave = async (userId: string | number) => {
    const data = { ...productData, owner_id: userId };
    setErrorState({ detail: null, status: "idle" });
    setIsLoading(true);
    if (isNewList) {
      try {
        await createProductsLists(data);
        dispatch(fetchProductsLists(userId));
        navigation.navigate("Home");
      } catch (error) {
        const err = error as ErrorObject;
        if (err.statusErr === 409) {
          setProductData({ ...productData, name: "" });
          let errorMessage: string;
          if (typeof err.detail === "object" && (i18n?.language as keyof typeof err.detail)) {
            errorMessage = err.detail[i18n.language as Language] || err.message;
          } else {
            errorMessage = typeof err.detail === "string" ? err.detail : err.message;
          }
          Alert.alert(errorMessage);
        } else {
          setErrorState({
            detail: t("defaultMessage.defaultError"),
            status: "error",
          });
        }
      } finally {
        setIsLoading(false);
      }
    } else {
      if (data.id) {
        try {
          await updateProductsList(data.id, data.owner_id, data);
          dispatch(fetchProductsLists(userId));
          navigation.navigate("Home");
        } catch (error) {
          setErrorState({
            detail: t("defaultMessage.defaultError"),
            status: "error",
          });
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
            setErrorState({ detail: null, status: "idle" });
            try {
              await deleteProductListData(objId, userId);
              dispatch(fetchProductsLists(userId));
              navigation.navigate("Home");
            } catch (error) {
              setErrorState({
                detail: t("defaultMessage.defaultError"),
                status: "error",
              });
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
      setErrorState({ detail: null, status: "idle" });
      try {
        await canselPermission(productData.id, user.id);
        navigation.navigate("Home");
      } catch (error) {
        const err = error as ErrorObject;
        if (err && typeof err.detail === "object" && "ru" in err.detail && "en" in err.detail) {
          const detail = err.detail as { [key: string]: string };
          if (detail[i18n.language]) {
            setErrorState({
              detail: `${detail[i18n.language]}. ${t("defaultMessage.defaultCanselPermission")}`,
              status: "error",
            });
          } else {
            setErrorState({
              detail: t("defaultMessage.defaultError"),
              status: "error",
            });
          }
        } else {
          setErrorState({
            detail: t("defaultMessage.defaultError"),
            status: "error",
          });
        }
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
    errorState,
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
        <>{renderContent()}</>
      )}
    </>
  );
};

export default ExistingList;
