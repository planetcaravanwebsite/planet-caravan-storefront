import React from "react";

import NoPhoto from "images/no-photo.svg";
import { IProps } from "./types";
// import LoadingImg from "images/loading-image.png";

export const PlaceholderImage: React.FC<IProps> = ({
  alt = "placeholder",
}: IProps) => {
  console.log("placeholderimage");
  console.log(NoPhoto);
  return <img src={NoPhoto} alt={alt} />;
};
