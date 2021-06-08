import React from "react";

// import NoPhoto from "images/no-photo.svg";
import PlaceholderImg from "images/placeholder.png";
import { IProps } from "./types";

export const PlaceholderImage: React.FC<IProps> = ({
  alt = "placeholder",
}: IProps) => {
  // console.log("placeholderimage");
  // console.log(NoPhoto);
  return <img src={PlaceholderImg} alt={alt} />;
};
