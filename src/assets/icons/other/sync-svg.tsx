import React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomSvgProps } from "../icons.type";

export function SyncSvgComponent(props: CustomSvgProps) {
  return (
    <Svg fill="currentColor" viewBox="0 0 375 375" {...props}>
      <Path d="M320.1 54.9C286.1 21 239.2 0 187.5 0 135.7 0 88.9 21 54.9 54.9S0 135.8 0 187.5h37.5c0-82.7 67.3-150 150-150 41.2 0 78.7 16.9 105.9 44.1l-49.7 49.7H375V0l-54.9 54.9zM337.5 187.5c0 82.7-67.3 150-150 150-41.3 0-78.8-16.9-105.9-44.1l49.7-49.7H0V375l54.9-54.9C88.8 354 135.7 375 187.5 375c51.7 0 98.6-21 132.6-54.9C354 286.2 375 239.3 375 187.5h-37.5z" />
    </Svg>
  );
}

export default SyncSvgComponent;
