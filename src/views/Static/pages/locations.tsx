import "../scss/index.scss";
import * as React from "react";
import { TakeShape } from "../../../components";

export const Locations: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <div className="locations-page">
          <h1>Locations</h1>
          <div className="locations-grid">
            <TakeShape position="locations" />
          </div>
        </div>
      </div>
    </>
  );
};
