import "../Category/scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";

import { commonMessages } from "@temp/intl";
import { IFilterAttributes, IFilters } from "@types";
import { orderBy } from "lodash";
import { Fab } from "react-tiny-fab";
import { ProductListHeader } from "../../@next/components/molecules";
import { ProductList } from "../../@next/components/organisms";
import { Breadcrumbs, ProductsFeatured } from "../../components";
import { getDBIdFromGraphqlId, maybe } from "../../core/utils";

import { FilterSidebar } from "../../@next/components/organisms/FilterSidebar";
import { Collection_collection } from "./gqlTypes/Collection";
import { CollectionProducts_collection_products } from "./gqlTypes/CollectionProducts";
// import { PlaceholderImage } from "@components/atoms";

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
          backgroundColor: "#50C878",
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
      <div className="collection">
        <div className="container">
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          {collection.name === "Drops" && (
            <>
              <h3 className="normal">How Drops Work</h3>
              <ul className="normal">
                <li>
                  Drops go live at the designated time as shown below the
                  “Coming Soon” button.
                </li>
                <li>
                  When the drop goes live the “Coming Soon” button will change
                  to “Add to Cart”. At this point the item is available to
                  purchase!
                </li>
                <li>
                  If the “Coming Soon” button does not change to “Add to Cart”
                  refresh your page!
                </li>
                <li>
                  Due to the high demand of these items, multiple people may add
                  the item you want to purchase to their cart. Whoever completes
                  the checkout process first will get the item!
                </li>
                <li>
                  Keep in mind, adding an item to your cart DOES NOT guarantee
                  that you will get the item. Again, the item will be sold to
                  whomever completes the checkout process first.
                </li>
              </ul>
              <h3 className="normal">
                Improve your chances of getting the piece you want!
              </h3>
              <ul className="normal">
                <li>
                  To ensure a fast checkout you should create an account prior
                  to the drop so that your shipping information is already in
                  our system.
                </li>
                <li>
                  Make sure you verify your account through the email you used
                  to sign up!
                </li>
                <li>
                  Once the product is live, if the “Coming Soon” button does not
                  change to “Add to Cart” refresh your page!
                </li>
                <li>
                  Have your credit card information ready and in front of you!
                </li>
              </ul>
            </>
          )}
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
