import "./scss/index.scss";

import * as React from "react";

import { RouteComponentProps } from "react-router-dom";
import { MetaWrapper } from "../../components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

type ViewProps = RouteComponentProps<{ slug: string }>;

export const View: React.FC<ViewProps> = ({
  match: {
    params: { slug },
  },
}) => (
  <div className="home-page">
    <TypedHomePageQuery alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        let metaDescription = "";
        let metaTitle = "";
        if (slug === "locations") {
          metaTitle =
            "Smoke Shop Locations in Cincinnati | Planet Caravan Smoke Shop";
          metaDescription =
            "We have 4  great locations for you to choose from for all of your smoking accessories and merch - Jefferson, West McMillan, Colerain, and West Chester.";
        }
        return (
          <MetaWrapper
            meta={{
              description:
                metaDescription || (data.shop ? data.shop.description : ""),
              title: metaTitle || (data.shop ? data.shop.name : ""),
            }}
          >
            <Page
              slug={slug}
              loading={loading}
              backgroundImage={
                data.shop &&
                data.shop.homepageCollection &&
                data.shop.homepageCollection.backgroundImage
              }
              categories={data.categories}
              shop={data.shop}
            />
          </MetaWrapper>
        );
      }}
    </TypedHomePageQuery>
  </div>
);

export default View;
