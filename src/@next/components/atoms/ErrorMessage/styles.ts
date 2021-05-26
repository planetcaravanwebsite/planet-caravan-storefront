import { styled } from "@styles";

export const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.input.labelFontSize};
`;

export const ErrorParagraph = styled.p`
  margin: 0;
  background: #e43024;
  padding: 15px;
  color: #fff;
  font-size: 18px;
  text-align: center;
`;

ErrorMessage.displayName = "S.ErrorMessage";
