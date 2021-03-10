import React from "react";

// import NoPhoto from "images/no-photo.svg";
import LoadingImg from "images/loading-image.png";
import { IProps } from "./types";

export const LoadingImage: React.FC<IProps> = ({
  alt = "placeholder",
}: IProps) => {
  // console.log("loadingimage");
  // console.log(LoadingImg);
  return <img src={LoadingImg} alt={alt} />;
};
