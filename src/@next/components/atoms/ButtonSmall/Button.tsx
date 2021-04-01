import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * The basic button
 */
export const ButtonSmall: React.FC<IProps> = ({
  color = "primary",
  btnRef,
  children,
  testingContext,
  testingContextId,
  fullWidth = false,
  size = "md",
  outOfStock,
  ...props
}: IProps) => {
  let ButtonWithTheme = color === "primary" ? S.Primary : S.Secondary;

  if (color === "primary") {
    ButtonWithTheme = S.Primary;
  } else if (color === "secondary") {
    ButtonWithTheme = S.Secondary;
  } else if (outOfStock) {
    ButtonWithTheme = S.Special;
  } else {
    ButtonWithTheme = S.Third;
  }

  return (
    <ButtonWithTheme
      data-test={testingContext}
      data-test-id={testingContextId}
      color={color}
      fullWidth={fullWidth}
      size={size}
      ref={btnRef}
      {...props}
    >
      <S.Text size={size}>{children}</S.Text>
    </ButtonWithTheme>
  );
};
