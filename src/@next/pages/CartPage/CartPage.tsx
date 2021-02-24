import { useAuth, useCart, useCheckout } from "@saleor/sdk";
import { History } from "history";
import React, { useEffect, useState } from "react";
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
import { IImage, ITaxedMoney } from "@types";

import { demoMode } from "@temp/constants";
import { IProps } from "./types";
import { MainMenu, Pelican } from "../../../components";

const title = (
  <h1 data-test="cartPageTitle">
    <FormattedMessage defaultMessage="My Cart" />
  </h1>
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
  console.log(find(items, ({ id }) => id === "UHJvZHVjdFZhcmlhbnQ6MzI1"));
  return true;
};

const generateCart = (
  items: IItems,
  removeItem: (variantId: string) => any,
  updateItem: (variantId: string, quantity: number) => any,
  newImage: IImage
) => {
  console.log(items);
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
      thumbnail={newImage}
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
  const [isFetched, setIsFetched] = useState(false);
  const [varImage, setVarImage] = useState("");

  const API_URL = process.env.API_URI || "/graphql/";

  const queryData = async () => {
    let query: string;
    if (loaded) {
      // @ts-ignore
      query = JSON.stringify({
        query: `
      {
  product(id: "${items[0].variant.product.id}") {
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

  const fetchData = async () => {
    const res = await queryData();
    const z = find(res.product.variants, function (o) {
      // @ts-ignore
      return o.id === items[0].variant.id;
    });
    console.log(z.images[0]);
    setVarImage(z.images[0].url);
  };

  // @ts-ignore
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
    console.log(items);
    return (
      <>
        <MainMenu demoMode={demoMode} whichMenu="fullPage" />
        <Cart
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
            items &&
            generateCart(items, removeItem, updateItem, {
              url: varImage,
              url2x: varImage,
            })
          }
        />
        {hasPelican && <Pelican />}
      </>
    );
  }
  return <CartEmpty button={getShoppingButton(history)} />;
};
