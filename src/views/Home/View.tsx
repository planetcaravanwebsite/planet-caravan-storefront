import "./scss/index.scss";

import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import { TypedHomePageQuery } from "./queries";

const View: React.FC = () => (
  <div className="home-page">
    <TypedHomePageQuery alwaysRender displayLoader={false} errorPolicy="all">
      {({ data, loading }) => {
        return (
          <MetaWrapper
            meta={{
              description: data.shop ? data.shop.description : "",
              title:
                "Planet Caravan Smoke Shop has 4 convenient locations (Jefferson, West McMillan, West Chester, Colerain). Open 7 days a week.",
            }}
          >
            <Page
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
