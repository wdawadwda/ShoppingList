import { Text, View } from "react-native";
import { Theme, useAppDispatch } from "@/store";
import { Layout } from "@/components";
import { fontsStyles, globalStyles } from "@/styles";
import { t } from "i18next";
import { Button } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser, userActions } from "@/store/user";
import { type MainNavigationProp } from "@/navigation";

export function User({ theme }: { theme: Theme }) {
  const navigation = useNavigation<MainNavigationProp>();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <Layout theme={theme}>
      <View style={globalStyles.container}>
        {user ? (
          <>
            <Text
              style={[fontsStyles.subtitle, fontsStyles.defaultColor]}
            >{`${t("other.greetings")} ${user.username}`}</Text>
            <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>email: {user.email}</Text>
            <Text style={[fontsStyles.text, fontsStyles.defaultColor]}>ID: {user.id}</Text>
            <Button style={{ marginTop: 20 }} theme={theme} onPress={() => dispatch(userActions.logout())}>
              {t("buttonLabels.regAuth.logout")}
            </Button>
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

export default User;
