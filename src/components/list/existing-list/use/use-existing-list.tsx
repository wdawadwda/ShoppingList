import { BackButton, Button } from "@/components/ui";
import { Dispatch } from "react";
import { Text, View } from "react-native";
import { TrashSvgComponent } from "@/assets";
import { colorDark, fontsStyles } from "@/styles";
import { ExistingListProps, ProductsListData, User } from "@/constants";
import { ListContent } from "../../list-content";
import { ErrorState } from "../existing-list";
import { MessForm } from "@/components/mess-form";
import { t } from "i18next";

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
  errorState,
}: ExistingListProps & {
  user: User | null;
  isNewList: boolean;
  setProductData: Dispatch<React.SetStateAction<ProductsListData>>;
  handleSave: (userId: string | number) => Promise<void>;
  handleDelete: (objId: string | number, userId: string | number) => Promise<void>;
  cancellationPermissions: () => void;
  setIsSharedForm: Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  errorState: ErrorState;
}) => {
  const renderBackButton = (isNewObject = false) => (
    <>
      {isNewObject ? (
        <BackButton theme={theme} onPress={() => setProductData({ ...productData, name: "" })} />
      ) : (
        <BackButton theme={theme} />
      )}
    </>
  );

  const renderListInfo = () => (
    <View>
      <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>{`${t("text.lists.id")}: ${listId}`}</Text>
      <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>{`${t("text.lists.name")}: ${listName}`}</Text>
    </View>
  );

  const renderSharedInfo = () => (
    <View>
      <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>
        {productData?.owner?.owner_id === user?.id
          ? `${t("productData.sharedPrefix")}: `
          : `${t("text.lists.ownerPrefix")}: `}
        {productData?.shared?.shared_name || productData?.owner?.owner_name}
      </Text>
      <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>
        {`${t("text.lists.idPrefix")} ID: ${productData?.shared?.shared_id || productData?.owner?.owner_id}`}
      </Text>
    </View>
  );

  const renderListContent = (isEditable = true) => (
    <>
      {isEditable && (
        <Button
          disabled={isLoading}
          isLoading={isLoading}
          style={{ marginTop: 25 }}
          theme={theme}
          onPress={handleAddClick}
        >
          <Text>{t("defaultMessage.add")}</Text>
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
  );

  const renderButtons = (
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
          <Text>{t("text.lists.buttons.saveList")}</Text>
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
          <Text>{t("text.lists.buttons.shareRights")}</Text>
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
          <Text>{t("text.lists.buttons.revokeRights")}</Text>
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
          <Text>{t("text.lists.buttons.rejectRights")}</Text>
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
  );

  const getListState = () => {
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
  };

  const renderContent = () => {
    switch (getListState()) {
      case "new":
        return (
          <>
            {renderBackButton(true)}
            {renderListInfo()}
            {renderListContent()}
            {errorState && errorState.detail && errorState.status === "error" && !isLoading && (
              <View style={{ marginTop: 15 }}>
                <MessForm
                  message={{
                    detail: errorState.detail,
                  }}
                  status={errorState.status}
                />
              </View>
            )}
            {renderButtons(true, false)}
          </>
        );
      case "ownedNotShared":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            {renderListContent()}
            {errorState && errorState.detail && errorState.status === "error" && !isLoading && (
              <View style={{ marginTop: 15 }}>
                <MessForm
                  message={{
                    detail: errorState.detail,
                  }}
                  status={errorState.status}
                />
              </View>
            )}
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
              {t("text.lists.messages.listSharedForReading")}
            </Text>
            {renderSharedInfo()}
            {renderListContent(true)}
            {errorState && errorState.detail && errorState.status === "error" && !isLoading && (
              <View style={{ marginTop: 15 }}>
                <MessForm
                  message={{
                    detail: errorState.detail,
                  }}
                  status={errorState.status}
                />
              </View>
            )}
            {renderButtons(true, true, false, true)}
          </>
        );
      case "ownedSharedWrite":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            <Text style={[fontsStyles.text, { color: colorDark.textColor, marginTop: 10 }]}>
              {t("text.lists.messages.listSharedForWriting")}
            </Text>
            {renderSharedInfo()}
            {renderListContent(false)}
            {errorState && errorState.detail && errorState.status === "error" && !isLoading && (
              <View style={{ marginTop: 15 }}>
                <MessForm
                  message={{
                    detail: errorState.detail,
                  }}
                  status={errorState.status}
                />
              </View>
            )}
            {renderButtons(false, false, false, true)}
          </>
        );
      case "sharedWrite":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            <Text style={[fontsStyles.text, { color: colorDark.textColor, marginTop: 10 }]}>
              {t("text.lists.messages.listReceivedForWriting")}
            </Text>
            {renderSharedInfo()}
            {renderListContent()}
            {errorState && errorState.detail && errorState.status === "error" && !isLoading && (
              <View style={{ marginTop: 15 }}>
                <MessForm
                  message={{
                    detail: errorState.detail,
                  }}
                  status={errorState.status}
                />
              </View>
            )}
            {renderButtons(true, false, false, false, true)}
          </>
        );
      case "sharedRead":
        return (
          <>
            {renderBackButton()}
            {renderListInfo()}
            <Text style={[fontsStyles.text, { color: colorDark.textColor, marginTop: 10 }]}>
              {t("text.lists.messages.listReceivedForReading")}
            </Text>
            {renderSharedInfo()}
            {renderListContent(false)}
            {errorState && errorState.detail && errorState.status === "error" && !isLoading && (
              <View style={{ marginTop: 15 }}>
                <MessForm
                  message={{
                    detail: errorState.detail,
                  }}
                  status={errorState.status}
                />
              </View>
            )}
            {renderButtons(false, false, false, false, true)}
          </>
        );
      default:
        return <>{renderBackButton()}</>;
    }
  };

  return {
    renderContent,
  };
};

export default useExistingList;
