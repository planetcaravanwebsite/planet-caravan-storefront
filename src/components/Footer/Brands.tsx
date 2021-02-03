import * as React from "react";

import "./scss/index.scss";
import { BRANDS } from "../../core/config";

class Brands extends React.PureComponent {
  render() {
    return (
      <div className="container center">
        <span className="yukarimobile med">our brands</span>
        <div className="footer-nav__section">
          <div className="footer-nav__section-content">
            {BRANDS.map(brand => (
              <span className="footer-nav__section-logo">
                <img src={brand.path} alt={brand.name} />
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Brands;
