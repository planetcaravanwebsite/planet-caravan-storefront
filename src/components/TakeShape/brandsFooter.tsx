import React from "react";
import Slider from "react-slick";

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

export interface TakeShapeBrandsFooterInterface {
  content: any;
}

export const TakeShapeBrandsFooter: React.FC<TakeShapeBrandsFooterInterface> = content => {
  return (
    <div className="container center">
      <span className="yukarimobile med">our brands</span>
      <div className="footer-nav__section">
        <div className="footer-nav__section-content">
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Slider {...settings}>
              {content.content.getSiteSettings.brands.map((brand, i) => (
                <span className="footer-nav__section-logo" key={i}>
                  <a href={brand.brand.linkUrl}>
                    <img
                      src={`https://images.takeshape.io/${brand.brand.logo.path}`}
                      alt={brand.brand.imageAltTag}
                    />
                  </a>
                </span>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  );
};
