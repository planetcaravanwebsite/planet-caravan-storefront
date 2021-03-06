import * as React from "react";
import { useIntl } from "react-intl";
import { RouteComponentProps } from "react-router";
import { maxBy } from "lodash";

import { prodListHeaderCommonMsg } from "@temp/intl";
import { IFilters } from "@types";
import { StringParam, useQueryParam } from "use-query-params";
import { Loader } from "@components/atoms";
import { useEffect, useState } from "react";
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

const priceFilters = {
  priceGte: [null],
  priceLte: [null],
};

let pageData = {
  page: 0,
  pageCursors: [null],
  startCursor: null,
};

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
      if (propWithValues[0] === "priceGte") {
        priceFilters.priceGte = propWithValues.slice(1);
      }
      if (propWithValues[0] === "priceLte") {
        priceFilters.priceLte = propWithValues.slice(1);
      }
      if (
        propWithValues[0] !== "priceGte" &&
        propWithValues[0] !== "priceLte"
      ) {
        obj[propWithValues[0]] = propWithValues.slice(1);
      }
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
  // @ts-ignore
  const [max, setMax] = useState();
  const [priceLte, setPriceLte] = useState(null);
  const intl = useIntl();
  const [itemId, setItemId] = useState();

  let API_URL = process.env.API_URI || "/graphql/";
  if (searchParam) {
    API_URL += "?cache_bust=1";
  }

  const [isFetched, setIsFetched] = useState(false);
  const [pricingData, setPricingData] = useState();
  const [retrievedCount, setRetrievedCount] = useState(0);
  const [processedCount, setProcessedCount] = useState(-1);

  if (!sort) {
    const url = window.location.href.toLowerCase();
    if (url.indexOf("headies") > -1) {
      sort = "-price";
    } else if (url.indexOf("drops") > -1 || url.indexOf("smoke-shop") > -1) {
      sort = "-updated_at";
    } else {
      sort = "-updated_at";
    }
  }

  const savePageData = () => {
    window.sessionStorage.setItem("pageData", JSON.stringify(pageData));
  };

  const clearPageData = () => {
    pageData.page = 0;
    pageData.pageCursors = [null];
    pageData.startCursor = null;
    savePageData();
  };

  const clearFilters = () => {
    clearPageData();
    setAttributeFilters({});
  };

  const onFiltersChange = (name, value) => {
    clearPageData();

    if (name === "priceLte") {
      setPriceLte(value);
    }

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
    priceGte: priceFilters.priceGte[0],
    priceLte: priceFilters.priceLte[0],
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

  variables.pageSize = 100;

  const pd = sessionStorage.getItem("pageData");
  if (pd && window.location.hash.length > 1) {
    pageData = JSON.parse(pd);

    // @ts-ignore
    variables.after = pageData.startCursor;

    setTimeout(function () {
      const uri = window.location.toString();
      if (uri.indexOf("#") > 0) {
        const clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
      }
    }, 3000);
  } else {
    clearPageData();
  }

  const queryPricingData = async () => {
    if (variables.id !== itemId) {
      // @ts-ignore
      setItemId(variables.id);
      // @ts-ignore
      variables.priceLte = sessionStorage.getItem(variables.id);
      setPriceLte(variables.priceLte);
    }

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
        price: { gte: $priceGte, lte: $priceLte }
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
      const maxVal = maxBy(res.products.edges, function (o) {
        // @ts-ignore
        return o.node.pricing.priceRange.start.net.amount;
      });
      // @ts-ignore
      setMax(maxVal);
      // @ts-ignore
      if (
        !sessionStorage.getItem(variables.id) ||
        // @ts-ignore
        maxVal.node.pricing.priceRange.start.net.amount >
          sessionStorage.getItem(variables.id)
      ) {
        sessionStorage.setItem(
          variables.id,
          // @ts-ignore
          maxVal.node.pricing.priceRange.start.net.amount
        );
      }

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
      // console.log(e);
    }
    return true;
  };

  useEffect(() => {
    console.log("category has changed - reset the filters");
    sessionStorage.setItem(`${variables.id}-erase`, "true");
  }, [itemId]);

  const handleRefresh = () => {};

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
            fetchPricing();
            variables.priceLte = priceLte;

            return (
              <TypedCategoryProductsQueryNew
                variables={variables}
                errorPolicy="all"
                loaderFull
              >
                {categoryData => {
                  if (!isFetched) {
                    return <Loader />;
                  }

                  if (
                    categoryData.loading &&
                    // categoryData.networkStatus === 1 &&
                    !filters!.attributes
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

                  const loadPrevPage = () => {
                    if (pageData.page <= 0) {
                      return;
                    }

                    pageData.page--;
                    pageData.startCursor = pageData.pageCursors[pageData.page];
                    // @ts-ignore
                    variables.after = pageData.startCursor;

                    savePageData();
                    categoryData.refetch(variables);
                  };

                  const loadNextPage = () => {
                    pageData.page++;
                    if (pageData.page === pageData.pageCursors.length) {
                      pageData.pageCursors.push(
                        // @ts-ignore
                        categoryData.data.products.pageInfo.endCursor
                      );
                    }
                    pageData.startCursor = pageData.pageCursors[pageData.page];
                    // @ts-ignore
                    variables.after = pageData.startCursor;
                    savePageData();
                    categoryData.refetch(variables);
                  };

                  const handleLoadMore = () => {};

                  return (
                    <>
                      <MetaWrapper
                        meta={{
                          description: category.data.category.seoDescription
                            ? category.data.category.seoDescription
                            : `${category.data.category.name} | Planet Caravan | Cincinnati, Oh`,
                          title: category.data.category.seoTitle
                            ? category.data.category.seoTitle
                            : `${category.data.category.name} | Planet Caravan | Cincinnati, Oh`,
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
                          onPriceFilterChange={onFiltersChange}
                          activeFilters={
                            filters!.attributes
                              ? Object.keys(filters!.attributes).length
                              : 0
                          }
                          max={sessionStorage.getItem(variables.id)}
                          eraseSliderValues={sessionStorage.getItem(
                            `${variables.id}-erase`
                          )}
                          onOrder={value => {
                            setSort(value.value);
                          }}
                          onLoadMore={handleLoadMore}
                          onRefresh={handleRefresh}
                          nextPage={
                            // @ts-ignore
                            categoryData.data.products.pageInfo.hasNextPage
                          }
                          prevPage={
                            // @ts-ignore
                            categoryData.data.products.pageInfo.hasPreviousPage
                          }
                          currentPage={pageData.page}
                          loadNextPage={loadNextPage}
                          loadPrevPage={loadPrevPage}
                        />
                      </MetaWrapper>
                    </>
                  );
                }}
              </TypedCategoryProductsQueryNew>
            );
          }}
        </TypedCategoryProductsDataQuery>
      )}
    </NetworkStatus>
  );
};
// @ts-ignore
export default View;
