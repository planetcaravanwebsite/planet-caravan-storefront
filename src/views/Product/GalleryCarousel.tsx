import * as React from "react";

import { CachedImage } from "@components/molecules";

// import { Carousel } from "../../components";
import Slider from "react-slick";
import { ProductDetails_product_images } from "./gqlTypes/ProductDetails";

import noPhotoImg from "../../images/no-photo.svg";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const GalleryCarousel: React.FC<{
  images: ProductDetails_product_images[];
}> = ({ images }) => (
  <div className="product-page__product__gallery" id="zoom-image">
    <Slider {...settings}>
      {images.map(image => (
        // @ts-ignore
        <CachedImage url={image.url || noPhotoImg} key={image.id} zoom="mobile">
          <img src={noPhotoImg} alt={image.alt} />
        </CachedImage>
      ))}
    </Slider>
  </div>
);

export default GalleryCarousel;
