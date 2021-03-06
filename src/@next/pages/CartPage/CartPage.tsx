import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { History } from "history";
/* import React, { useEffect, useState } from "react"; */
import React from "react";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import { find } from "lodash";

import { Button, CartFooter, CartHeader } from "@components/atoms";
import { TaxedMoney } from "@components/containers";
import { CartRow } from "@components/organisms";
import { Cart, CartEmpty } from "@components/templates";
import { IItems } from "@saleor/sdk/lib/api/Cart/types";
import { UserDetails_me } from "@saleor/sdk/lib/queries/gqlTypes/UserDetails";
import { BASE_URL } from "@temp/core/config";
import { checkoutMessages } from "@temp/intl";
/* import { IImage, ITaxedMoney } from "@types"; */
import { ITaxedMoney } from "@types";

import * as S from "./styles";
import { IProps } from "./types";

const title = (
  <S.PageHeader className="" data-test="cartPageTitle">
    <FormattedMessage defaultMessage="My Cart" />
  </S.PageHeader>
);

const getShoppingButton = (history: History) => (
  <Button
    testingContext="cartPageContinueShoppingButton"
    onClick={() => history.push(BASE_URL)}
  >
    <FormattedMessage {...checkoutMessages.continueShopping} />
  </Button>
);

const getCheckoutButton = (history: History, user?: UserDetails_me | null) => (
  <Button
    testingContext="proceedToCheckoutButton"
    onClick={() => history.push(user ? `/checkout/` : `/login/`)}
  >
    <FormattedMessage defaultMessage="PROCEED TO CHECKOUT" />
  </Button>
);

const cartHeader = <CartHeader />;

const prepareCartFooter = (
  totalPrice?: ITaxedMoney | null,
  shippingTaxedPrice?: ITaxedMoney | null,
  promoTaxedPrice?: ITaxedMoney | null,
  subtotalPrice?: ITaxedMoney | null
) => (
  <CartFooter
    subtotalPrice={
      <TaxedMoney data-test="subtotalPrice" taxedMoney={subtotalPrice} />
    }
    totalPrice={<TaxedMoney data-test="totalPrice" taxedMoney={totalPrice} />}
    shippingPrice={
      shippingTaxedPrice &&
      shippingTaxedPrice.gross.amount !== 0 && (
        <TaxedMoney data-test="shippingPrice" taxedMoney={shippingTaxedPrice} />
      )
    }
    discountPrice={
      promoTaxedPrice &&
      promoTaxedPrice.gross.amount !== 0 && (
        <TaxedMoney data-test="discountPrice" taxedMoney={promoTaxedPrice} />
      )
    }
  />
);

const hasPelican = (items: IItems) => {
  // console.log(items);

  if (
    find(items, function (item) {
      // @ts-ignore
      return item.variant.name.indexOf("Pelican") !== -1;
    }) &&
    // @ts-ignore
    items.length > 1
  ) {
    return true;
  }
  return false;
};

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any
  // newImage: IImage
) => {
  return items?.map(({ id, variant, quantity, totalPrice }, index) => (
    <CartRow
      key={id ? `id-${id}` : `idx-${index}`}
      index={index}
      id={variant?.product?.id || ""}
      name={variant?.product?.name || ""}
      maxQuantity={variant.quantityAvailable || quantity}
      quantity={quantity}
      onRemove={() => removeItem(variant.id)}
      onQuantityChange={quantity => updateItem(variant.id, quantity)}
      thumbnail={{
        ...variant?.product?.thumbnail,
        alt: variant?.product?.thumbnail?.alt || "",
      }}
      totalPrice={<TaxedMoney taxedMoney={totalPrice} />}
      unitPrice={<TaxedMoney taxedMoney={variant?.pricing?.price} />}
      sku={variant.sku}
      attributes={variant.attributes?.map(attribute => {
        return {
          attribute: {
            id: attribute.attribute.id,
            name: attribute.attribute.name || "",
          },
          values: attribute.values.map(value => {
            return {
              id: value?.id,
              name: value?.name || "",
              value: value?.value,
            };
          }),
        };
      })}
    />
  ));
};

export const CartPage: React.FC<IProps> = ({}: IProps) => {
  const history = useHistory();
  const { user } = useAuth();
  const { checkout } = useCheckout();
  const {
    loaded,
    removeItem,
    updateItem,
    items,
    totalPrice,
    subtotalPrice,
    shippingPrice,
    discount,
  } = useCart();
  // const [isFetched, setIsFetched] = useState(false);
  // const [varImage, setVarImage] = useState("");

  const API_URL = process.env.API_URI || "/graphql/";

  const queryData = async () => {
    let query: string;
    if (loaded) {
      // @ts-ignore
      // myid really means: ${items[0].variant.product.id}
      query = JSON.stringify({
        query: `
      {
  product(id: "myid") {
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
    }

    const response = await fetch(API_URL, {
      headers: { "content-type": "application/json" },
      method: "POST",
      // @ts-ignore
      body: query,
    });

    const responseJson = await response.json();
    return responseJson.data;
  };

  // @ts-ignore
  const fetchData = async () => {
    const res = await queryData();
    // @ts-ignore
    const z = find(res.product.variants, function (o) {
      // @ts-ignore
      return o.id === items[0].variant.id;
    });
    // console.log(z.images[0]);
    // setVarImage(z.images[0].url);
  };

  // @ts-ignore
  //  useEffect(() => {
  //    let mounted = true;
  //    fetchData().then(r => {
  //      if (mounted) {
  //        setIsFetched(true);
  //      }
  //    });
  // eslint-disable-next-line no-return-assign
  //    return () => (mounted = false);
  //  }, [isFetched]);

  const shippingTaxedPrice =
    checkout?.shippingMethod?.id && shippingPrice
      ? {
          gross: shippingPrice,
          net: shippingPrice,
        }
      : null;
  const promoTaxedPrice = discount && {
    gross: discount,
    net: discount,
  };

  if (loaded && items?.length) {
    return (
      <>
        <Cart
          // @ts-ignore
          hasPelican={hasPelican(items)}
          title={title}
          button={getCheckoutButton(history, user)}
          cartHeader={cartHeader}
          cartFooter={prepareCartFooter(
            totalPrice,
            shippingTaxedPrice,
            promoTaxedPrice,
            subtotalPrice
          )}
          cart={
            items && generateCart(items, removeItem, updateItem)
            /*            generateCart(items, removeItem, updateItem, {
              url: varImage,
              url2x: varImage,
            }) */
          }
        />
      </>
    );
  }
  return <CartEmpty button={getShoppingButton(history)} />;
};
