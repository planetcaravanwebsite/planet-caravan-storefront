import "../scss/index.scss";
import * as React from "react";

export const About: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <div className="about-page">
          <h1>About Us</h1>
          <p>
            Planet Caravan is a family owned smoke shop based in Cincinnati, OH.
            Originally opened in 2015, we have since expanded to four stores in
            the Cincinnati area and now online. We pride ourselves on having
            products for every budget and every type of smoker. We also
            understand this industry can be intimidating so our email and
            Instagram DMs are always open for any and all questions you might
            have regarding products or their uses. Planet Caravan is more than
            just your average smoke shop. It is a family and we welcome you to
            join us!
          </p>
        </div>
      </div>
    </>
  );
};
