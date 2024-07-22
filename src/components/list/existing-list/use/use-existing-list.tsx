import { BackButton, Button } from "@/components/ui";
import { Dispatch, useCallback } from "react";
import { Text, View } from "react-native";
import { TrashSvgComponent } from "@/assets";
import { colorDark, fontsStyles } from "@/styles";
import { ExistingListProps, ProductsListData, User } from "@/constants";
import { ListContent } from "../../list-content";

const useExistingList = ({
  listId,
  listName,
  productData,
  handleAddClick,
  theme,
  language,
  isNewList,
  user,
  setProductData,
  handleSave,
  handleDelete,
  cancellationPermissions,
  setIsSharedForm,
  isLoading,
}: ExistingListProps & {
  user: User | null;
  isNewList: boolean;
  setProductData: Dispatch<React.SetStateAction<ProductsListData>>;
  handleSave: (userId: string | number) => Promise<void>;
  handleDelete: (objId: string | number, userId: string | number) => Promise<void>;
  cancellationPermissions: () => void;
  setIsSharedForm: Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}) => {
  const renderBackButton = useCallback(
    (isNewObject = false) => (
      <>
        {isNewObject ? (
          <BackButton theme={theme} onPress={() => setProductData({ ...productData, name: "" })} />
        ) : (
          <BackButton theme={theme} />
        )}
      </>
    ),
    [theme, setProductData, productData],
  );

  const renderListInfo = useCallback(
    () => (
      <View>
        <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>ID списка: {listId}</Text>
        <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>Название списка: {listName}</Text>
      </View>
    ),
    [listId, listName],
  );

  const renderSharedInfo = useCallback(
    () => (
      <View>
        <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>
          {productData?.owner?.owner_id === user?.id ? "пользователю: " : "от пользователя: "}
          {productData?.shared?.shared_name || productData?.owner?.owner_name}
        </Text>
        <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>
          ID: {productData?.shared?.shared_id || productData?.owner?.owner_id}
        </Text>
      </View>
    ),
    [productData, user],
  );

  const renderListContent = useCallback(
    (isEditable = true) => (
      <>
        {isEditable && (
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            style={{ marginTop: 25 }}
            theme={theme}
            onPress={handleAddClick}
          >
            <Text>Добавить</Text>
          </Button>
        )}
        {productData?.products && (
          <ListContent
            setProductData={setProductData}
            productList={productData.products}
            productData={productData}
            language={language}
            theme={theme}
            isEditable={isEditable}
          />
        )}
      </>
    ),
    [theme, handleAddClick, productData, language, setProductData],
  );

  const renderButtons = useCallback(
    (
      showSave = true,
      showDelete = false,
      showShareRights = false,
      showRevokeRights = false,
      showRejectRights = false,
    ) => (
      <View style={{ marginBottom: 25, marginTop: 15 }}>
        {showSave && user?.id && (
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            style={{ marginVertical: 2.5 }}
            theme={theme}
            onPress={() => handleSave(user.id)}
          >
            <Text>Сохранить список</Text>
          </Button>
        )}
        {showShareRights && (
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            style={{ marginVertical: 2.5 }}
            theme={theme}
            onPress={() => setIsSharedForm(true)}
          >
            <Text>Передать права</Text>
          </Button>
        )}
        {showRevokeRights && (
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            style={{ marginVertical: 2.5 }}
            theme={theme}
            onPress={cancellationPermissions}
          >
            <Text>Отозвать права</Text>
          </Button>
        )}
        {showRejectRights && (
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            style={{ marginVertical: 2.5 }}
            theme={theme}
            onPress={cancellationPermissions}
          >
            <Text>Отказаться от прав</Text>
          </Button>
        )}
        {showDelete && user?.id && productData?.id && (
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            style={{ marginVertical: 2.5 }}
            theme={theme}
            onPress={() => handleDelete(productData.id!, user.id)}
          >
            <TrashSvgComponent width={25} height={25} color={colorDark.textColor} />
          </Button>
        )}
      </View>
    ),
    [theme, cancellationPermissions, productData.id, handleSave, setIsSharedForm, handleDelete],
  );

  const getListState = useCallback(() => {
    if (!user?.id) return "unauthorized";
    if (isNewList) return "new";
    if (productData?.owner?.owner_id === user.id) {
      if (!productData.is_shared) return "ownedNotShared";
      return productData.shared_type === "read" ? "ownedSharedRead" : "ownedSharedWrite";
    }
    if (productData?.shared?.shared_id === user.id) {
      return productData.shared_type === "read" ? "sharedRead" : "sharedWrite";
    }
    return "unknown";
  }, [user, isNewList, productData]);

  const renderContent = useCallback(() => {
    switch (getListState()) {
      case "new":
        return (
          <>
            {renderBackButton(true)}
            {renderListInfo()}
            {renderListContent()}
            {renderButtons(true, false)}
          </>
        );
      case "ownedNotShared":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            {renderListContent()}
            {renderButtons(true, true, true)}
          </>
        );
      case "ownedSharedRead":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            <Text style={[fontsStyles.text, { color: colorDark.textColor, marginTop: 10 }]}>
              Список был передан для чтения
            </Text>
            {renderSharedInfo()}
            {renderListContent(true)}
            {renderButtons(true, true, false, true)}
          </>
        );
      case "ownedSharedWrite":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            <Text style={[fontsStyles.text, { color: colorDark.textColor, marginTop: 10 }]}>
              Список был передан для записи
            </Text>
            {renderSharedInfo()}
            {renderListContent(false)}
            {renderButtons(false, false, false, true)}
          </>
        );
      case "sharedWrite":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            <Text style={[fontsStyles.text, { color: colorDark.textColor, marginTop: 10 }]}>
              Список получен для записи
            </Text>
            {renderSharedInfo()}
            {renderListContent()}
            {renderButtons(true, false, false, false, true)}
          </>
        );
      case "sharedRead":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            <Text style={[fontsStyles.text, { color: colorDark.textColor, marginTop: 10 }]}>
              Список получен для чтения
            </Text>
            {renderSharedInfo()}
            {renderListContent(false)}
            {renderButtons(false, false, false, false, true)}
          </>
        );
      default:
        return <>{renderBackButton()}</>;
    }
  }, [getListState, renderBackButton, renderListInfo, renderListContent, renderButtons, renderSharedInfo]);

  return {
    renderContent,
  };
};

export default useExistingList;
