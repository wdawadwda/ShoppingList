import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { type UseRedirectLogicProps } from "./tabs.types";

export const useRedirectLogic = ({ content, redirectedRef, handleTabClick, onUnmountValue }: UseRedirectLogicProps) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (content && content.type === "redirect" && !redirectedRef.current) {
      navigation.navigate(content.screen as never);
      redirectedRef.current = true;
      handleTabClick(onUnmountValue);
    } else {
      redirectedRef.current = false;
    }
  }, [content, navigation, handleTabClick, onUnmountValue]);

  useEffect(() => {
    return () => {
      redirectedRef.current = false;
    };
  }, []);
};
