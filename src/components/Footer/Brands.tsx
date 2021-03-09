import * as React from "react";
import Slider from "react-slick";

import "./scss/index.scss";
import { BRANDS } from "../../core/config";

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 750,
      settings: {
        arrows: false,
        centerMode: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: false,
      },
    },
    {
      breakpoint: 580,
      settings: {
        arrows: false,
        centerMode: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
      },
    },
  ],
};

class Brands extends React.PureComponent {
  render() {
    return (
      <div className="container center">
        <span className="yukarimobile med">our brands</span>
        <div className="footer-nav__section">
          <div className="footer-nav__section-content">
            <div style={{ maxWidth: "600px", margin: "0 auto" }}>
              <Slider {...settings}>
                {BRANDS.map(brand => (
                  <span className="footer-nav__section-logo">
                    <img src={brand.path} alt={brand.name} />
                  </span>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Brands;
