import { Text } from "react-native";

import { Layout } from "@/components";
import { Theme } from "@/store";
import { fontsStyles } from "@/styles";

export function Home({ theme }: { theme: Theme }) {
  const textColor = theme === "dark" ? "white" : "black";

  return (
    <Layout theme={theme}>
      <Text style={[fontsStyles.text, { color: textColor }]}>Home</Text>
    </Layout>
  );
}

export default Home;
