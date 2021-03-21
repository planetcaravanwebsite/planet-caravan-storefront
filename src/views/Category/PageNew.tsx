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
import { ProductListHeader } from "@components/molecules";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  products: CategoryProducts_products;
  activeSortOption: string;
  activeFilters: number;
  filters: IFilters;
  clearFilters: () => void;
  sortOptions: SortOptions;
  onOrder: (order: { value?: string; label: string }) => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
}

const Page: React.FC<PageProps> = ({
  products,
  activeSortOption,
  activeFilters,
  filters,
  clearFilters,
  sortOptions,
  onOrder,
  onAttributeFiltersChange,
}) => {
  // console.log(products);

  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  // const hasProducts = canDisplayProducts && !!products.totalCount;
  const intl = useIntl();
  const [showFilters, setShowFilters] = React.useState(false);

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    return {
      attributeSlug,
      valueName: attributes
        .find(({ slug }) => attributeSlug === slug)
        .values.find(({ slug }) => valueSlug === slug).name,
      valueSlug,
    };
  };

  const activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );


  return (
    <>
      <MainMenu demoMode={demoMode} whichMenu="fullPage" />
      <div className="category">
        <div className="container">
          <ProductListHeader
            activeSortOption={activeSortOption}
            openFiltersMenu={() => setShowFilters(true)}
            numberOfProducts={products ? products.totalCount : 0}
            activeFilters={activeFilters}
            activeFiltersAttributes={activeFiltersAttributes}
            clearFilters={clearFilters}
            sortOptions={sortOptions}
            onChange={onOrder}
            onCloseFilterAttribute={onAttributeFiltersChange}
          />
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
