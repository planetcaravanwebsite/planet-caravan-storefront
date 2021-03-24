import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";
import { find } from "lodash";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

import { IFilterAttributes, IFilters } from "@types";
import { ProductListHeader } from "@components/molecules";
import { useEffect, useState } from "react";
import { Loader } from "@components/atoms";
import { Category_category } from "@temp/views/Category/gqlTypes/Category";
import { commonMessages } from "@temp/intl";
import {
  Breadcrumbs,
  extractBreadcrumbs,
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
  onLoadMore: () => void;
  displayLoader: boolean;
  category: Category_category;
  onRefresh: () => void;
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
  onLoadMore,
  displayLoader,
  category,
  onRefresh,
}) => {
  const [attributesFetched, setAttributesFetched] = useState(false);
  const [attributesData, setAttributesData] = useState();

  const [isProductsFetched, setIsProductsFetched] = useState(false);
  const [productData, setProductData] = useState();

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

  const canDisplayProducts = maybe(
    () =>
      // @ts-ignore
      !!products.products.edges && products.products.totalCount !== undefined
  );
  // const hasProducts = canDisplayProducts && !!products.totalCount;
  const intl = useIntl();
  const [showFilters, setShowFilters] = React.useState(false);

  const getAttribute = (attributeSlug: string, valueSlug: string) => {
    if (attributesData) {
      return {
        attributeSlug,
        // @ts-ignore
        valueName: attributesData.attributes.edges
          .map(edge => edge.node)
          .find(({ slug }) => attributeSlug === slug)
          .values.find(({ slug }) => valueSlug === slug).name,
        valueSlug,
      };
    }
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

  const queryAllProducts = async () => {
    const query = JSON.stringify({
      query: `
query CategoryProductsNew(
    $id: ID!
    $after: String
    $sortBy: ProductOrder
  ) {
    products(
      after: $after
      first: 1000
      sortBy: $sortBy
      filter: {
        categories: [$id]
      }
    ) {
      totalCount
      edges {
        node {
          id
          name
          attributes {
            values {
              id
              name
            }
            attribute {
              id
              name
            }
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

  const fetchAllProducts = async () => {
    const res = await queryAllProducts();
    console.log(res);
    setProductData(res);
    return true;
  };

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
    console.log(res);
    setAttributesData(res);
  };

  useEffect(() => {
    let mounted = true;
    fetchAllProducts().then(r => {
      if (mounted) {
        setIsProductsFetched(true);
        console.log("fetched prod");
      }
    });
    fetchAttributes().then(r => {
      if (mounted) {
        setAttributesFetched(true);
        console.log("fetched attr");
      }
    });
    // eslint-disable-next-line no-return-assign
    return () => (mounted = false);
  }, [attributesFetched, isProductsFetched]);

  // console.log(products.products.edges[0].node);

  if (!attributesFetched || !isProductsFetched) {
    return (
      <>
        <div className="category">
          <div className="container">
            <Loader />
            <ProductListHeader
              activeSortOption={activeSortOption}
              openFiltersMenu={() => setShowFilters(true)}
              // @ts-ignore
              numberOfProducts={products ? products.products.totalCount : 0}
              activeFilters={activeFilters}
              clearFilters={clearFilters}
              sortOptions={sortOptions}
              onChange={onOrder}
              onCloseFilterAttribute={onAttributeFiltersChange}
            />
            {canDisplayProducts && (
              <ProductList
                // @ts-ignore
                products={products.products.edges.map(edge => edge.node)}
                // @ts-ignore
                canLoadMore={products.products?.pageInfo.hasNextPage}
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
  }

  return (
    <>
      <TypedMainMenuQuery renderOnError displayLoader={false}>
        {({ data }) => {
          const items = maybe(() => data.shop.navigation.main.items, []);
          // @ts-ignore
          const categoryData = find(items, function (item) {
            // @ts-ignore
            return item.category && item.category.id === category.id;
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
                  <>
                    <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />
                    <FilterSidebar
                      show={showFilters}
                      hide={() => setShowFilters(false)}
                      onAttributeFiltersChange={onAttributeFiltersChange}
                      // @ts-ignore
                      attributes={attributesData.attributes.edges.map(
                        edge => edge.node
                      )}
                      filters={filters}
                      // @ts-ignore
                      products={productData.products.edges.map(
                        edge => edge.node
                      )}
                      category={categoryData}
                    />

                    <ProductListHeader
                      activeSortOption={activeSortOption}
                      openFiltersMenu={() => setShowFilters(true)}
                      numberOfProducts={
                        // @ts-ignore
                        products ? products.products.totalCount : 0
                      }
                      activeFilters={activeFilters}
                      activeFiltersAttributes={activeFiltersAttributes}
                      clearFilters={clearFilters}
                      sortOptions={sortOptions}
                      onChange={onOrder}
                      onCloseFilterAttribute={onAttributeFiltersChange}
                    />
                    {canDisplayProducts && (
                      <ProductList
                        // @ts-ignore
                        products={products.products.edges.map(
                          edge => edge.node
                        )}
                        // @ts-ignore
                        canLoadMore={products.products?.pageInfo.hasNextPage}
                        loading={displayLoader}
                        onLoadMore={onLoadMore}
                      />
                    )}
                  </>
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
