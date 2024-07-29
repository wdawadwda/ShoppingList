import { MessForm } from "@/components/mess-form";
import { Button, CustomProduct } from "@/components/ui";
import { type ProductCustom, type ProductInList } from "@/constants";
import { useAppDispatch, type Theme } from "@/store";
import { deleteCustomProduct, fetchCustompProducts } from "@/store/api";
import { t } from "i18next";
import { useState, type Dispatch } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { type MainNavigationProp } from "@/navigation";
import EditForm from "./edit-form";

export const EditDellProduct = ({
  currentProduct,
  setCurrentProduct,
  theme,
}: {
  currentProduct: ProductInList;
  setCurrentProduct: Dispatch<ProductInList | null>;
  theme: Theme;
}) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEddit, setIsEddit] = useState<boolean>(false);
  const navigation = useNavigation<MainNavigationProp>();

  const dispatch = useAppDispatch();

  const customProduct = currentProduct as ProductCustom;

  const handleDelete = (product: ProductCustom) => {
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
              await deleteCustomProduct(product.id, product.user);
              dispatch(fetchCustompProducts(product.user));
              navigation.navigate("Settings");
            } catch (error) {
              setError(t("defaultMessage.defaultError"));
            } finally {
              setIsLoading(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <>
      {error && (
        <View style={{ marginTop: 25, marginBottom: 10 }}>
          <MessForm message={{ detail: error }} status="error" />
        </View>
      )}
      {isEddit ? (
        <EditForm
          setIsLoading={setIsLoading}
          setIsEddit={setIsEddit}
          setError={setError}
          isLoading={isLoading}
          customProduct={customProduct}
          theme={theme}
          dispatch={dispatch}
          navigation={navigation}
        />
      ) : (
        <>
          <Button style={styles.buttonTop} theme={theme} onPress={() => setCurrentProduct(null)}>
            <Text>{t("defaultMessage.reset")}</Text>
          </Button>
          <CustomProduct product={customProduct} theme={theme} />
          <View style={styles.buttonRow}>
            <Button
              theme={theme}
              style={styles.button}
              isLoading={isLoading}
              disabled={isLoading}
              onPress={() => handleDelete(customProduct)}
            >
              <Text>{t("defaultMessage.delete")}</Text>
            </Button>
            <Button
              theme={theme}
              isLoading={isLoading}
              disabled={isLoading}
              onPress={() => setIsEddit(true)}
              style={styles.button}
            >
              <Text>{t("defaultMessage.edit")}</Text>
            </Button>
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  button: {
    width: "45%",
  },
  buttonTop: {
    marginBottom: 25,
  },
});

export default EditDellProduct;
