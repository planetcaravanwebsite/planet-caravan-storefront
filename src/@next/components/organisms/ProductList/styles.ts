import { media, styled } from "@styles";

export const List = styled.div<{numPerRow: number}>`
  display: grid;

  grid-template-columns: ${props =>
    props.numPerRow === 3 ? "1fr 1fr 1fr" : "1fr 1fr 1fr 1fr;"};
  grid-gap: 0; // 2rem;

  ${media.largeScreen`
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5rem;
  `}

  ${media.smallScreen`
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;
