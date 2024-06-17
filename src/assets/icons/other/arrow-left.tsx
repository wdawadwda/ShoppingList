import React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomSvgProps } from "../icons.type";

export function ArrowLeftComponent(props: CustomSvgProps) {
  return (
    <Svg viewBox="0 0 486.65 486.65" fill="currentColor" {...props}>
      <Path d="M202.114 444.648a30.365 30.365 0 0 1-21.257-9.11L8.982 263.966c-11.907-11.81-11.986-31.037-.176-42.945l.176-.176L180.858 49.274c12.738-10.909 31.908-9.426 42.817 3.313 9.736 11.369 9.736 28.136 0 39.504L73.36 242.406l151.833 150.315c11.774 11.844 11.774 30.973 0 42.817a30.368 30.368 0 0 1-23.079 9.11z" />
      <Path d="M456.283 272.773H31.15c-16.771 0-30.367-13.596-30.367-30.367s13.596-30.367 30.367-30.367h425.133c16.771 0 30.367 13.596 30.367 30.367s-13.596 30.367-30.367 30.367z" />
    </Svg>
  );
}

export default ArrowLeftComponent;
