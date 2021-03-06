import * as React from "react";
import { FormattedMessage } from "react-intl";

import { ProductList } from "@components/organisms";

import { ProductDetails_product_category_products_edges } from "./gqlTypes/ProductDetails";

const OtherProducts: React.FC<{
  products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => {
  products.forEach(product => {
    // @ts-ignore
    product.node.isAvailable = true;
  });
  return (
    <div className="product-page__other-products">
      <div className="container">
        <h4 className="product-page__other-products__title">
          <FormattedMessage defaultMessage="Other products you may be interested in" />
        </h4>
        <ProductList
          products={products.map(({ node }) => node)}
          numPerRow={3}
        />
      </div>
    </div>
  );
};

export default OtherProducts;
