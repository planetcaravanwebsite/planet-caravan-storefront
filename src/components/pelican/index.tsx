import React, { useState, useEffect } from "react";

import { useCart } from "@saleor/sdk";

import { styled } from "@styles";

import { Container } from "@components/templates";
import AddToCartButton from "../../@next/components/molecules/AddToCartButton";

const API_URL = process.env.API_URI || "/graphql/";

export interface PelicanInterface {
  // onAddToCart(variantId: string, quantity?: number): void;
}

export const Wrapper = styled.div`
  margin: 30px 0 100px 0;
`;

export const ButtonWrapper = styled.div`
  float: left;
`;

export const Pelican: React.FC<PelicanInterface> = () => {
  const [isFetched, setIsFetched] = useState(false);
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
    console.log(res);
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
    console.log("adding %o %o", variantId, quantity);
    addItem(variantId, quantity);
  };

  return !isFetched ? (
    <div>loading...</div>
  ) : (
    <Container>
      <Wrapper>
        <ButtonWrapper>
          Add a {pelicanData.products.edges[0].node.name} for $
          {
            pelicanData.products.edges[0].node.pricing.priceRange.start.net
              .amount
          }
          ?{" "}
        </ButtonWrapper>
        <ButtonWrapper>
          <AddToCartButton
            onSubmit={() =>
              handleAddToCart(
                pelicanData.products.edges[0].node.variants[0].id,
                1
              )
            }
            disabled={false}
          />
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};
