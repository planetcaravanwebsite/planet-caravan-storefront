import React from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  autoplay: false,
  speed: 500,
  centerMode: true,
  arrows: true,
  responsive: [
    {
      breakpoint: 650,
      settings: {
        variableWidth: true,
        centerPadding: "50px",
      },
    },
    {
      breakpoint: 382,
      settings: {
        variableWidth: true,
        centerPadding: "20px",
      },
    },
  ],
};

export interface TakeShapeSliderInterface {
  content: any;
}

export const TakeShapeHomePageSlider: React.FC<TakeShapeSliderInterface> = content => {
  if (!content.content.getHomePageSlider.display) {
    return <></>;
  }

  return (
    <div className="container center">
      <div className="slider-home-page">
        <div className="footer-nav__section-content">
          <div style={{ maxWidth: "620px", margin: "0 auto" }}>
            <Slider {...settings}>
              {content.content.getHomePageSlider.repeater.map((item, i) => (
                <span className="" key={i}>
                  <a href={item.object.callToAction}>
                    <img
                      src={`https://images.takeshape.io/${item.object.sliderImage.path}`}
                      alt=""
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
