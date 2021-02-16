import * as React from "react";

import { NavLink } from "..";
import { TypedSecondaryMenuQuery } from "./queries";

import "./scss/index.scss";

class Nav extends React.PureComponent {
  render() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer-nav__section">
            <TypedSecondaryMenuQuery>
              {({ data }) => {
                return data.shop.navigation.secondary.items.map(item => (
                  <h4 className="footer-nav__section-header" key={item.id}>
                    <NavLink item={item} />
                  </h4>
                ));
              }}
            </TypedSecondaryMenuQuery>
          </div>
        </div>
      </footer>
    );
  }
}

export default Nav;
