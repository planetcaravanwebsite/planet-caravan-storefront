import { ICheckoutModelLine } from "@saleor/sdk/lib/helpers";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import ReactSVG from "react-svg";

import { TaxedMoney } from "@components/containers";
import { Thumbnail } from "@components/molecules";

import { find } from "lodash";
import { useEffect, useState } from "react";
import { generateProductUrl } from "../../../core/utils";
import removeImg from "../../../images/garbage.svg";

const ProductList: React.FC<{
  lines: ICheckoutModelLine[];
  remove(variantId: string): void;
}> = ({ lines, remove }) => (
  <ul className="cart__list">
    {lines.map((line, index) => {
      console.log(line);

      const [isFetched, setIsFetched] = useState(false);
      const [varImage, setVarImage] = useState("");

      const API_URL = process.env.API_URI || "/graphql/";

      const queryData = async () => {
        let query: string;
        // if (loaded) {
        // @ts-ignore
        query = JSON.stringify({
          query: `
      {
  product(id: "${line.variant.product.id}") {
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
        // }

        // @ts-ignore
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
        console.log(res);
        const z = find(res.product.variants, function (o) {
          // @ts-ignore
          return o.id === line.variant.id;
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

      const productUrl = generateProductUrl(
        line.variant.product.id,
        line.variant.product.name
      );
      const key = line.id ? `id-${line.id}` : `idx-${index}`;

      return (
        <li
          key={key}
          className="cart__list__item"
          data-test="cartRow"
          data-test-id={line.variant.sku}
        >
          <Link to={productUrl}>
            <Thumbnail source={line.variant.product} image={varImage} />
          </Link>
          <div className="cart__list__item__details">
            <p data-test="price">
              <TaxedMoney taxedMoney={line.variant.pricing.price} />
            </p>
            <Link to={productUrl}>
              <p data-test="name">{line.variant.product.name}</p>
            </Link>
            <span className="cart__list__item__details__variant">
              <span>{line.variant.name}</span>
              <span data-test="quantity">
                <FormattedMessage
                  defaultMessage="Qty: {quantity}"
                  values={{ quantity: line.quantity }}
                />
              </span>
            </span>
            <ReactSVG
              path={removeImg}
              className="cart__list__item__details__delete-icon"
              data-test="deleteButton"
              onClick={() => remove(line.variant.id)}
            />
          </div>
        </li>
      );
    })}
  </ul>
);
export default ProductList;
