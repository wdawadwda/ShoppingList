import { Text, View } from "react-native";

import { Button, Layout } from "@/components";
import { selectProductsData, type Theme } from "@/store";
import { fontsStyles, globalStyles } from "@/styles/global.style";
import { KEYS } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colorDark } from "@/styles";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { SortedLists } from "@/components/sorted-lists/sorted-lists";

export function Home({ theme }: { theme: Theme }) {
  const listData = useSelector(selectProductsData);

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
        <View style={{ marginTop: 10 }}>
          <SortedLists listData={listData} theme={theme} />
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
        </View>
      </View>
    </Layout>
  );
}

export default Home;
