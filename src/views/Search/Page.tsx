// @ts-nocheck

import "./scss/index.scss";
import * as React from "react";

import { MainMenu } from "@temp/components";
import AlgoliaSearchPage from "../../components/AlgoliaSearchPage";

interface PageProps {
  search?: string;
}

const Page: React.FC<PageProps> = ({ search }) => {
  return (
    <>
      <MainMenu whichMenu="fullPage" />
      <div className="search-page">
        <div className="container">
          <AlgoliaSearchPage search={search} />
        </div>
      </div>
    </>
  );
};

export default Page;
