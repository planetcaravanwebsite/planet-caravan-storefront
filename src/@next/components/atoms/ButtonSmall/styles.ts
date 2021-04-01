import { media, styled } from "@styles";
import { Size } from "./types";

const padding = {
  md: "0.9rem 3.7rem",
  sm: "0.5rem 2rem",
};

const fontSize = (fontSize: string, smallFontSize: string) => ({
  md: fontSize,
  sm: smallFontSize,
});

export const Primary = styled.button<{
  color: "primary" | "secondary" | "third";
  fullWidth?: boolean;
  size: Size;
}>`
  background-color: ${props =>
    props.theme.button.colors[props.color].background};
  padding: ${props => padding[props.size]};
  border: none;
  margin:10px;
  transition: 0.3s;
  outline: none;
  cursor: pointer;
  color: ${props => props.theme.button.colors[props.color].color};
  width: ${props => (props.fullWidth ? "100%" : "auto")}

  &:hover {
    background-color: #F8EF24;
    color: rgb(33,18,94);
  }

  &:active {
    background-color: ${props =>
      props.theme.button.colors[props.color].activeBackground};
    box-shadow: -3px 3px 14px 0px rgba(129, 67, 67, 0.2);
  }

  &:disabled {
    background-color: ${props => props.theme.colors.disabled};

    &,
    &:hover {
      cursor: default;
    }
  }

  ${media.smallScreen`
    padding:  0.9rem 1rem;
    width: ${(props: { fullWidth: boolean }) =>
      props.fullWidth ? "100%" : "100px"};
  `}
`;

export const Secondary = styled(Primary)`
  box-shadow: inset 0px 0px 0px 3px
    ${props => props.theme.button.colors.secondary.color};
  border-left: 1px solid ${props => props.theme.button.colors.secondary.color};
  border-right: 1px solid ${props => props.theme.button.colors.secondary.color};
`;

export const Third = styled(Primary)`
  color: ${props => props.theme.button.colors[props.color].color};
  background-color: ${props =>
    props.theme.button.colors[props.color].background};
  &:disabled {
    color: ${props => props.theme.button.colors.primary.color};
  }
`;

export const Special = styled(Primary)`
  color: ${props => props.theme.button.colors[props.color].color};
  background-color: ${props =>
    props.theme.button.colors[props.color].background};
  &:disabled {
    color: ${props => props.theme.button.colors.primary.color};
    background-color: #e43024;
  }
`;

export const Text = styled.span<{ size: Size }>`
  display: inline-block;
  font-size: ${({
    size,
    theme: {
      button: { typography },
    },
  }) => fontSize(typography.fontSize, typography.smallFontSize)[size]};
  text-transform: uppercase;
  font-weight: ${props => props.theme.typography.boldFontWeight};
  line-height: ${props => props.theme.typography.baseLineHeight};
`;
