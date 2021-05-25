import { styled } from "@styles";

export const AddToCartSelection = styled.div`
  text-align: left;
`;

export const ProductNameHeader = styled.h3`
  text-transform: uppercase;
  // font-family: "Coda Caption";
  font-size: 2rem;
  line-height: 2rem;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const ProductPricing = styled.h4`
  font-weight: normal;
  font-size: 1.5rem;
  color: #999999;
  margin-bottom: ${props => props.theme.spacing.spacer};
`;

export const UndiscountedPrice = styled.span`
  text-decoration: line-through;
  color: ${props => props.theme.colors.baseFontColorSemiTransparent};
  font-size: ${props => props.theme.typography.smallFontSize};
`;

export const VariantPicker = styled.div`
  display: grid;
  margin-top: 20px;

  .react-select-wrapper,
  .input {
    width: 50%;
    margin-bottom: 1rem;
  }
`;

export const QuantityInput = styled.div`
  margin-top: 20px;
  padding-top: 20px;
`;

export const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
`;

export const DropsAt = styled.p`
  text-align: center;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 700;
`;
