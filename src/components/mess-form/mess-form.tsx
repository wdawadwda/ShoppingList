import { Text, View } from "react-native";
import { type MessFormProperties } from "./mess-form.type";
import { colorDark, darkStyles, fontsStyles, globalStyles } from "@/styles";

export const MessForm = ({ message, status }: MessFormProperties) => {
  return (
    <View
      style={
        status === "error"
          ? [darkStyles.containerAlert, globalStyles.containerAlert]
          : [darkStyles.containerSuccess, globalStyles.containerSuccess]
      }
    >
      {message.defaultAxios && (
        <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{message.defaultAxios}</Text>
      )}
      {message.username && (
        <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{message.username}</Text>
      )}
      {message.email && <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{message.email}</Text>}
      {message.password && (
        <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{message.password}</Text>
      )}
      {message.successMessage && (
        <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{message.successMessage}</Text>
      )}
      {message.detail && <Text style={[fontsStyles.text, { color: colorDark.textAlertColor }]}>{message.detail}</Text>}
    </View>
  );
};
