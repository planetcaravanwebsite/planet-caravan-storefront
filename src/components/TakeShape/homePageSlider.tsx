import React from "react";
import Slider from "react-slick";

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export interface TakeShapeSliderInterface {
  content: any;
}

export const TakeShapeHomePageSlider: React.FC<TakeShapeSliderInterface> = content => {
  console.log(content.content.getHomePageSlider.repeater);
  return (
    <div className="container center">
      <div className="">
        <div className="">
          <div style={{ maxWidth: "100vw", margin: "0 auto" }}>
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
