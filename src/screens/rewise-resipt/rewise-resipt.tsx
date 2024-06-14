import { Layout } from "@/components";
import { Theme } from "@/store";
import { colorDark, fontsStyles } from "@/styles";
import { Text, View } from "react-native";

export function Resipt({ theme }: { theme: Theme }) {
  return (
    <Layout theme={theme}>
      <View>
        <Text style={[fontsStyles.subtitle, { color: colorDark.textColor }]}>Проверка чеков</Text>
      </View>
    </Layout>
  );
}

export default Resipt;
