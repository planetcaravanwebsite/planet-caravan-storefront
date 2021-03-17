import "../Category/scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";

import { commonMessages } from "@temp/intl";
import { demoMode } from "@temp/constants";
import { IFilterAttributes, IFilters } from "@types";
import { orderBy } from "lodash";
import { Fab } from "react-tiny-fab";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductList } from "../../@next/components/organisms";
import { Breadcrumbs, MainMenu, ProductsFeatured } from "../../components";
import { getDBIdFromGraphqlId, maybe } from "../../core/utils";

import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { Collection_collection } from "./gqlTypes/Collection";
import { CollectionProducts_collection_products } from "./gqlTypes/CollectionProducts";

interface SortItem {
  label: string;
  value?: string;
}

interface SortOptions extends Array<SortItem> {}

interface PageProps {
  activeFilters: number;
  attributes: IFilterAttributes[];
  activeSortOption: string;
  collection: Collection_collection;
  displayLoader: boolean;
  filters: IFilters;
  hasNextPage: boolean;
  products: CollectionProducts_collection_products;
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
  collection,
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

  const breadcrumbs = [
    {
      link: [
        `/collection`,
        `/${collection.slug}`,
        `/${getDBIdFromGraphqlId(collection.id, "Collection")}/`,
      ].join(""),
      value: collection.name,
    },
  ];

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
      <MainMenu demoMode={demoMode} whichMenu="fullPage" />
      <div className="collection">
        <div className="container">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <FilterSidebar
            show={showFilters}
            hide={() => setShowFilters(false)}
            onAttributeFiltersChange={onAttributeFiltersChange}
            attributes={attributes}
            filters={filters}
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
};

export default Page;
