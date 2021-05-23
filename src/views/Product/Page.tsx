import classNames from "classnames";
import React from "react";
import Media from "react-media";
import { ProductDescription } from "@components/molecules";
import { ProductGallery } from "@components/organisms";
import AddToCartSection from "@components/organisms/AddToCartSection";
import { filter } from "lodash";

import { smallScreen } from "../../globalStyles/scss/variables.scss";

import {
  Breadcrumbs,
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
    id: product.id,
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

  const related = filter(product.category.products.edges, function (prod) {
    return prod.node.id !== product.id;
  });

  if (related.length > 3) {
    related.pop();
  }

  const getImages = () => {
    if (product.variants && variantId) {
      const variant = product.variants.find(
        variant => variant.id === variantId
      );

      if (variant.images.length > 0) {
        return variant.images;
      }
    }

    return product.images;
  };

  const handleAddToCart = (variantId, quantity) => {
    // console.log(variantId, quantity);
    add(variantId, quantity);
    overlayContext.show(OverlayType.cart, OverlayTheme.right);
  };

  const DisclaimerSection = (
    <div className="container" style={{ marginBottom: "30px" }}>
      <div>
        All measurements and colors described above are approximations.
        <br />
        Please add a pelican case to your cart if you wish for us to pack your
        heady glass within it.
      </div>
    </div>
  );

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
      description={product.descriptionJson}
      metadata={Object.fromEntries(product.metadata.map(m => [m.key, m.value]))}
    />
  );

  return (
    <>
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
                            description={product.description}
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
                              description={product.description}
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
          {DisclaimerSection}
        </div>
        <OtherProducts products={related} />
      </div>
    </>
  );
};

export default Page;
