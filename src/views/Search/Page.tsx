// @ts-nocheck

import "./scss/index.scss";
import * as React from "react";

import AlgoliaSearchPage from "../../components/AlgoliaSearchPage";

interface PageProps {
  search?: string;
}

const Page: React.FC<PageProps> = ({ search }) => {
  return (
    <>
      <div className="search-page">
        <div className="container">
          <AlgoliaSearchPage search={search} />
        </div>
      </div>
    </>
  );
};

export default Page;
