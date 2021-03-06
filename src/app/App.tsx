import React from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Hits } from "react-instantsearch-dom";

import { useAuth } from "@saleor/sdk";
import { DemoBanner, Loader } from "@components/atoms";
import { demoMode } from "@temp/constants";
import {
  Footer,
  MetaConsumer,
  OverlayManager,
  OverlayProvider,
} from "../components";
import ShopProvider from "../components/ShopProvider";
import "../globalStyles/scss/index.scss";
import { Routes } from "./routes";
import Notifications from "./Notifications";

const searchClient = algoliasearch(
  "RZFI9YHKMB",
  "959671f0d835e32af44a31dd270a90d2"
);

const App: React.FC = () => {
  const { tokenRefreshing, tokenVerifying } = useAuth();

  if (tokenRefreshing || tokenVerifying) {
    return <Loader />;
  }

  return (
    <ShopProvider>
      <InstantSearch indexName="products" searchClient={searchClient}>
        <OverlayProvider>
          <MetaConsumer />
          {demoMode && <DemoBanner />}
          <SearchBox />
          <Hits />
          <Routes />
          <Footer />
          <OverlayManager />
          <Notifications />
        </OverlayProvider>
      </InstantSearch>
    </ShopProvider>
  );
};

export default App;
