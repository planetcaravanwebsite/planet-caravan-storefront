import "./scss/index.scss";

// import classNames from "classnames";
import * as React from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { demoMode } from "@temp/constants";
import logoImg from "../../images/pc-logo.png";

import {
  HomePageMenu,
  HomePageSearch,
  MainMenu,
  ProductsFeatured,
} from "../../components";
// import { generateCategoryUrl } from "../../core/utils";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

// import noPhotoImg from "../../images/no-photo.svg";

const Page: React.FC<{
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop }) => {
  const categoriesExist = () => {
    return categories && categories.edges && categories.edges.length > 0;
  };
  const intl = useIntl();

  return (
    <>
      <MainMenu demoMode={demoMode} whichMenu="homePage" />
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div className="section pad-bottom-20">
        <div className="container w-container center">
          <a href="/" aria-current="page" className="w-inline-block w--current">
            <img src={logoImg} alt="" />
          </a>
          <HomePageMenu />
        </div>
      </div>
      <HomePageSearch />
      <ProductsFeatured
        title={intl.formatMessage({ defaultMessage: "Featured" })}
      />
      {categoriesExist() && (
        <div className="home-page__categories">
          <div className="">
            <div className="home-page__categories__row-list">
              <div className="home-page__categories__row">
                <Link to="/category/drops/54/">
                  <div className="home-page__categories__list__image--no-photo">
                    Drops
                  </div>
                </Link>
              </div>
              <div className="home-page__categories__row">
                <Link to="/category/headies/52/">
                  <div className="home-page__categories__list__image--no-photo">
                    Headies
                  </div>
                </Link>
              </div>
              <div className="home-page__categories__row">
                <Link to="/category/smoke-shop/56/">
                  <div className="home-page__categories__list__image--no-photo">
                    Smoke Shop
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
