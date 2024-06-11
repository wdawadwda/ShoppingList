import { Text, View } from "react-native";

import { Layout } from "@/components";
import { Theme } from "@/store";
import { fontsStyles, globalStyles } from "@/styles/global.style";
import ThemeToggleButton from "@/components/ui/theme-switcher/themeSwitcher";

export function Home({ theme }: { theme: Theme }) {
  const textColor = theme === "dark" ? "white" : "black";

  return (
    <Layout theme={theme}>
      <View style={globalStyles.container}>
        <Text style={[fontsStyles.text, { color: textColor }]}>Home</Text>
        <ThemeToggleButton theme={theme} />
      </View>
    </Layout>
  );
}

export default Home;
