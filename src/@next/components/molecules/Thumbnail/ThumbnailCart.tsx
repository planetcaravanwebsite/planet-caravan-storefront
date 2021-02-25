import React from "react";

import { maybe } from "@utils/misc";

import { LoadingImage } from "@components/atoms";
import { CachedImage } from "..";
import { IProps } from "./types";

export const ThumbnailCart: React.FC<IProps> = ({
  image,
  source,
  children,
  ...props
}: IProps) => {
  const { thumbnail, thumbnail2x } = source;

  console.log(thumbnail);
  console.log(image);

  const displayImage = image;

  if (!thumbnail && !thumbnail2x) {
    return <LoadingImage />;
  }

  return (
    <CachedImage
      {...props}
      url={maybe(() => displayImage)}
      url2x={maybe(() => displayImage)}
      alt={maybe(() => (thumbnail!.alt ? thumbnail!.alt : ""), "")}
    >
      {children}
    </CachedImage>
  );
};
