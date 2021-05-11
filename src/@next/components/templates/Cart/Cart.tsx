import React from "react";

import { Pelican } from "@temp/components";
import { Container } from "../Container";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Cart template for cart page with list of products added by user.
 */
const Cart: React.FC<IProps> = ({
  // @ts-ignore
  hasPelican,
  breadcrumbs,
  title,
  cartHeader,
  cartFooter,
  cart,
  button,
}: IProps) => {
  return (
    <Container>
      <S.Wrapper>
        <S.Breadcrumbs>{breadcrumbs}</S.Breadcrumbs>
        <S.Title>{title}</S.Title>
        <S.CartHeader>{cartHeader}</S.CartHeader>
        <S.Cart>{cart}</S.Cart>
        {hasPelican && <Pelican />}
        <S.CartFooter>{cartFooter}</S.CartFooter>
        <S.ProceedButton>{button}</S.ProceedButton>
      </S.Wrapper>
    </Container>
  );
};

export { Cart };
