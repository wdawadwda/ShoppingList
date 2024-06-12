import { View } from "react-native";
import { Theme } from "../../store/theme/theme.type";
import { Loader } from "../ui";
import { darkStyles, globalStyles, lightStyles } from "@/styles";

export const LoaderFetchUser = ({ theme }: { theme: Theme }) => {
  return (
    <View style={[theme === "dark" ? darkStyles.container : lightStyles.container, globalStyles.container]}>
      <Loader theme={theme} size={100} />
    </View>
  );
};

export default LoaderFetchUser;
