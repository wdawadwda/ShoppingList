import { View } from "react-native";

import { Button, Layout } from "@/components";
import { Theme } from "@/store";
import { globalStyles } from "@/styles/global.style";
import { KEYS } from "@/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@/store/user";
import { useEffect } from "react";

export function Home({ theme }: { theme: Theme }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

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
      // console.log(user);
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
  // useEffect(() => {
  //   console.log(user);
  // }, []);
  return (
    <Layout theme={theme}>
      <View style={globalStyles.container}>
        {/*
        {!user && (
          <Button
            theme={theme}
            onPress={() => navigation.navigate("RegAuth" as never)}
          >{`${t("buttonsTitles.regAuth.login")} / ${t("buttonsTitles.regAuth.reg")}`}</Button>
        )}
        {user && (
          <Button theme={theme} onPress={() => dispatch(userActions.logout())}>
            Logout
          </Button>
        )}
        */}
        {/* <Button
          theme={theme}
          onPress={() => navigation.navigate("RegAuth" as never)}
        >{`${t("buttonsTitles.regAuth.login")} / ${t("buttonsTitles.regAuth.reg")}`}</Button> */}
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
          {/* <Button theme={theme} style={{ marginTop: 25 }} onPress={handleShowUser}>
            Show User
          </Button> */}
        </View>
      </View>
    </Layout>
  );
}

export default Home;
