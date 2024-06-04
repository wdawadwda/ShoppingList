import { Text } from "react-native";
import { Theme } from "@/store";
import { Layout } from "@/components";

export function User({ theme }: { theme: Theme }) {
  return (
    <Layout theme={theme}>
      <Text>User</Text>
    </Layout>
  );
}

export default User;
