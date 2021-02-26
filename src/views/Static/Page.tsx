import "./scss/index.scss";
import * as React from "react";
import { demoMode } from "@temp/constants";

import { MainMenu } from "../../components";
import { About } from "./pages/about";
import { Contact } from "./pages/contact";

import {
  ProductsList_categories,
  ProductsList_shop,
  ProductsList_shop_homepageCollection_backgroundImage,
} from "./gqlTypes/ProductsList";

import { structuredData } from "../../core/SEO/Homepage/structuredData";

const Page: React.FC<{
  slug: string;
  loading: boolean;
  categories: ProductsList_categories;
  backgroundImage: ProductsList_shop_homepageCollection_backgroundImage;
  shop: ProductsList_shop;
}> = ({ loading, categories, backgroundImage, shop, slug }) => {
  return (
    <>
      <MainMenu demoMode={demoMode} whichMenu="page" />
      <script className="structured-data-list" type="application/ld+json">
        {structuredData(shop)}
      </script>
      <div className="static-page">
        {slug === "about" && <About />}
        {slug === "contact" && <Contact />}
      </div>
    </>
  );
};

export default Page;
