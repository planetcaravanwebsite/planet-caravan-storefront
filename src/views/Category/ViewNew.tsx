import * as React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router";
// import { merge } from "lodash";

import { prodListHeaderCommonMsg } from "@temp/intl";
import { IFilters } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import { Loader } from "@components/atoms";
import { useState } from "react";
import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import {
  convertSortByFromString,
  convertToAttributeScalar,
  getGraphqlIdFromDBId,
} from "../../core/utils";
// import Page from "./Page";
import Page from "./PageNew";
import {
  TypedCategoryProductsDataQuery,
  TypedCategoryProductsQueryNew,
} from "./queries";

type ViewProps = RouteComponentProps<{
  id: string;
}>;

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchParam = urlParams.get("cache_bust");

export const FilterQuerySet = {
  encode(valueObj) {
    const str = [];
    Object.keys(valueObj).forEach(value => {
      str.push(`${value}_${valueObj[value].join("_")}`);
    });
    return str.join(".");
  },

  decode(strValue) {
    const obj = {};
    const propsWithValues = strValue.split(".").filter(n => n);
    propsWithValues.map(value => {
      const propWithValues = value.split("_").filter(n => n);
      obj[propWithValues[0]] = propWithValues.slice(1);
    });
    return obj;
  },
};

export const View: React.FC<ViewProps> = ({ match }) => {
  // eslint-disable-next-line prefer-const
  let [sort, setSort] = useQueryParam("sortBy", StringParam);
  const [attributeFilters, setAttributeFilters] = useQueryParam(
    "filters",
    FilterQuerySet
  );
  const intl = useIntl();
  let API_URL = process.env.API_URI || "/graphql/";
  if (searchParam) {
    API_URL += "?cache_bust=1";
  }

  const [isFetched, setIsFetched] = useState(false);
  const [pricingData, setPricingData] = useState();
  const [retrievedCount, setRetrievedCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(-1);

  if (!sort) {
    sort = "-updated_at";
  }

  const clearFilters = () => {
    setAttributeFilters({});
  };

  const onFiltersChange = (name, value) => {
    if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
      if (attributeFilters[name].includes(value)) {
        if (filters.attributes[`${name}`].length === 1) {
          const att = { ...attributeFilters };
          delete att[`${name}`];
          setAttributeFilters({
            ...att,
          });
        } else {
          setAttributeFilters({
            ...attributeFilters,
            [`${name}`]: attributeFilters[`${name}`].filter(
              item => item !== value
            ),
          });
        }
      } else {
        setAttributeFilters({
          ...attributeFilters,
          [`${name}`]: [...attributeFilters[`${name}`], value],
        });
      }
    } else {
      setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
    }
  };

  const filters: IFilters = {
    attributes: attributeFilters,
    pageSize: PRODUCTS_PER_PAGE,
    priceGte: null,
    priceLte: null,
    sortBy: sort || null,
  };
  const variables = {
    ...filters,
    attributes: filters.attributes
      ? convertToAttributeScalar(filters.attributes)
      : {},
    id: getGraphqlIdFromDBId(match.params.id, "Category"),
    sortBy: convertSortByFromString(filters.sortBy),
  };

  variables.pageSize = 40;

  const queryPricingData = async () => {
    const query = JSON.stringify({
      query: `
      query ProductPrices(
    $id: ID!
    $attributes: [AttributeInput]
    $after: String
    $pageSize: Int
    $sortBy: ProductOrder
    $priceLte: Float
    $priceGte: Float
  ) {
    products(
      after: $after
      first: $pageSize
      sortBy: $sortBy
      filter: {
        attributes: $attributes
        categories: [$id]
        minimalPrice: { gte: $priceGte, lte: $priceLte }
      }
    ) {
      totalCount
      edges {
        node {
          id
          name
          pricing {
            priceRange {
              start {
                net {
                  amount
                }
              }
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

  const fetchPricing = async () => {
    // eslint-disable-next-line eqeqeq
    if (retrievedCount == processedCount) {
      return true;
    }

    setProcessedCount(retrievedCount);
    setIsFetched(true);

    try {
      const res = await queryPricingData();
      if (
        !pricingData ||
        // @ts-ignore
        pricingData.products.edges[0].node.name !==
          res.products.edges[0].node.name
      ) {
        setIsFetched(true);
        setPricingData(res);
      }
    } catch (e) {
      console.log(e);
    }
    return true;
  };

  const handleRefresh = () => {
    setIsFetched(false);
  };

  const sortOptions = [
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsClear),
      value: null,
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPrice),
      value: "price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPriceDsc),
      value: "-price",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsName),
      value: "name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsNameDsc),
      value: "-name",
    },
    {
      label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAt),
      value: "-updated_at",
    },
    {
      label: intl.formatMessage(
        prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc
      ),
      value: "updated_at",
    },
  ];

  return (
    <NetworkStatus>
      {isOnline => (
        <TypedCategoryProductsDataQuery
          variables={variables}
          errorPolicy="all"
          loaderFull
        >
          {category => {
            return fetchPricing() ? (
              <TypedCategoryProductsQueryNew
                variables={variables}
                errorPolicy="all"
                loaderFull
              >
                {categoryData => {
                  if (!isFetched) {
                    console.log("!isFetched");
                    return <Loader />;
                  }

                  if (
                    categoryData.loading &&
                    categoryData.networkStatus === 1
                  ) {
                    return <Loader />;
                  }

                  if (
                    categoryData.data &&
                    categoryData.data.category === null
                  ) {
                    return <NotFound />;
                  }

                  if (!isOnline) {
                    return <OfflinePlaceholder />;
                  }

                  // @ts-ignore
                  setRetrievedCount(categoryData.data.products.totalCount);

                  const handleLoadMore = () =>
                    categoryData.loadMore(
                      (prev, next) => ({
                        ...prev,
                        products: {
                          // @ts-ignore
                          ...prev.products,
                          edges: [
                            // @ts-ignore
                            ...prev.products.edges,
                            // @ts-ignore
                            ...next.products.edges,
                          ],
                          // @ts-ignore
                          pageInfo: next.products.pageInfo,
                        },
                      }),
                      {
                        // @ts-ignore
                        after: categoryData.data.products.pageInfo.endCursor,
                      }
                    );
                  return (
                    <>
                      <MetaWrapper
                        meta={{
                          description: `${category.data.category.name} | Planet Caravan | Cincinnati, Oh`,
                          title: `${category.data.category.name} | Planet Caravan | Cincinnati, Oh`,
                          type: "product.category",
                        }}
                      >
                        <Page
                          match={match}
                          category={category.data.category}
                          // @ts-ignore
                          products={categoryData.data}
                          sortOptions={sortOptions}
                          clearFilters={clearFilters}
                          filters={filters}
                          activeSortOption={filters.sortBy}
                          displayLoader={categoryData.loading}
                          onAttributeFiltersChange={onFiltersChange}
                          activeFilters={
                            filters!.attributes
                              ? Object.keys(filters!.attributes).length
                              : 0
                          }
                          onOrder={value => {
                            setSort(value.value);
                          }}
                          onLoadMore={handleLoadMore}
                          onRefresh={handleRefresh}
                        />
                      </MetaWrapper>
                    </>
                  );
                }}
              </TypedCategoryProductsQueryNew>
            ) : null;
          }}
        </TypedCategoryProductsDataQuery>
      )}
    </NetworkStatus>
  );
};
// @ts-ignore
export default View;
