/* tslint:disable */
import React from "react";

import { TaxedMoney } from "@components/containers";
import { CachedImage } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

export const ProductTile: React.FC<IProps> = ({ product }: IProps) => {
  const price =
    product.pricing &&
    product.pricing.priceRange &&
    product.pricing.priceRange.start
      ? product.pricing.priceRange.start
      : undefined;

  return (
    <S.Wrapper>
      <S.Image data-test="productThumbnail">
        <CachedImage alt={product.name} url={product.images[0].url} />
      </S.Image>
      <S.Title data-test="productTile">{product.name}</S.Title>
      <S.Price data-test="productPrice">
        <TaxedMoney taxedMoney={price} />
      </S.Price>
    </S.Wrapper>
  );
};
