import { Theme } from "@/store";
import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
  theme: Theme;
}
