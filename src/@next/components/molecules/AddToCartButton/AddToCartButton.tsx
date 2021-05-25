import React from "react";
import { Button } from "@components/atoms";

export interface IAddToCartButton {
  disabled: boolean;
  onSubmit: () => void;
  specialColor: boolean;
  message: string;
}

export const AddToCartButton: React.FC<IAddToCartButton> = ({
  onSubmit,
  disabled,
  specialColor,
  message,
}) => {
  return (
    <Button
      fullWidth
      testingContext="addProductToCartButton"
      onClick={onSubmit}
      color="third"
      disabled={disabled}
      outOfStock={specialColor}
    >
      {specialColor ? "Out of Stock" : (
          message || "Add to Cart"
      )}
    </Button>
  );
};

AddToCartButton.displayName = "AddToCartButton";
export default AddToCartButton;
