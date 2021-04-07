import { media, styled } from "@styles";
import { css } from "styled-components";

const textProps = css`
  font-size: ${props => props.theme.typography.baseFontSize};
  margin: 0 0 0.5rem 0;
  text-align: center;
  @media screen and (max-width: 750px) {
    font-size: 1.1rem;
  }
`;

export const Wrapper = styled.div`
  background: none;
  // padding: 2.5rem;
  text-align: center;
  max-height: 30rem;
  transition: 0.3s;

  :hover {
    background-color: #efefef;
  }

  ${media.largeScreen`
    padding: 1.8rem;
  `}

  ${media.smallScreen`
    padding: 0;
  `}
`;

export const Title = styled.h4`
  // font-family: Oswald;
  text-transform: uppercase;
  font-weight: bold;
  ${textProps};
  padding: 0 10px;
`;

export const Price = styled.p`
  ${textProps}
`;

export const Image = styled.div`
  width: auto;
  height: auto;
  max-width: 100%;
  padding: 10px 15px;

  > img {
    width: auto;
    height: auto;
    max-width: 100%;
  }
`;

export const OutOfStock = styled.div`
  width: auto;
  height: auto;
  max-width: 100%;
  padding-bottom: 10px;
  color: red;
`;
