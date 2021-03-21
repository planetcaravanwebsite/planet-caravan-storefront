import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";
import { find, orderBy } from "lodash";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

import { commonMessages } from "@temp/intl";
import { demoMode } from "@temp/constants";
import { IFilterAttributes, IFilters } from "@types";
import {
  Breadcrumbs,
  extractBreadcrumbs,
  MainMenu,
  ProductsFeatured,
} from "../../components";

import { ProductList } from "../../@next/components/organisms";
import { TypedMainMenuQuery } from "../../components/MainMenu/queries";

import { maybe } from "../../core/utils";

// import { Category_category } from "./gqlTypes/Category";
import { CategoryProducts_products } from "./gqlTypes/CategoryProducts";

interface SortItem {
  label: string;
  value?: string;
}

interface PageProps {
  products: CategoryProducts_products;
  // category: Category_category;
}

const Page: React.FC<PageProps> = ({
  products,
  // category,
}) => {
  // console.log(products);
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  // const hasProducts = canDisplayProducts && !!products.totalCount;
  const intl = useIntl();

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  return (
    <>
      <MainMenu demoMode={demoMode} whichMenu="fullPage" />
      <div className="category">
        <div className="container">
          <ProductList
            products={products.products.edges.map(edge => edge.node)}
            canLoadMore={false}
            loading={false}
            onLoadMore={console.log()}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
