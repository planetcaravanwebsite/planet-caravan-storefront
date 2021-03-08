import * as React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

import algoliasearch from "algoliasearch/lite";
import {
  Hits,
  InstantSearch,
  SearchBox,
  connectStateResults,
} from "react-instantsearch-dom";

interface SearchState {
  search: string;
}

const Results = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <Hits hitComponent={Hit} />
  ) : // <div>No query</div>
  null
);

const Hit = hit => {
  const result = hit.hit;
  return (
    <a href={`/product/${result.slug}/${result.objectID}`}>
      {!!result.image && (
        <img
          src={result.image}
          style={{ height: 100, width: 100 }}
          alt={result.name}
        />
      )}
      <p>{result.name}</p>
    </a>
  );
};

class Search extends React.Component<SearchState> {
  state = { search: "" };

  submitBtnRef = React.createRef<HTMLButtonElement>();

  render() {
    const searchClient = algoliasearch(
      "RZFI9YHKMB",
      "959671f0d835e32af44a31dd270a90d2"
    );

    console.log(searchClient);

    return (
      <>
        <InstantSearch indexName="products" searchClient={searchClient}>
          <SearchBox />
          <Results />
        </InstantSearch>
      </>
    );
  }
}

// Workaround ATM for:
// withRouter(Search): Function components do not support contextType
export default injectIntl(
  withRouter(
    (
      props: WrappedComponentProps &
        RouteComponentProps & { overlay: OverlayContextInterface }
    ) => <Search {...props} />
  )
);
