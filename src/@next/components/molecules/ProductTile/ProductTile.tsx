// @ts-nocheck

import React from "react";

import { TaxedMoney } from "@components/containers";
import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
  // console.log(product);
  const image = product.images
    ? product.images[0] && product.images[0].url
    : product.thumbnail && product.thumbnail.url;
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  return (
    <S.Wrapper id={product.id}>
      <S.Image data-test="productThumbnail">
        <CachedImage alt={product.name} url={image} />
      </S.Image>
      <S.Title data-test="productTile">{product.name}</S.Title>
      <S.Price data-test="productPrice">
        <TaxedMoney taxedMoney={price} />
      </S.Price>
      {!product.isAvailable ? <S.OutOfStock>Out of Stock</S.OutOfStock> : null}
    </S.Wrapper>
  );
};
