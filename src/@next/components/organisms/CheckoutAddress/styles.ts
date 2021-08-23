import { styled } from "@styles";

export const Wrapper = styled.div``;

export const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid
    ${props => props.theme.colors.baseFontColorTransparent};
  margin: 30px 0;
`;

export const Title = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
`;

export const TitleInline = styled.h3`
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding: 0 0 1.6rem 0;
  display: inline;
`;

export const SubTitle = styled.h3`
  font-weight: 400;
  padding: 0 0 1.6rem 0;
  display: inline;
  margin-left: 15px;
  font-size: 1rem;
`;

export const MTop = styled.div`
  margin-top: 15px;
`;
