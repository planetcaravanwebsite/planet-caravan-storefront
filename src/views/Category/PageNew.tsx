import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";
import { find, orderBy } from "lodash";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

import { commonMessages } from "@temp/intl";
import { demoMode } from "@temp/constants";
import { IFilterAttributes, IFilters } from "@types";
import { ProductListHeader } from "@components/molecules";
import { useEffect, useState } from "react";
import { Loader } from "@components/atoms";
import {
  Breadcrumbs,
  extractBreadcrumbs,
  MainMenu,
  ProductsFeatured,
} from "../../components";

import { FilterSidebar, ProductList } from "../../@next/components/organisms";
import { TypedMainMenuQuery } from "../../components/MainMenu/queries";

import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
  maybe,
} from "../../core/utils";

// import { Category_category } from "./gqlTypes/Category";
import { CategoryProducts_products } from "./gqlTypes/CategoryProducts";

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
  attributes: IFilterAttributes[];
  match: any;
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
  attributes,
  match,
}) => {
  // console.log(products);

  const [attributesFetched, setAttributesFetched] = useState(false);
  const [attributesData, setAttributesData] = useState();
  const API_URL = process.env.API_URI || "/graphql/";

  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(match.params.id, "Category"),
    sortBy: convertSortByFromString(filters.sortBy),
  };

  variables.pageSize = 1000;
  // console.log(variables);

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

  const queryAttrributesData = async () => {
    const query = JSON.stringify({
      query: `
      query Category($id: ID!) {
    category(id: $id) {
      seoDescription
      seoTitle
      id
      name
      backgroundImage {
        url
      }
      ancestors(last: 5) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
    attributes(
      filter: { inCategory: $id, filterableInStorefront: true }
      first: 100
    ) {
      edges {
        node {
          id
          name
          slug
          values {
            id
            name
            slug
          }
        }
      }
    }
  }
    `,
      variables,
    });

    const response = await fetch(API_URL, {
      headers: { "content-type": "application/json" },
      method: "POST",
      body: query,
    });

    const responseJson = await response.json();
    return responseJson.data;
  };

  const fetchAttributes = async () => {
    const res = await queryAttrributesData();
    setAttributesData(res);
    console.log(res);
    console.log(products)
  };

  useEffect(() => {
    let mounted = true;
    fetchAttributes().then(r => {
      if (mounted) {
        setAttributesFetched(true);
      }
    });
    // eslint-disable-next-line no-return-assign
    return () => (mounted = false);
  }, [attributesFetched]);


  if (!attributesFetched) {
    return (
      <>
        <MainMenu demoMode={demoMode} whichMenu="fullPage" />
        <div className="category">
          <div className="container">

          <Loader />;
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
    )
  }

  return (
    <>
      <MainMenu demoMode={demoMode} whichMenu="fullPage" />
      <div className="category">
        <div className="container">

              <>
                <FilterSidebar
                  show={showFilters}
                  hide={() => setShowFilters(false)}
                  onAttributeFiltersChange={onAttributeFiltersChange}
                  attributes={attributesData.attributes.edges.map(
                    edge => edge.node
                  )}
                  filters={filters}
                  products={products.products.edges.map(edge => edge.node)}
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
                <ProductList
                  products={products.products.edges.map(edge => edge.node)}
                  canLoadMore={false}
                  loading={false}
                  onLoadMore={console.log()}
                />
              </>

        </div>
      </div>
    </>
  );
};

export default Page;
