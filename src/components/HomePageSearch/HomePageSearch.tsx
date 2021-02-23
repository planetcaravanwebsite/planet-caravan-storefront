import "./scss/index.scss";

import * as React from "react";

import Media from "react-media";
import ReactSVG from "react-svg";
import searchImg from "../../images/search-dark.svg";

import { mediumScreen } from "../../globalStyles/scss/variables.scss";

import { OverlayContext, OverlayTheme, OverlayType } from "..";

const HomePageSearch: React.FC = () => {
  return (
    <OverlayContext.Consumer>
      {overlayContext => {
        return (
          <div id="searchBar" className="section-search">
            <div className="container w-container">
              <div
                className="main-menu__search"
                onClick={() =>
                  overlayContext.show(
                    OverlayType.search,
                    OverlayTheme.modalFull
                  )
                }
              >
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => <span>search planet caravan</span>}
                />
                <ReactSVG path={searchImg} />
              </div>
            </div>
          </div>
        );
      }}
    </OverlayContext.Consumer>
  );
};
export default HomePageSearch;
