import * as React from "react";
import { useHistory } from "react-router-dom";

import "./scss/index.scss";

import algoliasearch from "algoliasearch/lite";
import {
  Hits,
  InstantSearch,
  SearchBox,
  connectStateResults,
  Pagination,
  ScrollTo,
} from "react-instantsearch-dom";
import { PlaceholderImage } from "@components/atoms";

interface SearchState {
  search: string;
}

let url = "";
const Results = connectStateResults(({ searchState }) => {
  const history = useHistory();
  url = `${history.location.pathname}?q=${searchState.query}`;
  const page = sessionStorage.getItem("searchPage");
  if (page && window.location.hash.length > 1) {
    searchState.page = page;
    setTimeout(function () {
      window.location.hash = "";
    }, 1000);
  } else {
    sessionStorage.setItem("searchPage", searchState.page);
  }

  return searchState && searchState.query ? (
    <>
      <Hits hitComponent={Hit} />
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex,jsx-a11y/tabindex-no-positive */}
      <div id="search-dummy" tabIndex={1} />
    </>
  ) : // <div>No query</div>
  null;
});

const Hit = hit => {
  const result = hit.hit;
  const noImage = result.image.indexOf("None") !== -1;
  const history = useHistory();
  return (
    <a
      href={`/product/${result.slug}/${result.objectID}`}
      onClick={() => {
        url = `${url}#${result.objectID}`;
        history.replace(url);
      }}
    >
      {!!result.image && (
        <div className="serp-item" id={result.objectID}>
          {noImage && (
            <PlaceholderImage />
          )}
          {noImage === false && (
            <div data-test="productThumbnail" className="serp-image">
              <img
                src={result.image}
                style={{ height: 100, width: 100 }}
                alt={result.name}
              />
            </div>
          )}
          <h4 data-test="productTile" className="serp-title">
            {result.name}
          </h4>
          <p data-test="productPrice" className="serp-price">
            <span>${result.price}</span>
          </p>
          {result.in_stock !== true && <p className="serp-oos">Out of Stock</p>}
        </div>
      )}
    </a>
  );
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchParam = urlParams.get("q");

// @ts-ignore
export default class AlgoliaSearchPage extends React.Component<SearchState> {
  // eslint-disable-next-line react/no-unused-state
  state = { search: { query: this.props.search || "" } };

  submitBtnRef = React.createRef<HTMLButtonElement>();

  render() {
    const searchClient = algoliasearch(
      "RZFI9YHKMB",
      "959671f0d835e32af44a31dd270a90d2"
    );

    // console.log(searchClient);

    return (
      <>
        <h1>Results for: {searchParam}</h1>
        <InstantSearch
          indexName="products"
          searchClient={searchClient}
          searchState={this.state.search}
          onSearchStateChange={searchState => {
            this.setState({ search: searchState });
          }}
        >
          <SearchBox
            onSubmit={e => {
              e.preventDefault();
              const el = e.currentTarget.querySelector('input[type="search"]');
              if (el) {
                const { value } = el;
                window.location.href = `/search?q=${encodeURIComponent(value)}`;
              }
            }}
          />

          <ScrollTo>
            <Results />
          </ScrollTo>

          <Pagination />
        </InstantSearch>
      </>
    );
  }
}
