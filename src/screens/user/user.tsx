import { Text, View } from "react-native";
import { Theme, useAppDispatch } from "@/store";
import { Layout } from "@/components";
import { colorDark, fontsStyles, globalStyles } from "@/styles";
import { t } from "i18next";
import { Button } from "@/components";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser, userActions } from "@/store/user";

export function User({ theme }: { theme: Theme }) {
  const navigation = useNavigation();
  const user = useSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <Layout theme={theme}>
      <View style={globalStyles.container}>
        {!user && (
          <Button
            theme={theme}
            onPress={() => navigation.navigate("RegAuth" as never)}
          >{`${t("buttonLabels.regAuth.login")} / ${t("buttonLabels.regAuth.register")}`}</Button>
        )}
        {user && (
          <>
            <Text
              style={[fontsStyles.subtitle, { color: colorDark.textColor }]}
            >{`${t("other.greetings")} ${user.username}`}</Text>
            <Text style={[fontsStyles.text, { color: colorDark.textColor, textAlign: "center" }]}>{user.email}</Text>
            <Button style={{ marginTop: 20 }} theme={theme} onPress={() => dispatch(userActions.logout())}>
              {t("buttonLabels.regAuth.logout")}
            </Button>
          </>
        )}
      </View>
    </Layout>
  );
}

export default User;
