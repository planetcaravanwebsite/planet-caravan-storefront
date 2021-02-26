import classNames from "classnames";
import React from "react";
import Media from "react-media";
import { ProductDescription } from "@components/molecules";
import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";

import { demoMode } from "@temp/constants";
import { smallScreen } from "../../globalStyles/scss/variables.scss";

import {
  Breadcrumbs,
  MainMenu,
  OverlayContext,
  OverlayTheme,
  OverlayType,
} from "../../components";
import { generateCategoryUrl, generateProductUrl } from "../../core/utils";
import GalleryCarousel from "./GalleryCarousel";
import OtherProducts from "./Other";

import { structuredData } from "../../core/SEO/Product/structuredData";
import { IProps } from "./types";

const populateBreadcrumbs = product => [
  {
    link: generateCategoryUrl(product.category.id, product.category.name),
    value: product.category.name,
  },
  {
    link: generateProductUrl(product.id, product.name),
    value: product.name,
  },
];

const Page: React.FC<
  IProps & {
    queryAttributes: Record<string, string>;
    onAttributeChangeHandler: (slug: string | null, value: string) => void;
  }
> = ({ add, product, items, queryAttributes, onAttributeChangeHandler }) => {
  const overlayContext = React.useContext(OverlayContext);

  const productGallery: React.RefObject<HTMLDivElement> = React.useRef();

  const [variantId, setVariantId] = React.useState("");

  const getImages = () => {
    console.log(product);
    if (product.variants && variantId) {
      const variant = product.variants.find(
        variant => variant.id === variantId
      );

      if (variant.images.length > 0) {
        return variant.images;
      }
    }

    console.log(Object.keys(product.descriptionJson).length);

    return product.images;
  };

  const handleAddToCart = (variantId, quantity) => {
    console.log("adding %o %o", variantId, quantity);
    add(variantId, quantity);
    overlayContext.show(OverlayType.cart, OverlayTheme.right);
  };

  const addToCartSection = (
    <AddToCartSection
      items={items}
      productId={product.id}
      name={product.name}
      productVariants={product.variants}
      productPricing={product.pricing}
      queryAttributes={queryAttributes}
      setVariantId={setVariantId}
      variantId={variantId}
      onAddToCart={handleAddToCart}
      onAttributeChangeHandler={onAttributeChangeHandler}
      isAvailableForPurchase={product.isAvailableForPurchase}
      availableForPurchase={product.availableForPurchase}
    />
  );

  return (
    <>
      <MainMenu demoMode={demoMode} whichMenu="fullPage" />
      <div className="product-page">
        <div className="container">
          <Breadcrumbs breadcrumbs={populateBreadcrumbs(product)} />
        </div>
        <div className="container">
          <div className="product-page__product">
            <script className="structured-data-list" type="application/ld+json">
              {structuredData(product)}
            </script>
            <Media query={{ maxWidth: smallScreen }}>
              {matches =>
                matches ? (
                  <>
                    <GalleryCarousel images={getImages()} />
                    <div className="product-page__product__info">
                      {addToCartSection}
                      {Object.keys(product.descriptionJson).length > 2 && (
                        <div className="product-page__product__description">
                          <ProductDescription
                            descriptionJson={product.descriptionJson}
                            attributes={product.attributes}
                          />
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="product-page__product__gallery"
                      ref={productGallery}
                    >
                      <ProductGallery images={getImages()} />
                    </div>
                    <div className="product-page__product__info">
                      <div
                        className={classNames(
                          "product-page__product__info--fixed"
                        )}
                      >
                        {addToCartSection}
                        {Object.keys(product.descriptionJson).length > 2 && (
                          <div className="product-page__product__description">
                            <ProductDescription
                              descriptionJson={product.descriptionJson}
                              attributes={product.attributes}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )
              }
            </Media>
          </div>
        </div>
        <OtherProducts products={product.category.products.edges} />
      </div>
    </>
  );
};

export default Page;
