import { Text, View } from "react-native";

import { AddButton, Button, Layout } from "@/components";
import { selectProductsData, type Theme } from "@/store";
import { fontsStyles, globalStyles } from "@/styles/global.style";
import { KEYS } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { type MainNavigationProp } from "@/navigation";
import { colorDark } from "@/styles";
import { t } from "i18next";
import { useSelector } from "react-redux";

export function Home({ theme }: { theme: Theme }) {
  const navigate = useNavigation<MainNavigationProp>();
  // const listStatus = useSelector(selectProductsStatus);

  const listData = useSelector(selectProductsData);
  // const listError = useSelector(selectProductsError);

  // useEffect(() => {
  //   console.log(listData);
  // }, [listData]);

  //! Удалить
  const handleSaveToStorage = async () => {
    try {
      await AsyncStorage.setItem("storedData", "wda");
      console.log("Data saved to AsyncStorage.");
    } catch (error) {
      console.error("Error saving data to AsyncStorage:", error);
    }
  };

  const handleShowStorageData = async () => {
    try {
      const storedData = await AsyncStorage.getAllKeys();
      const filteredData = await AsyncStorage.multiGet([KEYS.USER.REFRESH_TOKEN, KEYS.USER.ACCESS_TOKEN]);
      console.log("Data retrieved from AsyncStorage:", storedData);
      console.log("Filtered data for specific keys:", filteredData);
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  const handleClearStorage = async () => {
    try {
      await AsyncStorage.removeItem(KEYS.USER.REFRESH_TOKEN);
      await AsyncStorage.removeItem(KEYS.USER.ACCESS_TOKEN);
      await AsyncStorage.removeItem("storedData");
      console.log("Data cleared from AsyncStorage.");
    } catch (error) {
      console.error("Error clearing data from AsyncStorage:", error);
    }
  };
  //! Удалить

  return (
    <Layout theme={theme}>
      <View style={globalStyles.container}>
        <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>{t("tabsLabels.home")}</Text>
        <Text style={[fontsStyles.text, { color: colorDark.textColor }]}>{t("text.home.yourLists")}:</Text>
        {/* Блок со списками */}
        <View style={{ marginTop: 10 }}>
          <AddButton onPress={() => navigate.navigate("List")} theme={theme} />
          {listData ? (
            <>
              {listData.owner.length > 0 && (
                <View>
                  {listData.owner.map((listItem, index) => (
                    <View key={`owner-${index}`}>
                      <Button
                        theme={theme}
                        style={{ marginTop: 25 }}
                        onPress={() =>
                          navigate.navigate("List", { listId: String(listItem.id), listName: listItem.name })
                        }
                      >
                        {listItem.name}
                      </Button>
                    </View>
                  ))}
                </View>
              )}
              {listData.shared.length > 0 && (
                <View>
                  <Text style={fontsStyles.subtitle}>Переданные списки</Text>
                  {listData.shared.map((listItem, index) => (
                    <View key={`shared-${index}`}>
                      <Button
                        theme={theme}
                        style={{ marginTop: 25 }}
                        onPress={() =>
                          navigate.navigate("List", { listId: String(listItem.id), listName: listItem.name })
                        }
                      >
                        {listItem.name}
                      </Button>
                    </View>
                  ))}
                </View>
              )}
            </>
          ) : null}
        </View>

        <View style={{ margin: 50 }}>
          <Button theme={theme} style={{ marginTop: 25 }} onPress={handleSaveToStorage}>
            Save to Storage
          </Button>
          <Button theme={theme} style={{ marginTop: 25 }} onPress={handleShowStorageData}>
            Show Storage Data
          </Button>
          <Button theme={theme} style={{ marginTop: 25 }} onPress={handleClearStorage}>
            Clear Storage
          </Button>

          <Button
            theme={theme}
            style={{ marginTop: 25 }}
            onPress={() => navigate.navigate("List", { listId: "1", listName: "Список" })}
          >
            List
          </Button>
        </View>
      </View>
    </Layout>
  );
}

export default Home;
