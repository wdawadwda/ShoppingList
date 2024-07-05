import React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomSvgProps } from "../icons.type";

export function PlusComponent(props: CustomSvgProps) {
  return (
    <Svg viewBox="0 0 60.364 60.364" fill="currentColor" {...props}>
      <Path d="m54.454 23.18-18.609-.002-.001-17.268a5.91 5.91 0 1 0-11.819 0v17.269L5.91 23.178a5.91 5.91 0 0 0 0 11.819h18.115v19.457a5.91 5.91 0 0 0 11.82.002V34.997h18.611a5.908 5.908 0 0 0 5.908-5.907 5.906 5.906 0 0 0-5.91-5.91z" />
    </Svg>
  );
}

export default PlusComponent;
