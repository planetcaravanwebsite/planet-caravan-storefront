import { media, styled } from "@styles";

export const Wrapper = styled.div`
  padding-left: 25px;
`;

export const Title = styled.h2`
  text-align: left;
  font-family: "Coda Caption";
  margin-bottom: 18px;
  font-size: 1.4rem;
`;

export const AttributeList = styled.ul`
  columns: 2;
  column-width: auto;

  ${media.largeScreen`
    column-width: 100%;
    columns: 1;
  `};
  width: 100%;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 30px;
    font-size: ${props => props.theme.typography.h4FontSize};
  }

  li::before {
    content: "•";
    margin-right: 20px;
    color: ${props => props.theme.colors.listBullet};
  }
`;

export const Tabs = styled.div`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  border-bottom: 1px solid ${props => props.theme.colors.tabsBorder};
  margin-bottom: 40px;
  overflow: hidden;
`;

export const TabTitle = styled.div<{ active?: boolean }>`
  cursor: pointer;
  min-width: 230px;
  font-size: ${props => props.theme.typography.h3FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  letter-spacing: 0.02em;
  color: ${props => props.active && props.theme.colors.tabTitle};
  border-bottom-width: 4px;
  border-bottom-style: solid;
  border-bottom-color: ${props =>
    props.active ? props.theme.colors.tabTitle : "transparent"};
  padding-bottom: 25px;
  margin-right: 60px;

  ${media.smallScreen`
    font-size: ${(props: any) => props.theme.typography.h4FontSize};
    min-width: 150px;
    margin-right: 20px;
  `};
`;

export const TabTitleHidden = styled.div<{ active?: boolean }>`
  display: none;
  cursor: pointer;
  min-width: 230px;
  font-size: ${props => props.theme.typography.h3FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  letter-spacing: 0.02em;
  color: ${props => props.active && props.theme.colors.tabTitle};
  border-bottom-width: 4px;
  border-bottom-style: solid;
  border-bottom-color: ${props =>
    props.active ? props.theme.colors.tabTitle : "transparent"};
  padding-bottom: 25px;
  margin-right: 60px;

  ${media.smallScreen`
    font-size: ${(props: any) => props.theme.typography.h4FontSize};
    min-width: 150px;
    margin-right: 20px;
  `};
`;

export const AttributeName = styled.span`
  color: ${props => props.theme.colors.listAttributeName};
`;
