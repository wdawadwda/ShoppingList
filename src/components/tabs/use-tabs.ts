import { useState } from "react";

export const useTabs = <T>(initialTab: T | null = null) => {
  const [activeTab, setActiveTab] = useState<T | null>(initialTab);

  const handleTabClick = (tab: T | null) => {
    setActiveTab(tab);
  };

  return { activeTab, handleTabClick };
};
