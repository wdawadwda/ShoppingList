import { ExistingList, Layout, ListAddProduct, NewList } from "@/components";
import { type ProductsListData } from "@/constants";
import { selectProductListById, type Theme } from "@/store";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { type ListRouteParamsWithoutData, type ListRouteParamsWithData } from "@/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store.types";

const defaultProductData: any = {
  id: "",
  name: "",
  products: [],
};

export const List = ({ theme }: { theme: Theme }) => {
  const { i18n } = useTranslation();
  const route = useRoute<ListRouteParamsWithoutData | ListRouteParamsWithData>();
  const { listId, listName } = route.params || {};

  const productList = useSelector((state: RootState) => selectProductListById(state, listId));

  const [showInputAdd, setShowInputAdd] = useState<boolean>(false);
  const [productData, setProductData] = useState<ProductsListData>(productList || defaultProductData);
  const [listTitle, setListTitle] = useState<string>("");

  const handleAddClick = () => setShowInputAdd(true);
  const handleAddName = (data: ProductsListData) => setProductData({ ...data, name: listTitle });

  // useEffect(() => {
  //   console.log(productData);
  // }, [productData]);

  if (showInputAdd) {
    return (
      <Layout theme={theme}>
        <ListAddProduct
          setshowInputAdd={setShowInputAdd}
          language={i18n.language as "ru" | "en"}
          setProductData={setProductData}
          theme={theme}
          productData={productData}
        />
      </Layout>
    );
  }

  return (
    <Layout theme={theme}>
      <View>
        {listId && listName ? (
          <ExistingList
            listId={listId}
            listName={listName}
            productData={productData}
            setProductData={setProductData}
            handleAddClick={handleAddClick}
            theme={theme}
            language={i18n.language as "ru" | "en"}
            isNewList={false}
          />
        ) : (
          <NewList
            listId={listId}
            productData={productData}
            setProductData={setProductData}
            listTitle={listTitle}
            setListTitle={setListTitle}
            handleAddName={handleAddName}
            handleAddClick={handleAddClick}
            theme={theme}
            language={i18n.language as "ru" | "en"}
          />
        )}
      </View>
    </Layout>
  );
};

export default List;
