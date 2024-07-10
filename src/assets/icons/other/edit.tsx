import React from "react";
import Svg, { Path } from "react-native-svg";
import { CustomSvgProps } from "../icons.type";

export function EditSvgComponent(props: CustomSvgProps) {
  return (
    <Svg fill="currentColor" viewBox="0 0 512 512" {...props}>
      <Path d="m495.7 135.7-79.4-87.4c-7.7-8.5-22.5-8.5-30.2 0l-49 53.9V31.4c0-11.3-9.1-20.4-20.4-20.4H156.2c-5.2 0-10.2 2-14 5.5l-124.8 117c-4.1 3.9-6.4 9.3-6.4 14.9v332.2c0 11.3 9.1 20.4 20.4 20.4h285.2c11.3 0 20.4-9.1 20.4-20.4V339.1c0-.5 0-.9-.1-1.4l158.7-174.6c7.2-7.7 7.2-19.6.1-27.4zM135.8 78.5v58H74l61.8-58zm160.4 381.7H51.8V177.3h104.4c11.3 0 20.4-9.1 20.4-20.4V51.8h119.6v95.3L177.3 277.9c-2.6 2.9-4.4 6.5-5 10.3L153.8 398c-1.1 6.7 1.1 13.6 6.1 18.2 7.7 7.2 17.1 5.4 18.6 5.1l97.9-22.4c8.7-.8 19.8-16.4 19.8-16.4v77.7zM261 360.6l-61.9 14.1 12.4-73.7L401.1 92.4l51.8 57L261 360.6z" />
    </Svg>
  );
}

export default EditSvgComponent;
