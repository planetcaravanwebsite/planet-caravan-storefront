import "./scss/index.scss";
import * as React from "react";
import { injectIntl, WrappedComponentProps } from "react-intl";
import { RouteComponentProps, withRouter } from "react-router-dom";

import AlgoliaSearch from "@temp/components/AlgoliaSearch";
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

class Search extends React.Component<SearchProps, SearchState> {
  componentDidUpdate(_prevProps: SearchProps, prevState: SearchState) {
    if (
      !!prevState.search.length &&
      this.props.overlay.type !== OverlayType.search
    ) {
      this.setState({ search: "" });
    }
  }

  render() {
    // console.log(searchClient);

    return (
      <Overlay
        testingContext="searchOverlay"
        context={this.props.overlay}
        className={
          this.props.overlay.theme === OverlayTheme.modalFull ? "" : "overlay"
        }
      >
        <AlgoliaSearch search="" />
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
