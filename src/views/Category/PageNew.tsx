import "./scss/index.scss";

import * as React from "react";
import { useIntl } from "react-intl";
import { find, /* orderBy, filter, concat */ } from "lodash";
import { Fab } from "react-tiny-fab";
import "react-tiny-fab/dist/styles.css";

import { useLocation } from "react-router-dom";

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
  onPriceFilterChange: (field: "priceLte" | "priceGte", value: number) => void;
  attributes: IFilterAttributes[];
  match: any;
  onLoadMore: () => void;
  displayLoader: boolean;
  category: Category_category;
  onRefresh: () => void;
  nextPage: boolean;
  prevPage: boolean;
  currentPage: number;
  loadNextPage: () => void;
  loadPrevPage: () => void;
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
  onPriceFilterChange,
  attributes,
  match,
  onLoadMore,
  displayLoader,
  category,
  onRefresh,
  nextPage,
  prevPage,
  currentPage,
  loadNextPage,
  loadPrevPage
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

  // @ts-ignore
/*  let sorted = products.products.edges;
  if (activeSortOption === "price") {
    sorted = orderBy(
      // @ts-ignore
      products.products.edges,
      [
        function (o) {
          return o.node.pricing.priceRange.start.net.amount;
        },
      ],
      ["asc"]
    );
  } else if (activeSortOption === "-price") {
    sorted = orderBy(
      // @ts-ignore
      products.products.edges,
      [
        function (o) {
          return o.node.pricing.priceRange.start.net.amount;
        },
      ],
      ["desc"]
    );
  } */

  /*
  const productsAvailable = filter(
    // @ts-ignore
    products.products.edges,
      function (o) {
        return o.node.isAvailable === true;
      },
  );

  const productsUnavailable = filter(
    // @ts-ignore
    products.products.edges,
      function (o) {
        return o.node.isAvailable === false;
      },
  );

  // @ts-ignore
  const resorted = concat(productsAvailable, productsUnavailable);
  */

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

  let activeFiltersAttributes =
    filters &&
    filters.attributes &&
    Object.keys(filters.attributes).reduce(
      (acc, key) =>
        acc.concat(
          filters.attributes[key].map(valueSlug => getAttribute(key, valueSlug))
        ),
      []
    );

  if (activeFiltersAttributes === undefined) {
    activeFiltersAttributes = [];
  }

  for (let i = 0; i < activeFiltersAttributes.length; i++) {
    if (activeFiltersAttributes[i] === undefined) {
      activeFiltersAttributes = [];
    }
  }

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
          isAvailable
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
    setAttributesData(res);
  };
  let mounted = true;
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !isProductsFetched &&
      fetchAllProducts().then(r => {
        if (mounted) {
          setIsProductsFetched(true);
        }
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    !attributesFetched &&
      fetchAttributes().then(r => {
        if (mounted) {
          setAttributesFetched(true);
        }
      });
    // eslint-disable-next-line no-return-assign
    return () => {
      mounted = false;
    };
  }, [attributesFetched, isProductsFetched]);

  const location = useLocation();
  useEffect(() => {
    if (location.search.length === 0) {
      setIsProductsFetched(false);
      setAttributesFetched(false);
    }
  }, [location]);

  if (!isProductsFetched) {
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
            {/* {canDisplayProducts && (
              <ProductList
                // @ts-ignore
                products={sorted.map(edge => edge.node)}
                // @ts-ignore
                canLoadMore={products.products?.pageInfo.hasNextPage}
                loading={displayLoader}
                onLoadMore={onLoadMore}
              />
            )} */}
          </div>
          <ProductsFeatured
            title={intl.formatMessage(commonMessages.youMightLike)}
          />
        </div>
      </>
    );
  }

  let numPages = 0;
  // @ts-ignore
  if(products && products.products.totalCount > 0) {
    // @ts-ignore
    numPages = Math.ceil(products.products.totalCount / 28);
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

          // @ts-ignore
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

              <div className="category">
                <div className="container">
                  <>
                    {displayLoader?<Loader />:null}
                    <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />

                    <FilterSidebar
                      show={showFilters}
                      hide={() => setShowFilters(false)}
                      onAttributeFiltersChange={onAttributeFiltersChange}
                      // @ts-ignore
                      attributes={ attributesData ? attributesData.attributes.edges.map( edge => edge.node) : [] }
                      // @ts-ignore
                      onPriceFilterChange={onPriceFilterChange}
                      filters={filters}
                      // @ts-ignore
                      products={ productData ? productData.products.edges.map(edge => edge.node) : [] }
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
<>



                      <ProductList
                        // @ts-ignore
                        products={products.products.edges.map(edge => edge.node)}
                        // @ts-ignore
                        canLoadMore={products.products?.pageInfo.hasNextPage}
                        loading={displayLoader}
                        onLoadMore={onLoadMore}
                      />
</>
                    )}
                  </>
                </div>
                { (nextPage || prevPage) ? 
                  <div className="pagination">

                    { prevPage ? 
                      <button
                        onClick={() => {
                          loadPrevPage();
                        }}
                      >
                        Page { currentPage }
                      </button>
                      : null
                    }
                    
                    {
                      (numPages > 0) ?
                      <span className="page-count">Page { currentPage + 1 } of { numPages } </span>
                      : null
                    }

                    { nextPage ? 
                      <button
                        onClick={() => {
                          loadNextPage();
                        }}
                      >
                        Page { currentPage + 2 }
                      </button>
                      : null
                    }
                  </div>
                  : null
                }
                
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
