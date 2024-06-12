import { StyleSheet, Text, View } from "react-native";
import { Button } from "../buttons/button";
import { themeActions, useAppDispatch, type UserTheme, type Theme } from "@/store";
import { Feather } from "@expo/vector-icons";
import { colorDark } from "@/styles";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectUser, userActions } from "@/store/user";
import { t } from "i18next";
import { saveThemeToServer } from "@/store/api";
import { MessForm } from "@/components/mess-form";
import { type MessageType } from "@/constants";

export const ThemeToggleButtons = ({ theme }: { theme: Theme }) => {
  const user = useSelector(selectUser);
  const [userThemeforSave, setUserThemeforSave] = useState(user?.user_theme);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<MessageType>({ type: "idle", text: null });

  const dispatch = useAppDispatch();
  const setTheme = (newTheme: Theme) => {
    dispatch(themeActions.setTheme(newTheme));
  };

  const handleSaveTheme = async (userId: number, theme: UserTheme) => {
    setLoading(true);
    try {
      if (user && userThemeforSave) {
        const responseData = await saveThemeToServer(userId, theme);
        dispatch(userActions.updateUserTheme(responseData.user_theme));
        setMessage({
          type: "success",
          text: t("defaultMessage.successSavingTheme", { theme: responseData.user_theme }),
        });
      }
    } catch (error) {
      console.error("Error saving theme", error);
      setMessage({ type: "error", text: t("defaultMessage.errorSavingTheme") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {message.type !== "idle" && message.text && (
        <MessForm message={{ defaultAxios: message.text }} status={message.type} />
      )}
      <Button
        disabled={theme === "light"}
        style={[styles.button, styles.sunButton]}
        onPress={() => {
          setTheme("light");
          setUserThemeforSave("light");
          setMessage({ type: "idle", text: null });
        }}
        theme={theme}
      >
        <Feather name="sun" size={25} color={colorDark.textColor} />
      </Button>
      <Button
        disabled={theme === "dark"}
        style={[styles.button, styles.moonButton]}
        onPress={() => {
          setTheme("dark");
          setUserThemeforSave("dark");
          setMessage({ type: "idle", text: null });
        }}
        theme={theme}
      >
        <Feather name="moon" size={25} color={colorDark.textColor} />
      </Button>
      <Button
        style={[styles.button, styles.autoButton]}
        onPress={() => {
          setUserThemeforSave("auto");
          setMessage({ type: "idle", text: null });
        }}
        theme={theme}
        disabled={user?.user_theme === "auto" || userThemeforSave === "auto"}
      >
        <Text>Auto</Text>
      </Button>
      {user && user.id && userThemeforSave ? (
        <Button
          disabled={loading}
          isLoading={loading}
          onPress={() => handleSaveTheme(user.id, userThemeforSave)}
          theme={theme}
        >
          {t("buttonLabels.saveTheme")}
        </Button>
      ) : null}
    </View>
  );
};

export default ThemeToggleButtons;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    height: 70,
    marginBottom: 5,
  },
  sunButton: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  moonButton: {
    borderRadius: 0,
  },
  autoButton: {
    flexDirection: "row",
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});
