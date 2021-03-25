import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";
import { find, orderBy } from "lodash";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

import { commonMessages } from "@temp/intl";
import { IFilterAttributes, IFilters } from "@types";
import {
  Breadcrumbs,
  extractBreadcrumbs,
  ProductsFeatured,
} from "../../components";

import { ProductListHeader } from "../../@next/components/molecules";
import { ProductList } from "../../@next/components/organisms";
import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { TypedMainMenuQuery } from "../../components/MainMenu/queries";

import { maybe } from "../../core/utils";

import { Category_category } from "./gqlTypes/Category";
import { CategoryProducts_products } from "./gqlTypes/CategoryProducts";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  category: Category_category;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: CategoryProducts_products;
  sortOptions: SortOptions;
  clearFilters: () => void;
  onLoadMore: () => void;
  onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
  onOrder: (order: { value?: string; label: string }) => void;
}

const Page: React.FC<PageProps> = ({
  activeFilters,
  activeSortOption,
  attributes,
  category,
  displayLoader,
  hasNextPage,
  clearFilters,
  onLoadMore,
  products,
  filters,
  onOrder,
  sortOptions,
  onAttributeFiltersChange,
}) => {
  const canDisplayProducts = maybe(
    () => !!products.edges && products.totalCount !== undefined
  );
  // const hasProducts = canDisplayProducts && !!products.totalCount;
  const [showFilters, setShowFilters] = React.useState(false);
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

  let sorted = products.edges;
  if (activeSortOption === "price") {
    sorted = orderBy(
      products.edges,
      [
        function (o) {
          return o.node.pricing.priceRange.start.gross.amount;
        },
      ],
      ["asc"]
    );
  } else if (activeSortOption === "-price") {
    sorted = orderBy(
      products.edges,
      [
        function (o) {
          return o.node.pricing.priceRange.start.gross.amount;
        },
      ],
      ["desc"]
    );
  }

  return (
    <>
      <TypedMainMenuQuery renderOnError displayLoader={false}>
        {({ data }) => {
          const items = maybe(() => data.shop.navigation.main.items, []);
          const categoryData = find(items, function (item) {
            // @ts-ignore
            return item.category.id === category.id;
          });

          return (
            <>
              <Fab
                mainButtonStyles={{
                  backgroundColor: "#E43024",
                }}
                style={{
                  bottom: 50,
                  right: "10%",
                }}
                icon="&uarr;"
                event="click"
                key={-1}
                alwaysShowTitle={false}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                text="Back to top"
              />
              <div className="category">
                <div className="container">
                  <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
                  <FilterSidebar
                    show={showFilters}
                    hide={() => setShowFilters(false)}
                    onAttributeFiltersChange={onAttributeFiltersChange}
                    attributes={attributes}
                    filters={filters}
                    category={categoryData}
                    products={sorted.map(edge => edge.node)}
                  />
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
                  {canDisplayProducts && (
                    <ProductList
                      products={sorted.map(edge => edge.node)}
                      canLoadMore={hasNextPage}
                      loading={displayLoader}
                      onLoadMore={onLoadMore}
                    />
                  )}
                </div>

                <ProductsFeatured
                  title={intl.formatMessage(commonMessages.youMightLike)}
                />
              </div>
            </>
          );
        }}
      </TypedMainMenuQuery>
    </>
  );
};

export default Page;
