import { styled } from "@styles";

export const Wrapper = styled.div`
  max-width: 100vw;
  overflow-x: hidden;
  overflow-y: scroll; /* has to be scroll, not auto */
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  width: 410px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: center;
  z-index: 7;
  box-shadow: 6px 0px 30px rgba(0, 0, 0, 0.15);
`;
export const Header = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  margin-bottom: 4rem;
  padding: 0;

  font-weight: ${props => props.theme.typography.boldFontWeight};
  font-size: ${props => props.theme.typography.h3FontSize};
`;
export const SmHeader = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding-bottom: 1.5rem;
`;

export const SmHeader2 = styled.div`
  font-size: ${props => props.theme.typography.h4FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  padding-bottom: 0.5rem;
`;

export const SubCat = styled.div`
  width: 100%;
  margin-left: 5rem;
  margin-bottom: 20px;
  ul {
    li {
      margin-bottom: 5px;
    }
  }
`;
