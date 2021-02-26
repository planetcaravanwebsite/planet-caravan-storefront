import "../scss/index.scss";
import * as React from "react";

export const About: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <h1>About Us</h1>
        <div className="about-page">
          <p>We are a really neat sjop!</p>
        </div>
      </div>
    </>
  );
};
