import React, { useState, useEffect } from "react";

import { useCart } from "@saleor/sdk";

import { media, styled } from "@styles";

import AddToCartButton from "../../@next/components/molecules/AddToCartButton";

const API_URL = process.env.API_URI || "/graphql/";

export interface PelicanInterface {
  // onAddToCart(variantId: string, quantity?: number): void;
}

export const Wrapper = styled.div`
  margin: 30px 0 100px 0;
`;

export const CenterDiv = styled.div`
  margin: 0 auto;
`;

export const FLeft = styled.div`
  float: left;
`;

export const ButtonWrapper = styled.div`
  float: left;
  margin-left: 20px;
`;

export const Container = styled.div`
  border: 1px gray solid;
  width: ${props => `${props.theme.container.width}px`};
  max-width: 100vw;
  margin: 0 auto 20px auto;
  padding: 0 ${props => props.theme.spacing.spacer};
  ${media.xxxLargeScreen`
    width: 40%;      
  `}
  ${media.largeScreen`
    width: 90%;      
  `}
`;

export const Pelican: React.FC<PelicanInterface> = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [anyData, setAnyData] = useState(false);
  const [pelicanData, setPelicanData] = useState({
    products: {
      edges: [
        {
          node: {
            id: {},
            name: {},
            pricing: {
              priceRange: {
                start: {
                  net: {
                    amount: {},
                  },
                },
              },
            },
            variants: [
              {
                id: {},
                name: {},
              },
            ],
          },
        },
      ],
    },
  });

  const queryData = async () => {
    const query = JSON.stringify({
      query: `
      {
    products(first: 1, filter: { search: "pelican" }) {
      edges {
        node {
          id
          name
          thumbnail(size: 100) {
            url
            alt
          }
          pricing {
            priceRange {
              start {
                net {
                  amount
                }
              }
            }
          }
          variants {
            id
            name
          }
        }
      }
    }
  }
    `,
    });

    const response = await fetch(API_URL, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: query,
    });

    const responseJson = await response.json();
    return responseJson.data;
  };

  const fetchData = async () => {
    const res = await queryData();
    setPelicanData(res);
    if (res.products.edges.length > 0) {
      setAnyData(true);
    }
    // console.log(res);
  };

  useEffect(() => {
    let mounted = true;
    fetchData().then(r => {
      if (mounted) {
        setIsFetched(true);
      }
    });
    // eslint-disable-next-line no-return-assign
    return () => (mounted = false);
  }, [isFetched]);

  const { addItem } = useCart();

  const handleAddToCart = (variantId, quantity) => {
    // console.log("adding %o %o", variantId, quantity);
    addItem(variantId, quantity);
  };

  if (!isFetched) {
    return (
      <div>loading...</div>
    );
  } else if (!anyData) {
    return (<></>);
  } else {
    return (
      <Container>
        <Wrapper>
          <CenterDiv>
            <FLeft>
              <b>
                Add a {pelicanData.products.edges[0].node.name} for $
                {
                  pelicanData.products.edges[0].node.pricing.priceRange.start.net
                    .amount
                }
                ?{" "}
              </b>
            </FLeft>
            <ButtonWrapper>
              <AddToCartButton
                onSubmit={() =>
                  handleAddToCart(
                    pelicanData.products.edges[0].node.variants[0].id,
                    1
                  )
                }
                disabled={false}
                specialColor={false}
              />
            </ButtonWrapper>
          </CenterDiv>
        </Wrapper>
      </Container>
    );
  }
};
