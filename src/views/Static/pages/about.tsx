import "../scss/index.scss";
import * as React from "react";
import { TakeShape } from "../../../components";

export const About: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <div className="about-page">
          <TakeShape position="about" />
        </div>
      </div>
    </>
  );
};
