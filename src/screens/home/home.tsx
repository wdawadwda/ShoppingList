import { StyleSheet, Text, View } from "react-native";

import { Button, Layout, MessForm } from "@/components";
import { selectProductsData, selectProductsError, selectProductsStatus, type Theme } from "@/store";
import { fontsStyles, globalStyles } from "@/styles/global.style";
import { t } from "i18next";
import { useSelector } from "react-redux";
import { SortedLists } from "@/components/sorted-lists/sorted-lists";
import { selectUser } from "@/store/user";
import { MainNavigationProp } from "@/navigation";
import { useNavigation } from "@react-navigation/native";
import i18n from "@/i118/i18n";

export function Home({ theme }: { theme: Theme }) {
  const listData = useSelector(selectProductsData);
  const user = useSelector(selectUser);
  const navigation = useNavigation<MainNavigationProp>();
  const listError = useSelector(selectProductsError);
  const listStatus = useSelector(selectProductsStatus);

  return (
    <Layout theme={theme}>
      <View style={globalStyles.container}>
        <Text style={[fontsStyles.subtitle, fontsStyles.defaultColor]}>{t("tabsLabels.home")}</Text>

        {listStatus === "error" && listError ? (
          <MessForm
            message={{
              detail:
                typeof listError.detail === "object"
                  ? listError?.detail?.[i18n?.language as keyof typeof listError.detail] || listError?.message
                  : listError?.detail || listError?.message,
            }}
            status={listStatus}
          />
        ) : null}

        {user ? (
          <>
            <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>{t("text.home.yourLists")}:</Text>
            <View style={styles.containerForList}>
              <SortedLists listData={listData} theme={theme} />
            </View>
          </>
        ) : (
          <Button
            theme={theme}
            onPress={() => navigation.navigate("RegAuth")}
          >{`${t("buttonLabels.regAuth.login")} / ${t("buttonLabels.regAuth.register")}`}</Button>
        )}
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  containerForList: { marginTop: 10, paddingBottom: 20 },
});

export default Home;
