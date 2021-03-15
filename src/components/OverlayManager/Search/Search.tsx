import "./scss/index.scss";
import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";

import algoliasearch from "algoliasearch/lite";
import {
  Hits,
  InstantSearch,
  SearchBox,
  connectStateResults,
} from "react-instantsearch-dom";
// import { connectStateResults } from "react-instantsearch/connectors";
import {
  Overlay,
  OverlayContextInterface,
  OverlayTheme,
  OverlayType,
} from "../..";

interface SearchProps extends WrappedComponentProps, RouteComponentProps {
  overlay: OverlayContextInterface;
}

interface SearchState {
  search: string;
}

const Results = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <>
      <div id="search-dummy" tabIndex={1} />
      <Hits hitComponent={Hit} />
    </>
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

class Search extends React.Component<SearchProps, SearchState> {
  state = { search: "" };

  submitBtnRef = React.createRef<HTMLButtonElement>();

  componentDidUpdate(_prevProps: SearchProps, prevState: SearchState) {
    if (
      !!prevState.search.length &&
      this.props.overlay.type !== OverlayType.search
    ) {
      this.setState({ search: "" });
    }
  }

  render() {
    const searchClient = algoliasearch(
      "RZFI9YHKMB",
      "959671f0d835e32af44a31dd270a90d2"
    );

    // console.log(searchClient);

    return (
      <Overlay
        testingContext="searchOverlay"
        context={this.props.overlay}
        className={
          this.props.overlay.theme === OverlayTheme.modalFull
            ? ""
            : "overlay--no-background"
        }
      >
        <InstantSearch indexName="products" searchClient={searchClient}>
          <SearchBox />
          <Results />
        </InstantSearch>
      </Overlay>
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
