// @ts-nocheck

import "./scss/index.scss";
import * as React from "react";

import AlgoliaSearch from "../../components/AlgoliaSearch";

interface PageProps {
  search?: string;
}

const Page: React.FC<PageProps> = ({ search }) => {
  return (
    <div className="search-page">
      <div className="container">
        <AlgoliaSearch search={search} />
      </div>
    </div>
  );
};

export default Page;
