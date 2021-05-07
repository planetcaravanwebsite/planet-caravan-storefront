import React /* , { useState } */ from "react";

// import { useCart } from "@saleor/sdk";

import { styled } from "@styles";

import { ButtonSmall } from "@components/atoms";

// const API_URL = process.env.API_URI || "/graphql/";

export interface PelicanInterface {
  // onRemove(): void;
}

export const Title = styled.h1`
  color: red;
  font-size: 1.2rem;
  line-height: 2;
  font-weight: bold;
`;

export const Pelican: React.FC<PelicanInterface> = () => {
  // const [isFetched, setIsFetched] = useState(false);
  // const [anyData, setAnyData] = useState(false);
  /* const [pelicanData, setPelicanData] = useState({
    product: {
      variants: [
        {
          id: {},
          name: {},
        },
      ],
    },
  }); */

  /* const queryData = async () => {
    const query = JSON.stringify({
      query: `
      {
  product(id: "UHJvZHVjdDozODY0") {
    name
    description
    images {
      url
      id
    }
    variants {
      id
      sku
      name
      images {
        url
        id
      }
      pricing {
        price {
          gross {
            amount
            currency
          }
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
  }; */

  /* const fetchData = async () => {
    const res = await queryData();
    setPelicanData(res);
    console.log(res);
    if (res.product.name.length > 0) {
      setAnyData(true);
    }
  }; */
  /*
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
*/
  // const { addItem } = useCart();

  const handleAddToCart = (/* variantId, quantity */) => {
    // console.log("adding %o %o", variantId, quantity);
    // addItem(variantId, quantity);
  };

  /* if (!isFetched) {
    return <div>loading...</div>;
  }
  if (!anyData) {
    return <></>;
  } */
  return (
    <>
      <Title>Buying a Pelican?</Title>
      <div>Do you want us to pack your heady glass in your pelican case?</div>
      <ButtonSmall
        size="sm"
        fullWidth={false}
        onClick={() =>
          handleAddToCart(/* pelicanData.product.variants[0].id, 1 */)
        }
        testingContext="submit"
      >
        Yes
      </ButtonSmall>
    </>
  );
};
