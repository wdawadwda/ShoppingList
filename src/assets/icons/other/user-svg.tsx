import React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomSvgProps } from "../icons.type";

export function UserSvgComponent(props: CustomSvgProps) {
  return (
    <Svg viewBox="0 0 415.744 415.744" fill="currentColor" {...props}>
      <Path d="M207.872 0c-53.76 0-97.28 43.52-97.28 97.28s43.52 97.28 97.28 97.28 97.28-43.52 97.28-97.28S261.632 0 207.872 0zM245.76 205.824h-75.776c-76.288 0-138.24 61.952-138.24 138.24v56.32c0 8.704 6.656 15.36 15.36 15.36H368.64c8.704 0 15.36-6.656 15.36-15.36v-56.32c0-76.288-61.952-138.24-138.24-138.24z" />
    </Svg>
  );
}

export default UserSvgComponent;
